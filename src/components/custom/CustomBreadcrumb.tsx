import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "react-router";
import { Fragment } from "react/jsx-runtime";

interface Breadcrum {
    label: string;
    to: string
}

export interface Props {
    currentPage: string,
    breadCrum?: Breadcrum[]
}

export const CustomBreadcrumb = ({ currentPage, breadCrum = [] }: Props) => {
    return (
        <>
            <Breadcrumb className="mb-3">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link to="/">
                            Home
                        </Link>
                    </BreadcrumbItem>


                    {
                        breadCrum.map((bread, index) => {
                            return (
                                < Fragment key={`${bread.to}-${index}`} >
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <Link to={bread.to}>
                                            {bread.label}
                                        </Link>
                                    </BreadcrumbItem>
                                </Fragment>
                            )

                        })
                    }

                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </>
    )
}
