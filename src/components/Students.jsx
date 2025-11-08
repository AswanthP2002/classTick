import { useContext, useEffect, useState } from "react"
import { students } from "../assets/students"
import { StudentContext } from "./StudentContext"
import useSort from "../hooks/useSort"
import Swal from 'sweetalert2'
import SmartAssist from "./SmartAssist"
import useReadMeetlist from "../hooks/useReadMeetlist"
import { FaMagnifyingGlass } from "react-icons/fa6"
import {IoMdTime} from 'react-icons/io'
import {RiUserAddLine} from 'react-icons/ri'


export default function ActiveStudents(){
    const [search, setSearch] = useState("")
    const [bcrFilteredStudents, setBcrFilteredStudents] = useState([])
    const [searchedStudens, setSearchedStudent] = useState([])
    const fileScanner = useReadMeetlist()
    let {addAttendees, absentees, addAlternativeSession, handleRemarks} = useContext(StudentContext)

    function searchPeople(searchValue){
        setSearch(searchValue)
    }
    //sort attendees always
    absentees = useSort(absentees)

    async function excelScanner(event){
        fileScanner(event)
            .then((result) => {
                const onlyRuled = result.filter((student) => {
                    if(student["*     Meet"].includes("BCR64") || student["*     Meet"].includes("BCR 64")){
                        return student
                    }
                })
                setBcrFilteredStudents(onlyRuled)
                console.log('BCR filtered students', onlyRuled)
                result.forEach((data) => {
                    console.log(data['*     Meet'])
                })
            })
    }

    useEffect(() => {
        if(search){
            const searchResult = absentees.filter((student) => {
                return student.name.toLowerCase().includes(search.toLowerCase())
            })
            setSearchedStudent(searchResult)
        }else{
            setSearchedStudent(absentees)
        }
        
    }, [search, absentees])

    // useEffect(() => {
    //     Swal.fire(({
    //         icon:'info',
    //         title:'Info',
    //         text:'Student status may be inaccurate due to outdated information.',
    //         width:window.innerWidth < 500 ? '90%' : '450px',
    //         showConfirmButton:true,
    //         showCancelButton:false,
    //         allowOutsideClick:false
    //     }))
    // }, [])

    const getPills = (status) => {
        switch(status){
            case 'Active' :
                return( <span className="bg-green-200 text-xs !px-2 rounded-full font-medium text-green-600">{status}</span>)
            case 'Refreshment' :
                return (<span className="bg-blue-200 text-xs !px-2 rounded-full font-medium text-blue-600">{status}</span>)
            case 'Suspended' :
                return(<span className="bg-red-200 text-xs !px-2 rounded-full font-medium text-red-600">{status}</span>)
            case 'Break' :
                return (<span className="bg-gray-200 text-xs !px-2 rounded-full font-medium text-gray-600">{status}</span>)
            default :
                return
            }   
    }
    return(
        <>  
            <div className="w-full bg-white rounded-xl border border-gray-300 !p-5">
                <p className="text-lg">Students</p>
                <div className="search !my-5 flex-1  flex gap-2 items-center bg-gray-100 rounded-md !py-2 !px-3">
                    <FaMagnifyingGlass size={15} color="gray" />
                    <input onChange={(event) => searchPeople(event.target.value)} type="text" name="" id="" placeholder="search students......." className="rounded-full w-full !px-4 w-[300px] outline-none text-gray-500 h-full" />
                </div>
                <table className="table w-full">
                    <thead>
                        <tr className="">
                            <td className="font-semibold text-md !p-2">Name</td>
                            {/* <td className="font-semibold text-md !p-2">Status</td> */}
                            {/* <td className="font-semibold text-md !p-2 hidden md:block">Info</td> */}
                            <td className="font-semibold text-md !p-2">Action</td>
                            {/* <td className="!p-2">Remarks</td> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchedStudens.map((student, index) => {
                                return(
                                    <tr className="border-t border-gray-300">
                                        <td className="!p-2 text-sm text-gray-500">
                                            <p>{student.name}</p>
                                            {getPills(student.status)}
                                        </td>
                                        {/* <td className="!md:p-2">
                                            {student.status === 'Active' && (<p className="text-xs text-green-500">{`${student.status[0].toUpperCase()}${student.status.slice(1)}`}</p>)}
                                            {student.status === 'Suspended' && (<p className="text-xs text-red-500">{`${student.status[0].toUpperCase()}${student.status.slice(1)}`}</p>)}
                                            {student.status === 'Refreshment' && (<p className="text-xs text-blue-400">{`${student.status[0].toUpperCase()}${student.status.slice(1)}`}</p>)}
                                            {student.status === 'Break' && (<p className="text-xs text-gray-500">{`${student.status[0].toUpperCase()}${student.status.slice(1)}`}</p>)}
                                        </td> */}
                                        {/* <td className="hidden md:block">
                                            {student.status === 'Active' && (<i className="fa-regular fa-face-smile"></i>)}
                                            {student.status === 'Suspended' && (<i className="fa-regular fa-face-tired"></i>)}
                                            {student.status === 'Refreshment' && (<i className="fa-solid fa-rotate-right"></i>)}
                                            {student.status === 'Break' && (<i className="fa-solid fa-plane-departure"></i>)}
                                        </td> */}
                                        <td className="!md:p-2 flex !py-2">
                                            <button onClick={() => addAttendees(student.id)} type="button" className="flex font-medium items-center gap-1 text-green-500 !ms-3 border border-gray-300 rounded-md cursor-pointer text-xs !px-3 !py-1">
                                                <RiUserAddLine />
                                                Select
                                            </button>
                                            <button onClick={() => addAlternativeSession(student.id)} type="button" className="font-medium text-blue-500 flex items-center gap-1 !ms-3 border border-gray-300 rounded-md cursor-pointer text-xs !px-3 !py-1">
                                                <IoMdTime />
                                                Alt session
                                            </button>
                                        </td>
                                        {/* <td className="!p-2">
                                            <input style={{cursor:"not-allowed"}} disabled={true} value={student.remarks} onChange={(event) => handleRemarks(student.id, event.target.value)} type="text" name="" id="" className="!text-xs border border-gray-300 rounded !outline-none !p-1" />
                                        </td> */}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}