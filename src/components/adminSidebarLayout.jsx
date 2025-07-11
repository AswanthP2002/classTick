import {Outlet} from 'react-router-dom'
import SideBar from "./adminSideBar"
import { StudentContext } from './StudentContext'
import { useContext } from 'react'

export default function SidebarLayout(){
    const { logedAdmin, setLogedAdmin, logoutSuccess } = useContext(StudentContext)
    
    async function logoutAdmin(){
        try {
            await adminLogout()
            logoutSuccess()
            window.location.reload()
        } catch (error) {
            console.log('Error occured while logouting', error)
        }
    }
    return(
        <div className="w-full h-screen grid grid-cols-1 md:grid md:grid-cols-[300px_1fr]">
            <SideBar />
            <Outlet />
            <div style={{zIndex:5}} className="fixed md:hidden bg-gray-300 class bottom-0 w-screen h-[40px] flex items-center gap-5 justify-between !px-4">
                <p className="font-libre text-sm font-semibold">AttendGenie</p>
                <button>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
                <button type="button">
                    <i className="fa-solid fa-bars"></i>
                </button>
            </div>
        </div>
    )
}