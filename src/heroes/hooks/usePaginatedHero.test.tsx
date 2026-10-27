import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { usePaginatedHero } from "./usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { getHeroesByPageAction } from "../actions/get-heroes-bay-page.actions";
import { beforeEach } from "node:test";



vi.mock('../actions/get-heroes-bay-page.actions', () => (
    { getHeroesByPageAction: vi.fn() }
));

const mockGetHeroesByPageAction = vi.mockObject(getHeroesByPageAction);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
})

const tanstackCustomProvider = () => {

    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

}

describe('usePaginatedHero test', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    })

    test('should return the initial state (isLoading)', () => {
        const { result } = renderHook(() => usePaginatedHero({ page: 1, limit: 10 }), {
            wrapper: tanstackCustomProvider()
        });
        expect(result.current.isLoading).toBeTruthy()
        expect(result.current.isError).toBeFalsy()
        expect(result.current.data).toBe(undefined);

    })


    test('should return success state with data when API call succeeds', async () => {

        const mockHeroresData = {
            "total": 25,
            "pages": 13,
            "heroes": []
        }
        mockGetHeroesByPageAction.mockResolvedValue(mockHeroresData);

        const { result } = renderHook(() => usePaginatedHero({ page: 1, limit: 2, category: 'all' }), {
            wrapper: tanstackCustomProvider()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);

        });
        expect(result.current.status).toBe('success');

        expect(mockGetHeroesByPageAction).toHaveBeenCalled();
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 2, 'all');


    })

})