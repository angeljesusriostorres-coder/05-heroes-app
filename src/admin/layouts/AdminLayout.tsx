import { Outlet } from "react-router"

export const AdminLayout = () => {
    return (
        <div className="bg-amber-600 text-2xl text-white">
            <Outlet />
        </div>
    )
}
