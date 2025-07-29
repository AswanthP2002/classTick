import attendGenieLogo from '/attendGenie.png'
import { Link, useNavigate } from 'react-router-dom'

export default function HomePage(){
    const navigator = useNavigate()

    const goToGeneratePage = () => navigator('/editor')
    const goToControllPage = () => navigator('/control')
    const goToAdminPage = () => navigator('/admin/login')
    return(
        <div className="w-full h-screen bg-white !px-5">
            <div className="w-full h-full flex flex-col items-center justify-center">
                <img src={attendGenieLogo} className='w-[250px] md:w-[350px]' alt="" />
                
                <div className='flex flex-col gap-5 lg:flex-row'>
                    <div onClick={goToGeneratePage} className="lg:w-1/3 cursor-pointer card bg-genie rounded-sm text-white !p-3 flex flex-col items-center justify-center">
                        <p className="font-semibold text-lg">Report</p>
                        <p className="text-sm text-center">Generate structured session report with just a few clicks.</p>
                    </div>

                    <div className="lg:w-1/3 cursor-not-allowed relative card bg-gray-300 rounded-sm text-white !p-3 flex flex-col items-center justify-center">
                        <p className="font-semibold text-lg">Associate Admin</p>
                        <p className="text-sm text-center">Admin access to manage students (Add, Remove, Update)</p>
                        <label htmlFor="" className='absolute bg-red-500 rounded-full !px-2 left-0 top-0' style={{ fontSize: '.5rem' }}>New</label>
                    </div>

                    <div onClick={goToAdminPage} className="lg:w-1/3 cursor-pointer card bg-genie rounded-sm text-white !p-3 flex flex-col items-center justify-center">
                        <p className="font-semibold text-lg">Super Admin</p>
                        <p className="text-sm text-center">Manage students & App level data</p>
                    </div>
                </div>
            
                    <p className='text-sm !mt-3 text-blue-500 cursor-not-allowed'><u>Want to be an Associate Admin ?</u></p>
                
                
            </div>
        </div>
    )
}