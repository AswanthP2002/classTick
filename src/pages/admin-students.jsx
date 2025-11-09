import Cards from "../components/cards"
import { students } from "../assets/students"
import { useContext, useEffect, useState } from "react"
import ActionModal from "../components/Modal"
import { getStudents } from "../services/getStudents"
import deleteStudent from "../services/deleteStudent"
import Swal from "sweetalert2"
import GenieLoader from "../components/Loading"
import {LuShieldCheck, LuLogOut} from 'react-icons/lu'
import { FaMagnifyingGlass } from "react-icons/fa6"
import {RiUserAddLine} from 'react-icons/ri'
import { StudentContext } from "../components/StudentContext"
import adminLogout from "../services/adminLogout"


export default function StudentManagePage(){

    const {logoutSuccess} = useContext(StudentContext)
    
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

    async function logoutAdmin(){
        Swal.fire({
            icon:'warning',
            title:'Logout?',
            showConfirmButton:true,
            confirmButtonText:'Yes',
            showCancelButton:true,
            allowEscapeKey:false,
            allowOutsideClick:false,
            cancelButtonText:'No'
        }).then(async (result) => {
            if(!result.isConfirmed){
                return
            }

            try {
                await adminLogout()
                Swal.fire({
                    icon:'success',
                    title:'Logged out',
                    showConfirmButton:false,
                    showCancelButton:false,
                    allowEscapeKey:false,
                    allowOutsideClick:false,
                    timer:2000
                }).then(() => {
                    logoutSuccess()
                    window.location.reload()
                })
            
            } catch (error) {
                Swal.fire({
                    icon:'error',
                    title:'Error',
                    text:error?.message,
                    allowEscapeKey:false,
                    allowOutsideClick:false 
                })
            }
        })
        
    }    

    function onAddStudent(name, status){
        setStudents(prv => [...prv, {name, status}])
    }

    function onUpdateStudent(id, name, status){
        const editableStudent = studentsData.find((student) => student.id === id)
        editableStudent.name = name
        editableStudent.status = status
        setStudents(prv => [...prv, editableStudent])
    }

    async function studentDelete(studentId){
        Swal.fire({
            icon:'warning',
            title:'Are you sure?',
            text:'This action can not be redo',
            showConfirmButton:true,
            showCancelButton:true,
            confirmButtonText:'Yes',
            cancelButtonText:'No',
            allowEscapeKey:false,
            allowOutsideClick:false
        }).then(async (result) => {
            if(result.isConfirmed){
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
        })

        
    }

    useEffect(() => {
        (async function(){
            setLoading(true)
            const studentsArray = await getStudents()
            console.log('This is student data', studentsArray)
            setStudents(studentsArray)
            setStudentsCount(studentsArray.length)
            setLoading(false)

        })()
    }, [])

    return(
        <>
        <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-white relative !px-5 md:!px-10 lg:!px-20 !py-10">
                {
                    loading && (
                        <div className="absolute left-0 top-0 w-full h-screen flex justify-center items-center">
                            <GenieLoader />
                        </div>
                    )
                }

            <div className="page-header w-full flex justify-between gap-5">
                <div className="flex gap-2">
                    <div className="shadow-lg w-12 h-12 flex justify-center items-center bg-gradient-to-br from-green-600 to-green-400 rounded-md">
                        <LuShieldCheck size={22} color='white' />
                    </div>
                    <div>
                        <p className="text-green-600">Admin Dashboard</p>
                        <p className="text-xs sm:text-base">Manage students and application data</p>
                    </div>
                </div>
                <button onClick={logoutAdmin} className="border border-2 flex items-center text-red-500 gap-2 !px-3 h-fit !py-2 cursor-pointer border-red-500 rounded-md"><LuLogOut /> Logout</button>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-5 !mt-10">
                <div className="search flex-1  flex gap-2 items-center bg-gray-200 rounded-md !py-2 !px-3">
                    <FaMagnifyingGlass size={15} color="gray" />
                    <input type="text" name="" id="" placeholder="search students......." className="rounded-full w-full !px-4 w-[300px] outline-none text-gray-500 border border-gray-200 h-full" />
                </div>
                <button onClick={openModal} className="bg-gradient-to-br from-green-500 to-green-600 flex !py-2 !px-5 justify-center items-center gap-2 text-white cursor-pointer rounded-md">
                    <RiUserAddLine />
                    Add Student
                </button>
            </div>

            <div className="w-full !mt-10">
                <p className="text-base font-medium">Students ({studentsCount})</p>
            </div>
            
            <div className="w-full !mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {
                    studentsData.map((data, index) => {
                        return <Cards enableEdits={enableEdits} studentDelete={studentDelete} data={data} index={index} />
                    })
                }
            </div>
        </div>

        <ActionModal onAddStudent={onAddStudent} onUpdateStudent={onUpdateStudent} modalStatus={modalStatus} editData={editData} isEdit={isEdit}  closeModal={closeModal} />
        </>
    )
}