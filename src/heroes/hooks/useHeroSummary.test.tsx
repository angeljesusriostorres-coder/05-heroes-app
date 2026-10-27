import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from '@testing-library/react'
import { useHeroSummary } from "./useHeroSummary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { getSummaryActionn } from "../actions/get-summary-action";
import type { HeroSummaryResponse } from "../types/get-hero-sumary-response";

vi.mock('../actions/get-summary-action', () => ({
    getSummaryActionn: vi.fn(),
}));

const mockGetSummaryAction = vi.mocked(getSummaryActionn);

const tanstackCustomProvider = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    })
    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

}



describe('useHeroSummary', () => {

    test('should return the initial state (isLoading)', () => {
        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanstackCustomProvider()
        });

        expect(result.current.isLoading).toBeTruthy()
        expect(result.current.isError).toBeFalsy()
        expect(result.current.data).toBe(undefined);

    })

    // test('should return success state with data when API call succeds', async () => {
    //     const { result } = renderHook(() => useHeroSummary(), {
    //         wrapper: tanstackCustomProvider()
    //     });
    //     await waitFor(() => {
    //         expect(result.current.isSuccess).toBe(true)

    //         expect(result.current.isLoading).toBe(false)

    //         console.log(result.current)
    //     })
    // });

    test('should return success state with data when API call succeds', async () => {

        const mockSummaryData = {
            "totalHeroes": 25,
            "strongestHero": {
                "id": "1",
                "name": "Clark Kent",
                "slug": "clark-kent",
                "alias": "Superman",
                "powers": [
                    "Súper fuerza",
                    "Vuelo",
                    "Visión de calor",
                    "Visión de rayos X",
                    "Invulnerabilidad",
                    "Súper velocidad"
                ],
                "description": "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
                "strength": 10,
                "intelligence": 8,
                "speed": 9,
                "durability": 10,
                "team": "Liga de la Justicia",
                "image": "1.jpeg",
                "firstAppearance": "1938",
                "status": "Active",
                "category": "Hero",
                "universe": "DC"
            },
            "smartestHero": {
                "id": "2",
                "name": "Bruce Wayne",
                "slug": "bruce-wayne",
                "alias": "Batman",
                "powers": [
                    "Artes marciales",
                    "Habilidades de detective",
                    "Tecnología avanzada",
                    "Sigilo",
                    "Genio táctico"
                ],
                "description": "El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.",
                "strength": 6,
                "intelligence": 10,
                "speed": 6,
                "durability": 7,
                "team": "Liga de la Justicia",
                "image": "2.jpeg",
                "firstAppearance": "1939",
                "status": "Active",
                "category": "Hero",
                "universe": "DC"
            },
            "heroCount": 18,
            "villainCount": 7
        } as HeroSummaryResponse;

        mockGetSummaryAction.mockResolvedValue(mockSummaryData);

        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanstackCustomProvider()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
            expect(result.current.isError).toBe(false)
        })
    });

    test('shold return error state when api call fails', async () => {
        const mockError = new Error('Failed to fetch summary');
        mockGetSummaryAction.mockRejectedValue(mockError);

        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanstackCustomProvider()
        });
        await waitFor(() => {
            expect(result.current.isError).toBe(true)
        })
        expect(result.current.error).toBeDefined();
        expect(result.current.isLoading).toBe(false);
        expect(mockGetSummaryAction).toHaveBeenCalled()
        expect(mockGetSummaryAction).toHaveBeenCalledTimes(1);

    })


})