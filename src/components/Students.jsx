import { useContext, useEffect, useState } from "react"
import { students } from "../assets/students"
import { StudentContext } from "./StudentContext"
import useSort from "../hooks/useSort"
import Swal from 'sweetalert2'
import SmartAssist from "./SmartAssist"
import useReadMeetlist from "../hooks/useReadMeetlist"

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

    useEffect(() => {
        Swal.fire(({
            icon:'info',
            title:'Info',
            text:'Student status may be inaccurate due to outdated information.',
            width:window.innerWidth < 500 ? '90%' : '450px',
            showConfirmButton:true,
            showCancelButton:false,
            allowOutsideClick:false
        }))
    }, [])
    return(
        <>  
            <div className="w-full">
            <h3 className="text-center font-bold text-md">Total Students</h3>
                <div className="search w-full flex justify-between">
                    <input onChange={(event) => searchPeople(event.target.value)} type="text" name="" className="!mb-3 border border-gray-200 rounded-full !px-3 !py-2 w-[250px] outline-none text-xs" placeholder="Search name" id="" />
                    {/* <SmartAssist excelScanner={excelScanner} /> */}
                </div>
                <table className="table w-full border border-gray-200 rounded-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <td className="font-semibold text-md !p-2">Name</td>
                            <td className="font-semibold text-md !p-2">Status</td>
                            <td className="font-semibold text-md !p-2 hidden md:block">Info</td>
                            <td className="font-semibold text-md !p-2">Action</td>
                            {/* <td className="!p-2">Remarks</td> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchedStudens.map((student, index) => {
                                return(
                                    <tr>
                                        <td className="!p-2">{student.name}</td>
                                        <td className="!md:p-2">
                                            {student.status === 'Active' && (<p className="text-green-500">{`${student.status[0].toUpperCase()}${student.status.slice(1)}`}</p>)}
                                            {student.status === 'Suspended' && (<p className="text-red-500">{`${student.status[0].toUpperCase()}${student.status.slice(1)}`}</p>)}
                                            {student.status === 'Refreshment' && (<p className="text-blue-400">{`${student.status[0].toUpperCase()}${student.status.slice(1)}`}</p>)}
                                            {student.status === 'Break' && (<p className="text-gray-500">{`${student.status[0].toUpperCase()}${student.status.slice(1)}`}</p>)}
                                        </td>
                                        <td className="hidden md:block">
                                            {student.status === 'Active' && (<i className="fa-regular fa-face-smile"></i>)}
                                            {student.status === 'Suspended' && (<i className="fa-regular fa-face-tired"></i>)}
                                            {student.status === 'Refreshment' && (<i className="fa-solid fa-rotate-right"></i>)}
                                            {student.status === 'Break' && (<i className="fa-solid fa-plane-departure"></i>)}
                                        </td>
                                        <td className="!md:p-2">
                                            <button onClick={() => addAttendees(student.id)} type="button" className="!ms-3 bg-blue-300 rounded-sm cursor-pointer text-xs !px-3 !py-1">Select</button>
                                            <button onClick={() => addAlternativeSession(student.id)} type="button" className="!ms-3 bg-red-200 rounded-sm cursor-pointer text-xs !px-3 !py-1">Alt Session</button>
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