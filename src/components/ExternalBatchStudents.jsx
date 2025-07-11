import { useContext, useState } from "react"
import { StudentContext } from "./StudentContext"

export default function ExternalBatchAttendees(){
    const [isPresent, setIsPresent] = useState(false)
    const [isRegularSession, setIsRegularSession] = useState(true)
    const [student, setStudent] = useState('')
    const [studentNameError, setStudentNameError] = useState('')
    const [studentBatchError, setStudentBatchError] = useState('')
    const [batch, setBatch] = useState('')

    const {externalBatch, addExternalBatchStudents, removeExternalBatchStudents} = useContext(StudentContext)

    function addStudents(){
        const nameError = !student || !/^[A-Za-z]/ || false
        const batchError = !batch || false

        nameError ? setStudentNameError('Provide Name') : setStudentNameError('')
        batchError ? setStudentBatchError('Provide Batch') : setStudentBatchError('')

        if(nameError || batchError) return
        const studentName = `${student} ${batch}`
        // let duplicate = false
        // for(let i = 0; i < externalBatch.length; i++){
        //     if(studentName.toLowerCase === externalBatch[i].toLowerCase) duplicate = true
        // }
        addExternalBatchStudents(studentName, false)
        setStudent('')
        setBatch('')
    }


    const toggleCheck = () => {
        setIsPresent(prevState => !prevState)
    }
    return(
        <>
        <div>
            <div className="flex gap-5">
                <div>
                    <input onChange={() => setIsRegularSession(true)} type="radio" name="session" id="" className="cursor-pointer" checked={isRegularSession ? true : false} />
                    <label htmlFor="" className="text-xs !ms-1">Regular Session</label>
                </div>
                <div>
                    <input onChange={() => setIsRegularSession(false)} type="radio" name="session" id="" className="cursor-pointer" checked={isRegularSession ? false : true} />
                    <label htmlFor="" className="text-xs !ms-1">Combined Session</label>
                </div>
                
            </div>
            {
                isRegularSession && (
                        <div>
                            <input type="checkbox" checked={isPresent ? true : false} onChange={toggleCheck} />
                            <label htmlFor="" className="text-xs !ms-2">Students attended from another batch?</label>
                        </div>
                )
            }
        {
            isPresent && (
                        <div className="grid gap-3 !mt-3">
                            <div className="flex gap-3">
                                <div>
                                <input value={student} onChange={(event) => setStudent(event.target.value)} type="text" placeholder="Enter name" className="border border-gray-200 rounded !text-sm !px-2 !outline-none" />
                                <label className="!text-red-500 !text-xs !block" htmlFor="">{studentNameError}</label>
                                </div>
                                <div>
                                <input value={batch} onChange={(event) => setBatch(event.target.value.toUpperCase())} type="text" name="" id="" placeholder="batch" className="border border-gray-200 w-[100px] rounded !text-sm !px-2 !outline-none" />
                                <label htmlFor="" className="!text-red-500 !text-xs !block">{studentBatchError}</label>
                                </div>
                            </div>
                            <button onClick={addStudents} type="button" className="bg-green-400 text-white rounded !text-xs !px-2 !py-1">Add</button>
                        </div>
            )
        }
        {
            externalBatch?.length > 0 && (
                <div>
                    <ul>
                        {
                            externalBatch.map((student) => {
                                return <li className="list-none !mb-1"><span className="!text-sm">{student}</span> <i onClick={() => removeExternalBatchStudents(student)} className="fa-solid fa-circle-xmark cursor-pointer"></i></li>
                            })
                        }
                    </ul>
                </div>
            )
        }
        </div>
        </>
    )
}