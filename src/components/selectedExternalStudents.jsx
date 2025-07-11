import { useContext, useEffect } from "react";
import { StudentContext } from "./StudentContext";

export default function SelectedExternalStudents() {
    const { externalBatch } = useContext(StudentContext)
    // console.log('External batch students', externalBatch)

    const tagTitle = `*External Batch Attendees🟢🟢🟢*\n\n`
    let copiedText

    async function copyText(){
        await navigator.clipboard.writeText(tagTitle + copiedText)
    }

    useEffect(() => {
        copiedText = externalBatch.map((student) => {
            return `✅ ${student}`
        }).join('\n')
    }, [externalBatch])

    return (
        <>
            {
                externalBatch.length > 0 && (
                    <div className="border border-gray-300 rounded !p-3">
                        <h3 className="text-center font-semibold">External Batch Attendees</h3>
                        <button onClick={copyText} type="button" className="btn-copy cursor-pointer">Copy <i className="fa-solid fa-copy"></i></button>
                        <ul className="!mt-3">
                            {
                                externalBatch.map((student, index) => {
                                    return <li className="list-none !text-sm">✅ {student}</li>
                                })
                            }
                        </ul>
                    </div>
                )
            }
        </>
    )
}