import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import { useSearchParams } from "react-router";
import { useSearchHero } from "@/heroes/hooks/useSearchHero";
import { HeroGrid } from "@/heroes/components/HeroGrid";

export const SearchPage = () => {
    const [searchParams] = useSearchParams();

    const name = searchParams.get('name') ?? undefined;
    const team = searchParams.get('team') ?? undefined;
    const category = searchParams.get('category') ?? undefined;
    const universe = searchParams.get('universe') ?? undefined;
    const status = searchParams.get('status') ?? undefined;

    const strength = searchParams.get('currentStrength') !== null ? (Number(searchParams.get('currentStrength'))) : undefined;

    const { data: HeroesSearch } = useSearchHero({ name, team, category, universe, status, strength })

    return (
        <>
            <CustomJumbotron title="Search Superheroes" description="Discover, explore, and manage your favorite superheroes and villains" />
            <CustomBreadcrumb currentPage="Search Superhero"
                breadCrum={[
                ]}
            />

            <HeroStats />

            <SearchControls />

            <HeroGrid heroes={HeroesSearch} />


        </>
    )
}

export default SearchPage;