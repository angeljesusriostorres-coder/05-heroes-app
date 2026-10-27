
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb"
import { useSearchParams } from "react-router"
import { use, useMemo } from "react"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/components/context/FavoriteHeroContext"

export const HomePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { favorites, favoriteCount } = use(FavoriteHeroContext);


    const tabSelector = searchParams.get('tab') ?? 'all';

    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '6';
    const category = searchParams.get('category') ?? 'all';


    const { data: heroSummaryResponse } = useHeroSummary();


    const validTab = useMemo(() => {
        const validTabs = ['all', 'favorites', 'Hero', 'Villain']
        return validTabs.includes(tabSelector) ? tabSelector : 'all'
    }, [tabSelector])



    // const [tabSelector, setTabSelector] = useState<'all' |
    //     'favorites' |
    //     'heroes' |
    //     'villains'>("all");

    // useEffect(() => {
    //     getHeroesByPage().then(
    //     )
    // }, [])
    const { data: heroesResponse } = usePaginatedHero({ page: +page, limit: +limit, category })


    return (
        <>
            <>
                {/* Header */}
                <CustomJumbotron title="Superhero Universe" description="Discover, explore, and manage your favorite superheroes and villains" />
                <CustomBreadcrumb currentPage="Super Heroes" />
                {/* Stats DashBoard */}
                <HeroStats />
                {/* Tabs */}
                <Tabs value={validTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger onClick={() => {
                            setSearchParams((prev) => {
                                prev.set('tab', "all")
                                prev.set('category', "all")
                                prev.set('page', "1")
                                return prev

                            })
                        }} value="all">All Characters ({heroSummaryResponse?.totalHeroes})</TabsTrigger>

                        <TabsTrigger onClick={() => {
                            setSearchParams((prev) => {
                                prev.set('tab', "favorites")
                                return prev
                            })
                        }} value="favorites" className="flex items-center gap-2">
                            Favorites ({favoriteCount})
                        </TabsTrigger>

                        <TabsTrigger onClick={() => {
                            setSearchParams((prev) => {
                                prev.set('tab', "Hero")
                                prev.set('category', "Hero")
                                prev.set('page', "1")
                                return prev

                            })

                        }} value="Hero">Heroes ({
                                heroSummaryResponse?.heroCount
                            })</TabsTrigger>

                        <TabsTrigger onClick={() => {
                            setSearchParams((prev) => {
                                prev.set('tab', "Villain")
                                prev.set('category', "Villain")
                                prev.set('page', "1")
                                return prev

                            })
                        }} value="Villain">Villains ({heroSummaryResponse?.villainCount})</TabsTrigger>
                    </TabsList>

                    <TabsContent value={"all"}>
                        <h1>Todos los Personajes</h1>
                        <HeroGrid heroes={heroesResponse?.heroes} />
                    </TabsContent>

                    <TabsContent value={"favorites"}>
                        <h1>Favoritos</h1>
                        <HeroGrid heroes={favorites} />
                    </TabsContent>
                    <TabsContent value={"Hero"}>
                        <h1>Heroes</h1>
                        <HeroGrid heroes={heroesResponse?.heroes} />
                    </TabsContent>
                    <TabsContent value={"Villain"}>
                        <HeroGrid heroes={heroesResponse?.heroes} />
                    </TabsContent>

                </Tabs>


                {/* Pagination */}
                {
                    validTab !== 'favorites' && <CustomPagination totalPages={heroesResponse?.pages ?? 0} />}


            </>
        </>
    )
}

export default HomePage;
