import { Badge } from "@/components/ui/badge"
import {
    Heart,
    Users,
    Zap,
    // Trophy,
} from "lucide-react"
import { HeroStatsCard } from "./HeroStatsCard"

import { useHeroSummary } from "../hooks/useHeroSummary";
import { use } from "react";
import { FavoriteHeroContext } from "@/components/context/FavoriteHeroContext";

export const HeroStats = () => {

    const { data: heroSummaryResponse } = useHeroSummary();
    const { favoriteCount } = use(FavoriteHeroContext);

    if (!heroSummaryResponse) {
        return (<div>Loading...</div>)
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">


            <HeroStatsCard
                title="Total Characters"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
                children={
                    <>
                        <div className="text-2xl font-bold">{heroSummaryResponse?.totalHeroes ?? 0}</div>
                        <div className="flex gap-1 mt-2">
                            <Badge variant="secondary" className="text-xs">
                                {heroSummaryResponse?.heroCount ?? 0} Heroes
                            </Badge>
                            <Badge variant="destructive" className="text-xs">
                                {heroSummaryResponse?.villainCount ?? 0} Villains
                            </Badge>
                        </div>
                    </>
                }
            />
            <HeroStatsCard
                title="Total Favorites"
                icon={<Heart className="h-4 w-4 text-muted-foreground" />}
                children={
                    <>
                        <div className="text-2xl font-bold text-red-600" data-testid="favorite-count-id">{favoriteCount}</div>
                        <p className="text-xs text-muted-foreground" data-testid="favorite-test-id" >{(favoriteCount * 100) / (heroSummaryResponse?.totalHeroes ?? 1)}% of total</p>
                    </>
                }
            />
            <HeroStatsCard
                title="Strongest"
                icon={<Zap className="h-4 w-4 text-muted-foreground" />}
                children={
                    <>
                        <div className="text-lg font-bold">{heroSummaryResponse?.strongestHero.name}</div>
                        <p className="text-xs text-muted-foreground">strength : {heroSummaryResponse?.strongestHero.strength ?? 0}/10</p>
                    </>
                }
            />
            <HeroStatsCard
                title="Smartest"
                icon={<Heart className="h-4 w-4 text-muted-foreground" />}
                children={
                    <>
                        <div className="text-lg font-bold">{heroSummaryResponse?.smartestHero.name}</div>
                        <p className="text-xs text-muted-foreground">intelligence:{heroSummaryResponse?.smartestHero.intelligence}/10</p>
                    </>
                }
            />


        </div>


    )
}
