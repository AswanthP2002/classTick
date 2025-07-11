import ActiveStudents from './Students'
import AttendedStudents from './Attended'
import AbsentStudents from './Absent'
import SelectedStudents from './Selected'
import ExternalBatchAttendees from './ExternalBatchStudents'
//import AlternateSession from './components/AlternateSessionStudents'
import SelectedExternalStudents from './selectedExternalStudents'
import SelectedAlternativeSessionStudents from './SelectedAlternativeSessionStudents'
import ReportEditor from './ReportEditor'
import { useEffect, useState } from 'react'
import GenieLoader from './Loading'

export default function ReportGenerator() {
    const [defaultLoading, setDefaultLoading] = useState(false)

    useEffect(() => {
        setDefaultLoading(true)
        setTimeout(() => {
            setDefaultLoading(false)
        }, 2000);
    }, [])

    return (
        <> 
        {defaultLoading && (
                <div style={{zIndex:99999}} className="absolute left-0 top-0 w-full h-screen flex items-center bg-white justify-center">
                    <GenieLoader />
                </div>
            )}
        
        <div className='w-full !px-4 !py-3'>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
                <div className=''>
                    <ActiveStudents />
                </div>
                <div className=''>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 h-fit !p-2 rounded'>
                        <ExternalBatchAttendees />
                        <SelectedStudents />
                    </div>
                    <ReportEditor />
                </div>

            </div>
            <div className='border border-gray-200 w-full !mt-2 !mb-2'></div>
            <p className="text-center !mb-2">Attendance preview</p>
            <div className="!grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full !p-3 !gap-5">
                <AttendedStudents />
                <SelectedExternalStudents />
                <SelectedAlternativeSessionStudents />
                <AbsentStudents />
            </div>
        </div>
        </>
    )
}