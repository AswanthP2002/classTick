import { useContext } from "react"
import { StudentContext } from "./StudentContext"
import adminLogout from "../services/adminLogout"

export default function SideBar() {
    const { logedAdmin, setLogedAdmin, logoutSuccess } = useContext(StudentContext)
    
    async function logoutAdmin(){
        try {
            await adminLogout()
            logoutSuccess()
            window.location.reload()
        } catch (error) {
            // console.log('Error occured while logouting', error)
        }
    }
    return (
        <div className="w-[300px] h-screen bg-genie hidden md:block" style={{zIndex:2}}>
            <div className="brand w-full flex items-center justify-center !py-5 !mt-10">
                <p className="text-xl font-bold font-libre">AttendGenie</p>
            </div>
            <div className="nav w-full !px-10 !py-5">
                <ul>
                    <li className="!text-center bg-white rounded-full text-sm !py-1 !mt-2 cursor-pointer">Manage students</li>
                </ul>
            </div>
            {
                logedAdmin && (<div className="logout !px-10 !mt-5">
                    <button onClick={logoutAdmin} type="button" className="cursor-pointer"><i className="fa-solid fa-arrow-right-from-bracket !me-3"></i> Logout</button>
                </div>)
            }
        </div>
    )
}