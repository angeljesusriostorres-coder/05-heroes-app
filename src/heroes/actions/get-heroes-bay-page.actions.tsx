import { heroApi } from "../api/hero.api"
import type { HeroesResponse } from "../types/get-heroes-response";

const BASE_URL = import.meta.env.VITE_API_URL;
const validTabs = ['all', 'favorites', 'Hero', 'Villain']


export const getHeroesByPageAction = async (
    page: number,
    limit: number = 5,
    category: string = "all"
): Promise<HeroesResponse> => {

    if (isNaN(page))
        page = 1;

    if (isNaN(limit))
        limit = 6;

    const filter = validTabs.includes(category) ? category : 'all';

    const { data: heroesResponse } = await heroApi.get<HeroesResponse>("/", {
        params: {
            limit: limit,
            offset: (page - 1) * limit,
            category: filter
        }
    }
    );

    const heroes = heroesResponse.heroes.map(hero => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    }))


    return {
        ...heroesResponse,
        heroes: heroes
    };
}