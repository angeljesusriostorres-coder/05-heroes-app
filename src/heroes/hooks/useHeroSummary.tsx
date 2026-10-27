import { useQuery } from "@tanstack/react-query";
import { getSummaryActionn } from "../actions/get-summary-action";

export const useHeroSummary = () => {

    return useQuery({
        queryKey: ['heroes-summary'],
        queryFn: () => getSummaryActionn(),
        staleTime: 1000 * 60 * 5//5 min tiempo en el que la peticion se considera fresca
    });

}
