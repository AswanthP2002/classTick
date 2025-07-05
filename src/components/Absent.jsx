import { useContext, useEffect, useRef, useState } from "react"
import { students } from "../assets/students"
import { StudentContext } from "./StudentContext"
export default function AbsentStudents(){
    const {absentees} = useContext(StudentContext)
    const listRef = useRef(null)
    let copiedText

    useEffect(() => {
        const list = listRef.current.innerHTML
        copiedText = absentees.map((student) => {
            return `❌ ${student.name}`
        }).join('\n')
    }, [absentees])

    async function copyText(){
        try {
            await navigator.clipboard.writeText(copiedText)
        } catch (error) {
            console.log('Error occured while copying text')
        }
    }
    return(
        <>
        <div className="border border-gray-300 !rounded-md col-4">
            <h3 className="text-center font-bold text-md">Absent / Not Done</h3>
            <button onClick={copyText} type="button" className="btn-copy cursor-pointer">Copy <i className="fa-solid fa-copy"></i></button>
            <ul ref={listRef}>
                {
                    absentees.map((student, index) => {
                        return <li>❌ {student.name} {student.status !== 'active' ? '(NA)' : null}</li>
                    })
                }
            </ul>
        </div>
        </>
    )
}