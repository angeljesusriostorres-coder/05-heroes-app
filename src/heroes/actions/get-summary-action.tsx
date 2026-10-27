import { heroApi } from "../api/hero.api"
import type { HeroSummaryResponse } from "../types/get-hero-sumary-response"


export const getSummaryActionn = async (): Promise<HeroSummaryResponse> => {

    const { data } = await heroApi.get<HeroSummaryResponse>("summary");

    return data;
}



