import { useContext, useEffect, useRef, useState } from "react"
import { students } from "../assets/students"
import { StudentContext } from "./StudentContext"
export default function AttendedStudents(){
    const  {attendees, addAttendees} = useContext(StudentContext)
    // const [copiedText, setCopiedText] = useState("")
    const listRef = useRef(null)
    const tagTitle = `*Attendees🟢🟢🟢*\n\n`
    let copiedText
    useEffect(() => {
        const list = listRef.current.innerHTML
        copiedText = attendees.map((student) => {
            return `✅ ${student.name}`
        }).join('\n')
    }, [attendees])

    async function copyText(){
        try {
            await navigator.clipboard.writeText(tagTitle + copiedText)
        } catch (error) {
            alert(error.message)
            console.log('Erro occured while copying', error)
        }
    }
    return(
        <>
        <div className="border border-gray-300 !p-3 !rounded-md col-1">
            <h3 className="text-center font-bold text-md">Attended / Done</h3>
            <button onClick={copyText} type="button" className="btn-copy cursor-pointer">Copy <i className="fa-solid fa-copy"></i></button>
            <ul ref={listRef}>
                {
                    attendees.map((student, index) => {
                        return <li>✅ {student.name}</li>
                    })
                }
            </ul>
        </div>
        </>
    )
}