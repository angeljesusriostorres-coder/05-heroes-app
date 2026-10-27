import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HeroStats } from "./HeroStats";
import { QueryClient, QueryClientProvider, } from "@tanstack/react-query";
import { useHeroSummary } from "../hooks/useHeroSummary";
import type { HeroSummaryResponse } from "../types/get-hero-sumary-response";
import { FavoriteHeroProvider } from "@/components/context/FavoriteHeroContext";

vi.mock('../hooks/useHeroSummary');

const mockUseHeroSummary = vi.mocked(useHeroSummary);

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
} as HeroSummaryResponse

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

const renderHeroStats = (mockData?: Partial<HeroSummaryResponse>) => {
    if (mockData) {
        mockUseHeroSummary.mockReturnValue({
            data: mockData,
        } as unknown as ReturnType<typeof useHeroSummary>)

    } else {

        mockUseHeroSummary.mockReturnValue({
            data: undefined
        } as unknown as ReturnType<typeof useHeroSummary>)

    }


    return render(

        <QueryClientProvider client={queryClient}>
            <FavoriteHeroProvider>
                <HeroStats />
            </FavoriteHeroProvider>
        </QueryClientProvider>

    )
}

describe('herostats test', () => {

    test('shoul render component with default values', () => {

        const { container } = renderHeroStats();
        screen.debug();

        expect(screen.getByText('Loading...')).toBeDefined();

        expect(container).toMatchSnapshot();

    });

    test('should render heroStats with mock information', () => {

        const { container } = renderHeroStats(mockSummaryData);
        expect(container).toMatchSnapshot();
        expect(screen.getByText('Total Characters')).toBeDefined();
        expect(screen.getByText('Total Favorites')).toBeDefined();


        screen.debug()
    });

    test('should the percentage of favorites when a hero id added to favorites', () => {
        localStorage.setItem('favorites', JSON.stringify([{
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
        {
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
        {
            "id": "3",
            "name": "Diana Prince",
            "slug": "diana-prince",
            "alias": "Mujer Maravilla",
            "powers": [
                "Súper fuerza",
                "Vuelo",
                "Lazo de la Verdad",
                "Habilidad de combate",
                "Poderes divinos",
                "Inmortalidad"
            ],
            "description": "Princesa amazona y guerrera, campeona de la verdad, la justicia y la igualdad.",
            "strength": 9,
            "intelligence": 8,
            "speed": 8,
            "durability": 9,
            "team": "Liga de la Justicia",
            "image": "3.jpeg",
            "firstAppearance": "1941",
            "status": "Active",
            "category": "Hero",
            "universe": "DC"
        },]))

        const { container } = renderHeroStats(mockSummaryData);
        expect(container).toMatchSnapshot();
        const percetage = screen.getByTestId('favorite-test-id');
        expect(percetage.innerHTML).toContain('12% of total')
        const favoriteCount = screen.getByTestId('favorite-count-id');
        screen.debug(favoriteCount);
        expect(favoriteCount.innerHTML).toContain('3');



    });
})