import { createContext, useState } from "react";
import { students } from "../assets/students";
export const StudentContext = createContext()

export function StudentProvider({children}){
    //custome--

    const [attendees, setAttendees] = useState([])
    const [absentees, setAbsentees] = useState(students)
    const [externalBatch, setExternalBatch] = useState([])
    const [alternativeSession, setAlternativeSession] = useState([])

    function handleRemarks(studentId, remarks = ""){
        const changeAffectStudent = absentees.filter((student) => {
            return student.id === studentId
        })[0]

        changeAffectStudent.remarks = remarks
        setAbsentees((prevState) => {
            return [prevState.filter((stud) => stud !== studentId), changeAffectStudent]
        })
    }
    
    const attend = []
    function addAttendees(studentId){
        const ab = absentees.filter((student) => {
            return studentId !== student.id
        })
        const at = absentees.find((student) => {
            return student.id === studentId
        })
        attend.push(at)
        setAttendees(prev => {
            return [...prev, at]
        })
        setAbsentees(ab)
    }

    function unselectAlternative(studentId){
        const unselectedStudent = alternativeSession.find((student) => {
            return student.id === studentId
        })

        setAbsentees((prev) => {
            return [...prev, unselectedStudent]
        })
        
        setAlternativeSession((prev) => {
            return alternativeSession.filter((student) => student.id !== studentId)
        })
    }

    function addAlternativeSession(studentId){
        const student = absentees.filter((stud) => {
            return stud.id === studentId
        })

        setAbsentees((prevState) => {
            return prevState.filter((stud) => {
                return stud.id !== studentId
            })
        })

        setAlternativeSession((prevState) => {
            return [...prevState, ...student]
        })
    }

    function unselect(studentId, category = null){
        // alert(`Unselect triggered ${studentId}`)
        const ab = attendees.find((student) => {
            return student.id === studentId
        })

        setAbsentees(prev => {
            return [...prev, ab]
        })

        const at = attendees.filter((student) => {
            return student.id !== studentId
        })

        setAttendees(at)
    }

    function addExternalBatchStudents(student, duplicate){
        setExternalBatch(prevState => {
            if(duplicate){
                return prevState.filter((stud) => stud !== student)
            }else{
                return [...prevState, student]
            }
        })
    }

    function removeExternalBatchStudents(student){
        setExternalBatch(prevState => {
            return prevState.filter((stud) => stud !== student)
        })
    }

    return(
        <StudentContext.Provider value={{attendees, absentees, externalBatch, alternativeSession, unselectAlternative, handleRemarks, addAttendees, unselect, addExternalBatchStudents, removeExternalBatchStudents, addAlternativeSession}}>
            {children}
        </StudentContext.Provider>
    )
}