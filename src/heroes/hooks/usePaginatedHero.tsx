import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-bay-page.actions";
interface Props {
    page: number,
    limit?: number,
    category?: string
}
export const usePaginatedHero = ({ page, limit, category }: Props) => {
    return useQuery({
        queryKey: ['heroes', { page, limit, category }],
        queryFn: () => getHeroesByPageAction(+page, limit, category),
        staleTime: 1000 * 60 * 5//5 min tiempo en el que la peticion se considera fresca
    });

}
