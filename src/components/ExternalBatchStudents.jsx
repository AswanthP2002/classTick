import { useContext, useState } from "react"
import { StudentContext } from "./StudentContext"
import { RiUserAddFill } from "react-icons/ri"
import { LuUserPlus } from "react-icons/lu"

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
        <div className="!mt-5">
            <p className="font-semibold text-sm !mb-1">Session Type</p>
            <div className="">
                <div>
                    <input onChange={() => setIsRegularSession(true)} type="radio" name="session" id="" className="cursor-pointer" checked={isRegularSession ? true : false} />
                    <label htmlFor="" className="text-sm font-medium !ms-1">Regular Session</label>
                </div>
                <div>
                    <input onChange={() => setIsRegularSession(false)} type="radio" name="session" id="" className="cursor-pointer" checked={isRegularSession ? false : true} />
                    <label htmlFor="" className="text-sm font-medium !ms-1">Combined Session</label>
                </div>
                
            </div>
            {
                isRegularSession && (
                        <div className="!mt-5 flex">
                            <input type="checkbox" checked={isPresent ? true : false} onChange={toggleCheck} />
                            <label htmlFor="" className="text-sm font-medium !ms-2">Students attended from another batch?</label>
                        </div>
                )
            }
        {
            isPresent && (
                        <div className="!mt-3 border border-gray-300 rounded-md !p-3 w-full">
                            <p className="text-sm font-medium !mb-1">External Batch student</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div className="flex gap-2 w-full">
                                <div className="bg-gray-100 flex-1 !px-1 !py-1 rounded-md">
                                <input value={student} onChange={(event) => setStudent(event.target.value)} type="text" placeholder="Enter name" className="rounded !text-sm !px-2 !outline-none" />
                                <label className="!text-red-500 !text-xs !block" htmlFor="">{studentNameError}</label>
                                </div>
                                <div className="bg-gray-100 !px-1 !py-1 rounded-md">
                                <input value={batch} onChange={(event) => setBatch(event.target.value.toUpperCase())} type="text" name="" id="" placeholder="batch" className="w-[100px] rounded !text-sm !px-2 !outline-none" />
                                <label htmlFor="" className="!text-red-500 !text-xs !block">{studentBatchError}</label>
                                </div>
                                
                            </div>
                            <button onClick={addStudents} type="button" className="cursor-pointer flex w-full items-center gap-2 text-sm font-medium text-indigo-500 border border-2 rounded-md justify-center !px-3 !py-1 w-fit">
                                Add
                                <LuUserPlus />
                            </button>
                            </div>
                            
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