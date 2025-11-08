import ActiveStudents from './Students'
import AttendedStudents from './Attended'
import AbsentStudents from './Absent'
import SelectedStudents from './Selected'
import ExternalBatchAttendees from './ExternalBatchStudents'
//import AlternateSession from './components/AlternateSessionStudents'
import SelectedExternalStudents from './selectedExternalStudents'
import SelectedAlternativeSessionStudents from './SelectedAlternativeSessionStudents'
import ReportEditor from './ReportEditor'
import { useContext, useEffect, useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { LuUsers } from 'react-icons/lu'
import {RiUserSharedLine} from 'react-icons/ri'
import GenieLoader from './Loading'
import {IoMdTime} from 'react-icons/io'
import {AiOutlineUserSwitch} from 'react-icons/ai'
import { StudentContext } from './StudentContext'
import { useNavigate } from 'react-router-dom'

export default function ReportGenerator() {
    const [defaultLoading, setDefaultLoading] = useState(false)
    const {absentees, attendees, alternativeSession, unselectAlternative, externalBatch, unselect } = useContext(StudentContext)
    const [extBatchStudents, setExtBatchStudents] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        setDefaultLoading(true)
        setTimeout(() => {
            setDefaultLoading(false)
        }, 2000);
    }, [])

   console.log('external batch student data store in the context from report generator', externalBatch)

    return (
        <> 
        {/* {defaultLoading && (
                <div style={{zIndex:99999}} className="absolute left-0 top-0 w-full h-screen flex items-center bg-white justify-center">
                    <GenieLoader />
                </div>
            )} */}
        
        <div className='w-full !px-5 !py-5 bg-gradient-to-br from-blue-50 to-white lg:!px-20 '>
            <div onClick={() => navigate('/')} className="flex items-center gap-2 w-fit hover:bg-gray-100 !p-1 rounded-sm cursor-pointer"><IoMdArrowBack /><p>Back to home</p></div>
            <p className='text-blue-500 !mt-5 !mb-5'>Generate session report</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
                <div className=''>
                    <ActiveStudents />
                    <div className="selected-students grid grid-cols-1 lg:grid-cols-2 gap-3 !mt-5">
                        <div className='border border-gray-200 rounded-md !p-5 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out'>
                            <div className="header flex items-center gap-2">
                                <LuUsers color='green' />
                                <p className="text-sm font-noraml title">Present (0)</p>
                            </div>
                            <div className='!mt-2'>
                                    {
                                        attendees.map((student) => {
                                            return <span className='flex items-center gap-2 !mb-1'>
                                                    <p className='text-xs'>{student.name}</p>
                                                    <button onClick={() => unselect(student.id)} type="button" className="btn text-red-300 hover:text-red-500 cursor-pointer text-xs">Unselect</button>
                                                   </span>
                                        })
                                    }
                            </div>
                        </div>
                        <div className='border border-gray-200 rounded-md !p-5 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out'>
                            <div className="header flex items-center gap-2">
                                <RiUserSharedLine color='red' />
                                <p className="text-sm font-noraml title">Absent (0)</p>
                            </div>
                            <div className='!mt-2'>
                                    {
                                        absentees.map((student) => {
                                            return <p className='text-xs !mb-1'>{student.name}</p>
                                        })
                                    }
                            </div>
                        </div>
                        <div className='border border-gray-200 rounded-md !p-5 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out'>
                            <div className="header flex items-center gap-2">
                                <IoMdTime color='blue' />
                                <p className="text-sm font-noraml title">Alt Session (0)</p>
                            </div>
                            <div className="!mt-2">
                                {
                                    alternativeSession.map((student) => {
                                        return(
                                            <span className='flex gap-1'>
                                                <p className='text-xs'>{student.name}</p>
                                                <button  onClick={() => unselectAlternative(student.id)} type="button" className="text-xs cursor-pointer text-red-500 !ms-2 !font-semibold">Unselect</button>
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='border border-gray-200 rounded-md !p-5 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out'>
                            <div className="header flex items-center gap-2">
                                <AiOutlineUserSwitch color='indigo' />
                                <p className="text-sm font-noraml title">External Students (0)</p>
                            </div>
                            <div className="!mt-2">
                                {
                                    externalBatch.map((student) => {
                                        return <p className='text-xs'>{student}</p>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white border border-gray-300 rounded-xl !p-5'>
                    <p>Report Details</p>
                    <div className=''>
                        <ExternalBatchAttendees />
                        {/* <SelectedStudents /> */}
                    </div>
                    <ReportEditor />
                </div>

            </div>
            {/* <div className='border border-gray-200 w-full !mt-2 !mb-2'></div>
            <p className="text-center !mb-2">Attendance preview</p>
            <div className="!grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full !p-3 !gap-5">
                <AttendedStudents />
                <SelectedExternalStudents />
                <SelectedAlternativeSessionStudents />
                <AbsentStudents />
            </div> */}
        </div>
        </>
    )
}