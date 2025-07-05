import ActiveStudents from './Students'
import AttendedStudents from './Attended'
import AbsentStudents from './Absent'
import SelectedStudents from './Selected'
import ExternalBatchAttendees from './ExternalBatchStudents'
//import AlternateSession from './components/AlternateSessionStudents'
import SelectedExternalStudents from './selectedExternalStudents'
import SelectedAlternativeSessionStudents from './SelectedAlternativeSessionStudents'
import ReportEditor from './ReportEditor'

export default function ReportGenerator() {
    return (
        <div className='w-full !px-4 !py-3'>
            <div className="flex w-full gap-10">
                <ActiveStudents />
                <div>
                    <div className='flex gap-10 bg-gray-100 h-fit !p-2 rounded'>
                        <ExternalBatchAttendees />
                        <SelectedStudents />
                    </div>
                    <ReportEditor />
                </div>

            </div>
            <div className='border border-gray-200 w-full !mt-2 !mb-2'></div>
            <p className="text-center !mb-2">Attendance preview</p>
            <div className="grid cols-4 w-full !p-3 !gap-5">
                <AttendedStudents />
                <SelectedExternalStudents />
                <SelectedAlternativeSessionStudents />
                <AbsentStudents />
            </div>
        </div>
    )
}