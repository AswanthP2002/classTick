import { useContext, useEffect } from "react";
import { StudentContext } from "./StudentContext";

export default function SelectedAlternativeSessionStudents() {
    const { alternativeSession } = useContext(StudentContext)

    const tagTitle = `*Alternative Session🟢🟢🟢*\n\n`
    let copiedText

    async function copyText() {
        await navigator.clipboard.writeText(tagTitle + copiedText)
    }

    useEffect(() => {
        copiedText = alternativeSession.map((student) => {
            return `✅ ${student.name}`
        }).join('\n')
    }, [alternativeSession])

    return (
        <>
            {
                alternativeSession.length > 0 && (
                    <div className="border border-gray-300 rounded p-3 col-3">
                        <h3 className="text-center font-bold text-md">Alternative Session</h3>
                        <button onClick={copyText} type="button" className="btn-copy cursor-pointer">Copy <i className="fa-solid fa-copy"></i></button>
                        <ul>
                            {
                                alternativeSession.map((student) => {
                                    return <li className="list-none">✅ {student.name} ({student.remarks})</li>
                                })
                            }
                        </ul>
                    </div>
                )
            }
        </>
    )
}