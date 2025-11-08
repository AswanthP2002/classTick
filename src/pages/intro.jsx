import { useContext, useState } from 'react'
import attendGenieLogo from '/attendGenie.png'
import { Link, useNavigate } from 'react-router-dom'
import { themeContext } from '../contexts/themeContext'
import {FiFileText} from 'react-icons/fi'
import {LuShieldCheck} from 'react-icons/lu'
import {FaUserGear, FaAngleDown, FaAngleUp} from 'react-icons/fa6'
import { CiCircleInfo } from 'react-icons/ci'
import { FiUser } from 'react-icons/fi'
import { FaLinkedin, FaInstagram } from 'react-icons/fa6'
import { versionInfo } from '../assets/version.info'


export default function HomePage(){

    const socialMedia = [
        {id:1, domain:'Linkedin', icon:<FaLinkedin />, url:'https://www.linkedin.com/in/aswanth-prathayoth/'},
        {id:2, domain:'Instagram', icon:<FaInstagram />, url:'https://www.instagram.com/aswanth.1s'}
    ]

    const {theme} = useContext(themeContext)
    const [dropDownView, setDropDownView] = useState(false)
    const navigator = useNavigate()

    const goToGeneratePage = () => {
        navigator('/editor')
    }
    const goToControllPage = () => navigator('/control')
    const goToAdminPage = () => {
        navigator('/admin/login')
    }
    return(
        <div className='bg-gradient-to-br from-blue-50 to-white-500 w-full !px-5 md:!px-20 lg:!px-20 xl:!px-40'>
            <div className="w-full flex flex-col items-center !mb-10">
                {/* <img src={attendGenieLogo} className='w-[250px] md:w-[350px]' alt="" /> */}
                <div className='!mt-20 bg-gradient-to-br shadow-lg from-violet-500 to-blue-600 rounded-md w-20 h-20 flex items-center justify-center'>
                    <FiFileText size={40} color='white' />
                </div>
                <p className="text-blue-500 !mt-5">Session Report Maker BCR64</p>
                <p className="text-gray-700 text-base !mt-5 text-center !mb-5">
                    Create Session report by with just few clicks to streamline 
                    your process and improve productivity
                </p>

                <div className="w-full !mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div onClick={goToGeneratePage} className="w-full cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all report bg-white rounded-md border border-gray-300 !p-5">
                        <div className='bg-gradient-to-br from-blue-400 to-blue-500 w-12 h-12 flex justify-center items-center rounded-md'>
                            <FiFileText size={23} color='white' />
                        </div>
                        <p className="title !mt-3 font-medium">Report</p>
                        <p className="description !mt-4 text-gray-700">Generate structured session report with just a few clicks.</p>
                    </div>

                    <div className="cursor-not-allowed report bg-white rounded-md border border-gray-300 !p-5">
                        <div className='bg-gradient-to-br from-pink-600 to-indigo-400 w-12 h-12 flex justify-center items-center rounded-md'>
                            <FaUserGear color='white' size={23} />
                        </div>
                        <p className="title !mt-3 font-medium text-gray-300">Associate Admin (Upcoming)</p>
                        <p className="description !mt-4 text-gray-300">Admin access to manage students (Add, Remove, Update)</p>
                    </div>

                    <div onClick={goToAdminPage} className="hover:shadow-lg cursor-pointer hover:-translate-y-1 transition-all report bg-white rounded-md border border-gray-300 !p-5">
                        <div className='bg-gradient-to-br from-green-600 to-green-400 w-12 h-12 flex justify-center items-center rounded-md'>
                            <LuShieldCheck size={23} color='white' />
                        </div>
                        <p className="title !mt-3 font-medium">Super Admin</p>
                        <p className="description !mt-4 text-gray-700">Manage Students & App level data</p>
                    </div>
                </div>
                {/* <div className='flex flex-col gap-5 lg:flex-row'>
                    <div id='report-dv' onClick={goToGeneratePage} className={`lg:w-1/3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-in-out relative border border-gray-300 cursor-pointer card bg-${theme === 'dark' ? 'white' : 'genie'} rounded-sm text-${theme === 'dark' ? 'black' : 'white'} !p-3 flex flex-col items-center justify-center`}>
                        <p className="font-semibold text-lg">Report</p>
                        <p className="text-sm text-center">Generate structured session report with just a few clicks.</p>
                    </div>

                    <div className="lg:w-1/3 cursor-not-allowed relative card bg-gray-300 rounded-sm text-white !p-3 flex flex-col items-center justify-center">
                        <p className="font-semibold text-lg">Associate Admin</p>
                        <p className="text-sm text-center">Admin access to manage students (Add, Remove, Update)</p>
                        <label htmlFor="" className='absolute bg-red-500 rounded-full !px-2 left-0 top-0' style={{ fontSize: '.5rem' }}>New</label>
                    </div>

                    <div id='admin-dv' onClick={goToAdminPage} className={`lg:w-1/3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-in-out border border-gray-300 cursor-pointer card bg-${theme === 'dark' ? 'white' : 'genie'} rounded-sm text-${theme === 'dark' ? 'black' : 'white'} !p-3 flex flex-col items-center justify-center`}>
                        <p className="font-semibold text-lg">Super Admin</p>
                        <p className="text-sm text-center">Manage students & App level data</p>
                    </div>
                </div>
             */}
                    {/* <p className='text-sm font-semibold !mt-3 text-blue-500 cursor-not-allowed'><u>Want to be an Associate Admin ?</u></p> */}
                
                <div className="!mt-20 rounded border w-full border-gray-300 !p-5">
                    <div className="flex justify-between">
                        <div className='flex gap-2 items-center'>
                        <div className='w-12 h-12 bg-gray-500 flex rounded-md justify-center items-center'>
                            <CiCircleInfo size={23} color='white' />
                        </div>
                        <div>
                            <p className='font-medium'>Version Info</p>
                            <p className='text-gray-700'>Current version 2.0.0</p>
                        </div>
                        </div>
                    <button onClick={() => setDropDownView(prv => !prv)} className='hover:bg-gray-300 !p-3 cursor-pointer rounded-md'>
                        {
                            dropDownView
                                ? <FaAngleUp size={20} />
                                : <FaAngleDown size={20} />
                        }
                    </button>
                    </div>
                    {
                        dropDownView && (
                            <div className="dropdown !mt-5 transition-all duration-100">
                                {
                                    versionInfo.map((item, index) => {
                                        return(
                                            <div key={index} className="update flex gap-2 !mb-5">
                            <div className='!p-1 bg-gray-500'></div>
                            <div>
                                <p>Update version {item.version} ({item.date} - {item.typeOfUpdate})</p>
                                <ul>
                                    {
                                        item.features.map((feature, index) => {
                                            return(
                                                <li className='text-sm text-gray-700' key={index}>~ {feature}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                                        )
                                    })
                                }
                    </div>
                        )
                    }
                </div>

                <div className="border border-gray-300 w-full !mt-10 !p-5 bg-indigo-100 rounded-md">
                    <div className="grid grid-cols-1 items-center sm:grid-cols-2 gap-3">
                        <div className="flex gap-2 items-center">
                            <div className="w-13 h-13 flex justify-center items-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500">
                                <FiUser size={23} color='white' />
                            </div>
                            <div>
                                <p className='font-medium'>Aswanth P</p>
                                <p className='text-gray-700 text-playwrite'>Class Tick</p>
                            </div>
                        </div>
                        <div className="social-media flex gap-2">
                            {
                                socialMedia.map((item, index) => {
                                    return(
                                    <div key={index} className='w-full bg-white h-fit !p-1 rounded-sm cursor-pointer hover:bg-gray-300'>
                                        <span onClick={() => window.open(item.url)} className="flex gap-2 items-center">
                                            {item.icon}
                                            <p>{item.domain}</p>
                                        </span>
                                    </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}