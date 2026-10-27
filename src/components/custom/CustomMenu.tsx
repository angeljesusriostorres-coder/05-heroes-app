import { Link, useLocation } from "react-router"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu"
import { cn } from "cn";

export const CustomMenu = () => {
    const { pathname } = useLocation();

    const isActive = (path: string) => {
        return path === pathname
    }
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link
                        to="/"
                        className={cn(isActive("/") && "bg-blue-200 rounded-md", "flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1")}
                    >
                        Inicio
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link
                        to="/heroes/1"
                        className={cn(isActive("/heroes/1") && "bg-blue-200 rounded-md", "flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1")}
                    >
                        Heroes Page
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link
                        to="/search"
                        className={cn(isActive("/search") && "bg-blue-200 rounded-md ", "flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1")}
                    >
                        Search
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link
                        to="/admin"
                        className={cn(isActive("/admin") && "bg-blue-200 rounded-md", "flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1")}
                    >
                        Admin
                    </Link>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}
