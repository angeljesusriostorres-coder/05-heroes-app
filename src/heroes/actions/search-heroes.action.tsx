import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero-interface";


const BASE_URL = import.meta.env.VITE_API_URL;

export interface Options {
    name?: string;
    team?: string;
    category?: string;
    universe?: string;
    status?: string;
    strength?: number;

}

export const getSearchHeroesAction = async ({ name, team, category, universe, status, strength }: Options): Promise<Hero[]> => {
    if (!name && !team && !category && !universe && !status && !strength)
        return [];

    const { data: searchResponse } = await heroApi.get<Hero[]>("/search", {
        params: {
            name,
            team,
            category,
            universe,
            status,
            strength,
        }
    }
    );
    const heroes = searchResponse.map(hero => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    }))


    return heroes;
}


