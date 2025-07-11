import { useContext, useEffect, useState } from "react"
import { StudentContext } from "./StudentContext"
import insertStudent from "../services/addStudent"
import Swal from "sweetalert2"
import updateStudent from "../services/editStudent"

export default function Modal({ modalStatus, closeModal, isEdit = false, editData = null }) {

    const {GeneiAlert} = useContext(StudentContext)

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [status, setStatus] = useState('')
    const [statusError, setStatusError] = useState('')

    useEffect(() => {
        // console.log('Datas before execution', editData, isEdit)
        if(isEdit && editData){
            setName(editData.name)
            setStatus(editData.status)
        }
    }, [editData, isEdit])

    async function addStudent(){
        const namerror = !name || !/^[A-Za-z]&/ || false
        const statuserror = !status || false

        namerror ? setNameError('Give a valid name') : setNameError('')
        statuserror ? setStatusError('Add status') : setStatusError('')

        if(namerror || statuserror) return

        try {
            const insertedStudentId = await insertStudent(name, status)
            
            if(insertedStudentId){
                
                closeModal()
                //GeneiAlert({icon:'success', message:'student added'}) :: need rework, didn't worked as expected
                Swal.fire({
                    icon:'success',
                    title:'Added',
                    showConfirmButton:false,
                    showCancelButton:false,
                    timer:1500
                }).then(() => window.location.reload())
            }
        } catch (error) {
            closeModal()
            GeneiAlert({icon:'error', message:'can not add'})
        }

        
    }

    async function updateCurrentStudent(){
        try {
            await updateStudent(editData.id, {name, status})
            Swal.fire({
                icon:'success',
                title:'Updated',
                showConfirmButton:false,
                showCancelButton:true,
                timer:2000
            }).then(() => window.location.reload())
        } catch (error) {
            // console.log(error)
            Swal.fire({
                icon:'error',
                title:'Error',
                text:error?.message
            })
        }
    }

    return (
        <>
            {
                modalStatus && (
                    <div className="absolute w-screen h-screen flex items-center justify-center transparent">
                        <div className="modal w-[350px] border border-gray-300 rounded-sm bg-white shadow">
                            <div className="w-full !p-3 flex justify-end"><i onClick={closeModal} className="cursor-pointer fa-solid fa-close"></i></div>
                            <p className="text-center">Add Student</p>
                            <div className="!px-5 !py-3">
                                <div className="name">
                                    <label htmlFor="" className="text-xs">Name</label>
                                    <input value={name} onChange={(event) => setName(event.target.value)} type="text" name="" id="" className="outline-none w-full border border-gray-300 rounded-sm !p-1" />
                                    <label htmlFor="" className="error-label text-xs text-red-500">{nameError}</label>
                                </div>
                                <div className="status !mt-2">
                                    <label htmlFor="" className="text-xs">Status</label>
                                    <select value={status} onChange={(event) => setStatus(event.target.value)} name="" id="" className="outline-none w-full border border-gray-300 rounded-sm !p-1">
                                        <option value="">Select status</option>
                                        <option value="Active">Active</option>
                                        <option value="Refreshment">Refreshment</option>
                                        <option value="Suspended">Suspended</option>
                                        <option value="Break">On Break</option>
                                    </select>
                                    <label htmlFor="" className="error-label text-xs text-red-500">{statusError}</label>
                                </div>
                                <div className="!mt-2">
                                    <button onClick={isEdit ? updateCurrentStudent : addStudent} type="button" className="bg-blue-500 text-white rounded !p-1 w-full cursor-pointer">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}