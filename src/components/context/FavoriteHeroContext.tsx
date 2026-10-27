import type { Hero } from "@/heroes/types/hero-interface";
import { createContext, useEffect, useState, type PropsWithChildren } from "react";

interface FavoriteHeroContext {
    favorites: Hero[];
    favoriteCount: number;
    //methods
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void
}

export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavcoritesFromLocalStorage = (): Hero[] => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}



export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
    const [favorites, setFavorites] = useState<Hero[]>(getFavcoritesFromLocalStorage);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));

    }, [favorites])


    const toogleFavorite = (hero: Hero) => {
        const heroExist = favorites.find(h => h.id === hero.id);
        if (heroExist) {
            setFavorites(favorites.filter(f => f.id !== hero.id));
        } else {
            setFavorites([...favorites, hero]);
        }
    }
    const isFavorite = (hero: Hero) => {
        return favorites.some(h => h.id === hero.id)
    }

    return (
        <FavoriteHeroContext
            value={{
                favoriteCount: favorites.length,
                favorites: favorites,
                isFavorite: isFavorite,
                toggleFavorite: toogleFavorite

            }}>
            {children}
        </FavoriteHeroContext>
    )
}
