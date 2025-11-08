import { createContext, useEffect, useState } from "react";
import { students } from "../assets/students";
import { getStudents } from "../services/getStudents";
export const StudentContext = createContext()

export function StudentProvider({children}){
    //custome--
    const [logedAdmin, setLogedAdmin] = useState(localStorage.getItem('adminAttendGenie') || null)
    const [loginError, setLoginError] = useState('')
    const [attendees, setAttendees] = useState([])
    const [absentees, setAbsentees] = useState(students)
    const [externalBatch, setExternalBatch] = useState([])
    const [alternativeSession, setAlternativeSession] = useState([])
    const [alertStatus, setAlertStatus] = useState(false)
    const [flag, setFlag] = useState('')
    const [message, setMessage] = useState('')
    const [icon, setIcon] = useState('')
    const [adminNavbarVisible, setAdminNavbarVisible] = useState(true)

    useEffect(() => {
        (async function(){
            const studentsCollection = await getStudents()
            setAbsentees(studentsCollection)
        })()
    }, [])

    const openNavbar = () => setAdminNavbarVisible(true)
    const closeNavbar = () => setAdminNavbarVisible(false)

    function loginSuccess(admin){
        localStorage.setItem('adminAttendGenie', admin)
    }

    function logoutSuccess(){
        localStorage.removeItem('adminAttendGenie')
    }

    async function GeneiAlert({icon, message}){
        setMessage(message)
        switch(icon){
            case 'success' :
                setFlag('green')
                setIcon('fa-solid fa-circle-check')
                break
            case 'error' :
                setFlag('red')
                setIcon('fa-sold fa-circle-xmark')
                break
            case 'info' :
                setFlag('blue')
                setFlag('fa-solid fa-cricle-info')
                break
            case 'warning' :
                setFlag('orange')
                setFlag('fa-solid fa-circle-exclamation')
                break
            default :
                setFlag('gray')
                setFlag('fa-solid fa-triangle-exclamation')
        }
        setAlertStatus(true)
    }

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
        console.log('upcoming student data student', student)
        setExternalBatch(prevState => {
            if(duplicate){
                return prevState.filter((stud) => stud !== student)
            }else{
                return [...prevState, student]
            }
        })
        console.log('external batch', externalBatch)
    }

    function removeExternalBatchStudents(student){
        setExternalBatch(prevState => {
            return prevState.filter((stud) => stud !== student)
        })
    }
    
    useEffect(() => {
        console.log('external batch', externalBatch)
    }, [externalBatch])

    return(
        <StudentContext.Provider value={{adminNavbarVisible, logedAdmin, loginError, attendees, absentees, externalBatch, alternativeSession, alertStatus, setAlertStatus, loginSuccess, logoutSuccess, setLogedAdmin, setLoginError, unselectAlternative, handleRemarks, addAttendees, unselect, addExternalBatchStudents, removeExternalBatchStudents, addAlternativeSession, GeneiAlert, closeNavbar, openNavbar}}>
            {children}
        </StudentContext.Provider>
    )
}