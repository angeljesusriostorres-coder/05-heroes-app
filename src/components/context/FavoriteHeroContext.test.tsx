import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { FavoriteHeroContext, FavoriteHeroProvider } from "./FavoriteHeroContext";
import { use } from "react";
import type { Hero } from "@/heroes/types/hero-interface";



const mockHero = {
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
} as Hero


const TestComponent = () => {



    const { favoriteCount, isFavorite, toggleFavorite, favorites } = use(FavoriteHeroContext);
    return (
        <div >
            <div data-testid="favorite-count">{favoriteCount}</div>
            <div data-testid="favorite-list">{
                favorites.map(hero => {
                    return (
                        <div key={hero.id} data-testid={`hero-${hero.id}`} >
                            {hero.name}
                        </div>)
                })
            }</div>
            <button data-testid="toggle-favorite"
                onClick={() => toggleFavorite(mockHero)}
            >Hero</button>
            <div data-testid="is-favorite">
                {isFavorite(mockHero).toString()}

            </div>



        </div>
    )
}

const renderContextTest = () => {

    return render(
        <FavoriteHeroProvider>
            <TestComponent />
        </FavoriteHeroProvider>

    )
}

describe('FavoriteHeroContext test', () => {

    test('should initialize  with default values', () => {
        renderContextTest()
        screen.debug();
        expect(screen.getByTestId('favorite-count').textContent).toBe("0");
        expect(screen.getByTestId('favorite-list').children.length).toBe(0);


    });
    test('should add hero to favorite when toggle favorite is called  with new hero ', () => {
        // localStorage.clear();
        renderContextTest();
        const button = screen.getByTestId('toggle-favorite');
        screen.debug();

        fireEvent.click(button);
        screen.debug();
        expect(screen.getByTestId('favorite-count').textContent).toBe("1")
        expect(screen.getByTestId('is-favorite').textContent).toBe("true")
        expect(screen.getByTestId('hero-1').textContent).toBe('Clark Kent')
        expect(localStorage.getItem('favorites')).toBe(
            '[{"id":"1","name":"Clark Kent","slug":"clark-kent","alias":"Superman","powers":["Súper fuerza","Vuelo","Visión de calor","Visión de rayos X","Invulnerabilidad","Súper velocidad"],"description":"El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.","strength":10,"intelligence":8,"speed":9,"durability":10,"team":"Liga de la Justicia","image":"1.jpeg","firstAppearance":"1938","status":"Active","category":"Hero","universe":"DC"}]'
        );
    });
    test('should add hero to favorite when toggle favorite is called  ', () => {
        localStorage.clear();
        localStorage.setItem('favorites', JSON.stringify([mockHero]))

        renderContextTest();
        const button = screen.getByTestId('toggle-favorite');
        screen.debug();

        fireEvent.click(button);
        screen.debug();
        expect(screen.getByTestId('favorite-count').textContent).toBe("0")
        expect(screen.getByTestId('is-favorite').textContent).toBe("false")
        expect(screen.queryByTestId('hero-1')).toBeNull();

    });
    test('', () => { });


})