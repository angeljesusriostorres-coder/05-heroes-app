import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { useSearchParams } from "react-router";

interface Props {
    totalPages: number
}


export const CustomPagination = ({ totalPages }: Props) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = searchParams.get('page') ?? 1;

    const page = isNaN(+currentPage) ? 1 : +currentPage

    const handleChangePage = (page: number) => {

        setSearchParams((prev) => {
            prev.set('page', (page).toString())
            return prev
        })
    }


    return (
        <>
            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2">
                <Button variant="outline" size="sm" disabled={page === 1}
                    onClick={
                        () => {
                            handleChangePage(page - 1)
                        }
                    }
                >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </Button>

                {
                    Array.from({ length: totalPages }).map((_, index) => (
                        <Button
                            key={index + 1}
                            variant={
                                page === index + 1 ? "default" : "outline"
                            }
                            onClick={() => {
                                handleChangePage(index + 1)
                            }}

                            size="sm">
                            {index + 1}

                        </Button>
                    ))
                }

                <Button variant="outline" size="sm" disabled={page === totalPages}
                    onClick={
                        () => {
                            handleChangePage(page + 1)
                        }
                    }>
                    Next
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div >
        </>
    )
}
