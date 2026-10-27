import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero-interface";


const BASE_URL = import.meta.env.VITE_API_URL;

export const getHero = async (heroSlug: string) => {
    const { data: heroResponse } = await heroApi.get<Hero>(`/${heroSlug}`);
    return {
        ...heroResponse,
        image: `${BASE_URL}/images/${heroResponse.image}`
    }

}