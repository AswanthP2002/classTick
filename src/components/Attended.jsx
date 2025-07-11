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
            // console.log('Erro occured while copying', error)
        }
    }
    return(
        <>
        <div className="border border-gray-300 !p-3 !rounded-md">
            <h3 className="text-center font-semibold">Attendees</h3>
            <button onClick={copyText} type="button" className="btn-copy cursor-pointer">Copy <i className="fa-solid fa-copy"></i></button>
            <ul ref={listRef} className="!mt-3">
                {
                    attendees.map((student, index) => {
                        return <li className="!text-sm">✅ {student.name}</li>
                    })
                }
            </ul>
        </div>
        </>
    )
}