import { createHashRouter, Navigate } from "react-router";
// import { HomePage } from "../heroes/pages/home/HomePage";
// import { HeroesPage } from "../heroes/pages/hero/HeroesPage";
// import { SerachPage } from "../heroes/pages/search/SerachPage";
// import { AdminPage } from "../admin/pages/AdminPage";
import { HeroesLayout } from "../heroes/layouts/HeroesLayout";
import { AdminLayout } from "../admin/layouts/AdminLayout";
import { lazy } from "react";

const SearchPage = lazy(() => {
    return import('../heroes/pages/search/SearchPage');
})
const HomePage = lazy(() => {
    return import('../heroes/pages/home/HomePage');
})
const HeroesPage = lazy(() => {
    return import('../heroes/pages/hero/HeroesPage');
})
const AdminPage = lazy(() => {
    return import('../admin/pages/AdminPage');
})


// export const AppRouter = createBrowserRouter([
export const AppRouter = createHashRouter([
    {
        path: '/',
        element: <HeroesLayout />,
        children: [
            {
                // path: "",
                index: true,
                element: <HomePage />,
            },
            {
                path: "heroes/:idSlug",
                element: <HeroesPage />,
            },
            {
                path: "search",
                element: <SearchPage />,
            },
            {
                path: "*",
                element: <Navigate to={"/"} />,
            },
        ]
    },

    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                // path: "",
                index: true,
                element: <AdminPage />,
            },
        ]
    },
]

)