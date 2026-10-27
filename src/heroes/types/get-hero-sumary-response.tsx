import type { Hero } from "./hero-interface";

export interface HeroSummaryResponse {
    totalHeroes: number;
    strongestHero: Hero;
    smartestHero: Hero;
    heroCount: number;
    villainCount: number;
}

