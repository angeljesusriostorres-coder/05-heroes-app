
import { useQuery } from "@tanstack/react-query";
import { getHero } from "../actions/getHero";

export const useHeroPage = (idSlug: string) => {
    return useQuery({
        queryKey: ['hero-page', idSlug],
        queryFn: () => getHero(idSlug),
        staleTime: 1000 * 60 * 5,//5 min tiempo en el que la peticion se considera fresca
        retry: false
    });

}


