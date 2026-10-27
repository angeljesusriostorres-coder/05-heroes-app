
import { useQuery } from "@tanstack/react-query";
import { getSearchHeroesAction, type Options } from "../actions/search-heroes.action";


export const useSearchHero = ({ name, team, category, universe, status, strength }: Options) => {
    return useQuery({
        queryKey: ['hero-search', { name, team, category, universe, status, strength }],
        queryFn: () => getSearchHeroesAction({ name, team, category, universe, status, strength }),
        staleTime: 1000 * 60 * 5,//5 min tiempo en el que la peticion se considera fresca
        retry: false
    });

}

