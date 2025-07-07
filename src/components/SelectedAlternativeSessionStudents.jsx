import { useContext, useEffect } from "react";
import { StudentContext } from "./StudentContext";

export default function SelectedAlternativeSessionStudents() {
    const { alternativeSession, unselectAlternative } = useContext(StudentContext)

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
                    <div className="border border-gray-300 rounded !p-3">
                        <h3 className="text-center font-semibold">Alternative Session</h3>
                        <button onClick={copyText} type="button" className="btn-copy cursor-pointer">Copy <i className="fa-solid fa-copy"></i></button>
                        <ul className="!mt-3">
                            {
                                alternativeSession.map((student) => {
                                    return(
                                        <>
                                            <li className="list-none !text-sm">✅ {student.name}
                                            <button  onClick={() => unselectAlternative(student.id)} type="button" className="cursor-pointer text-red-500 !ms-2 !font-semibold">Unselect</button></li>
                                        </>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            }
        </>
    )
}