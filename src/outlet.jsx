import { Outlet } from "react-router-dom"
import Footer from "./components/footer"

export default function Layout(){
    return(
        <div className="w-full">
            <Outlet />
            <Footer />
        </div>
    )
}