import { describe, expect, test, vi } from "vitest";
import { AppRouter } from "./app.router";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider, useParams } from "react-router";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";



// vi.mock('@/heroes/pages/home/HomePage', () => ({
//     HomePage: () => <div data-testid='home-page'></div>
// }));

// vi.mock(import("@/heroes/pages/home/HomePage"), async (importOriginal) => {
//     const actual = await importOriginal()
//     return {
//         ...actual,
//         HomePage: () => <div data-testid='home-page'>prueba test Home page</div>,
//         default: () => <div data-testid='home-page'>prueba test Home page</div>,
//     }
// });



vi.mock(import("@/heroes/layouts/HeroesLayout"), () => {
    const MockHeroesLayout = () => (
        <div data-testid="heroes-layout">
            <Outlet />
        </div>
    )
    return {
        default: MockHeroesLayout,
        HeroesLayout: MockHeroesLayout,
    }
})

vi.mock(import("@/heroes/pages/home/HomePage"), () => {
    const MockHomePage = () => (
        <div data-testid="home-page">Página de inicio</div>
    )

    return {
        default: MockHomePage,
        HomePage: MockHomePage,
    }
});


vi.mock(import("../heroes/pages/hero/HeroesPage"), () => {
    const HeroesPage = () => {
        const { idSlug } = useParams();
        return <div data-testid="hero-page">Hero: {idSlug}</div>
    }
    return {
        default: HeroesPage,
        HeroesPage: HeroesPage,
    }
});

vi.mock(import("../heroes/pages/search/SearchPage"), () => {
    const SearchPage = () => {
        return <>
            <CustomJumbotron title="Search Superheroes" description="Discover, explore, and manage your favorite superheroes and villains" />
            <CustomBreadcrumb currentPage="Search Superhero"
                breadCrum={[
                ]}
            />
        </>

    }
    return {
        default: SearchPage,
        SearchPage: SearchPage,
    }
});



describe('AppRouter', () => {
    test('should be configure as expected', () => {
        expect(AppRouter.routes).toMatchSnapshot();
    });

    test('should render home page at rooot path', async () => {
        render(<RouterProvider router={AppRouter} />)
        const homePage = await screen.findByTestId("home-page")
        expect(homePage).toBeDefined()
        // screen.debug()
    });

    test('should render home page at rooot path 2', async () => {

        const router = createMemoryRouter(AppRouter.routes, {
            initialEntries: ['/']
        })
        render(<RouterProvider router={router} />)
        const homePage = await screen.findByTestId("home-page")
        expect(homePage).toBeDefined()
        // screen.debug()
    });

    test('should render hero page at /heroes/:idSlug path ', async () => {

        const router = createMemoryRouter(AppRouter.routes, {
            initialEntries: ['/heroes/superman']
        })
        render(<RouterProvider router={router} />)
        const heroPage = await screen.findByTestId("hero-page");
        expect(heroPage.innerHTML).toContain('superman')
    });

    test('should render search page at /search path ', async () => {

        const router = createMemoryRouter(AppRouter.routes, {
            initialEntries: ['/search']
        })
        render(<RouterProvider router={router} />)

        expect(await screen.findByText("Search Superheroes"));

    });
    test('should redirect to home page for unknow router ', async () => {

        const router = createMemoryRouter(AppRouter.routes, {
            initialEntries: ['/otra pagina']
        })
        render(<RouterProvider router={router} />)
        expect(screen.getByTestId('home-page')).toBeDefined();
        screen.debug();


    });

})