import Cards from "../components/cards"
import { students } from "../assets/students"
import { useEffect, useState } from "react"
import Modal from "../components/Modal"
import { getStudents } from "../services/getStudents"
import deleteStudent from "../services/deleteStudent"
import Swal from "sweetalert2"
import GenieLoader from "../components/Loading"

export default function StudentManagePage(){
    
    const [modalStatus, setModalStatus] = useState(false)
    const [studentsData, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const [editData, setEditData] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [studentsCount, setStudentsCount] = useState(0)

    const openModal = () => setModalStatus(true)
    const closeModal = () => setModalStatus(false)

    function enableEdits(index){
        alert('function called')
        setEditData(studentsData[index])
        setIsEdit(true)
        openModal()
    }

    async function studentDelete(studentId){
        try {
            await deleteStudent(studentId)
            Swal.fire({
                icon:'success',
                title:'Deleted',
                showConfirmButton:false,
                showCancelButton:false,
                timer:2000
            }).then(() => window.location.reload())
        } catch (error) {
            //console.log('error occured', error)
            Swal.fire({
                icon:'error',
                title:'Error',
                text:error?.message
            })
        }
    }

    useEffect(() => {
        (async function(){
            setLoading(true)
            const studentsArray = await getStudents()
            // console.log('This is student data', studentsArray)
            setStudents(studentsArray)
            setStudentsCount(studentsArray.length)
            setLoading(false)

        })()
    }, [])

    return(
        <>
        <div className="w-full h-screen relative">
                {
                    loading && (
                        <div className="absolute left-0 top-0 w-full h-screen flex justify-center items-center">
                            <GenieLoader />
                        </div>
                    )
                }
            <div className="w-full !p-5">
                <p className="text-xl font-semibold">Students ({studentsCount})</p>
            </div>
            <div className="flex justify-end gap-5 !px-5 !mb-3">
                <div className="search">
                    <input type="text" name="" id="" placeholder="search students......." className="rounded-full !px-4 w-[300px] outline-none text-gray-500 border border-gray-200 h-full" />
                </div>
                <button onClick={openModal} type="button" className="border border-gray-200 rounded-sm !p-2 cursor-pointer">Add Student <i className="fa-solid fa-plus"></i></button>
            </div>
            <div className="w-full max-h-[600px] overflow-y-scroll !p-5 grid grid-cols-2 lg:grid-cols-5 gap-5">
                {
                    studentsData.map((data, index) => {
                        return <Cards enableEdits={enableEdits} studentDelete={studentDelete} data={data} index={index} />
                    })
                }
            </div>
        </div>

        <Modal modalStatus={modalStatus} editData={editData} isEdit={isEdit}  closeModal={closeModal} />
        </>
    )
}