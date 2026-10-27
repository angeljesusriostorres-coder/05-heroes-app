import { describe, expect, test, vi } from "vitest";
import HomePage from "./HomePage";
import { MemoryRouter } from "react-router";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach } from "node:test";
import { FavoriteHeroProvider } from "@/components/context/FavoriteHeroContext";

vi.mock('@/heroes/hooks/usePaginatedHero');

const mockUsePaginatedHero = vi.mocked(usePaginatedHero);

mockUsePaginatedHero.mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
} as unknown as ReturnType<typeof mockUsePaginatedHero>);

const queryclient = new QueryClient();


const renderHomePage = (initialEntries?: string[]) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroProvider>
                <QueryClientProvider client={queryclient}>
                    <HomePage />
                </QueryClientProvider>
            </FavoriteHeroProvider>
        </MemoryRouter>
    )
}

describe('HomePage test', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    test('should render with default values', () => {
        const { container } = renderHomePage();
        expect(container).toMatchSnapshot();
    });
    test('should call usePaginatedHero with default values ', () => {
        renderHomePage();
        expect(mockUsePaginatedHero).toHaveBeenCalledWith({
            "category": "all",
            "limit": 6,
            "page": 1,
        },);
    });

    test('should call usePaginatedHero with default values ', () => {
        renderHomePage();
        expect(mockUsePaginatedHero).toHaveBeenCalledWith({
            "category": "all",
            "limit": 6,
            "page": 1,
        },);
    });

    test('should call usePaginatedHero with custom query params ', () => {
        renderHomePage(['/?page=2&limit=10&category=villains']);
        expect(mockUsePaginatedHero).toHaveBeenCalledWith({
            "category": "villains",
            "limit": 10,
            "page": 2,
        },);
    });

    test('should ', () => {
        renderHomePage(['/?tab=favorites&page=2&limit=10&category=villains']);
        // expect(mockUsePaginatedHero).toHaveBeenCalledWith({
        //     "category": "villains",
        //     "limit": 10,
        //     "page": 2,
        // },);
        const [, , , villains] = screen.getAllByRole('tab');
        fireEvent.click(villains);
        expect(mockUsePaginatedHero).toHaveBeenCalledWith(
            {
                "category": "villains",
                "limit": 10,
                "page": 2,
            },
        );
    });


})

