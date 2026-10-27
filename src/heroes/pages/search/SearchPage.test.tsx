import { describe, expect, test, vi } from "vitest";
import { FavoriteHeroProvider } from "@/components/context/FavoriteHeroContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SearchPage from "./SearchPage";
import { getSearchHeroesAction } from "@/heroes/actions/search-heroes.action";
import type { Hero } from "@/heroes/types/hero-interface";


vi.mock('@/heroes/actions/search-heroes.action');

const mockSearchHeroAction = vi.mocked(getSearchHeroesAction,);

const queryclient = new QueryClient();


vi.mock('@/components/custom/CustomJumbotron', () => ({
    CustomJumbotron: () => <div data-testid="CustomJumbotron-id"></div>
}));


vi.mock('./ui/SearchControls', () => ({
    SearchControls: () => <div data-testid="SearchControls-id"></div>
}));


vi.mock('@/heroes/components/HeroGrid', () => ({
    HeroGrid: ({ heroes = [] }: { heroes: Hero[] }) => (
        <div data-testid='hero-grid'>
            {
                heroes.map(hero => (
                    <div key={hero.id}>{hero.name}</div>
                ))}
        </div>
    ),
}));



const renderSearchPage = (initialEntries?: string[]) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroProvider>
                <QueryClientProvider client={queryclient}>
                    <SearchPage />
                </QueryClientProvider>
            </FavoriteHeroProvider>
        </MemoryRouter>
    )
}



describe('searchParamsPage', () => {

    test('shoul render searchPage with default values', () => {
        const { container } = renderSearchPage();
        expect(mockSearchHeroAction).toHaveBeenCalledWith({
            "category": undefined,
            "name": undefined,
            "status": undefined,
            "strength": undefined,
            "team": undefined,
            "universe": undefined,
        });

        expect(container).toMatchSnapshot();
    })
    test('shoul render searchPage with name parameters', () => {
        const { container } = renderSearchPage(['/search?name=superman']);
        expect(mockSearchHeroAction).toHaveBeenCalledWith({
            "category": undefined,
            "name": 'superman',
        });

        expect(container).toMatchSnapshot();
    });
    test('shoul render searchPage with name parametersa', () => {
        const { container } = renderSearchPage(['/search?currentStrength=6']);
        expect(mockSearchHeroAction).toHaveBeenCalledWith({
            "category": undefined,
            "name": undefined,
            "status": undefined,
            "strength": 6,
            "team": undefined,
            "universe": undefined,
        });
        expect(container).toMatchSnapshot();
    });
    test('shoul render hero with search results', async () => {
        const mokHero = [
            {
                id: '1',
                name: 'batman'
            },
            {
                id: '2',
                name: 'superman'
            }] as unknown as Hero[];

        mockSearchHeroAction.mockResolvedValue(mokHero);

        renderSearchPage();
        screen.debug();
        await waitFor(() => {
            expect(screen.getByText('batman'))

        })

    });



});