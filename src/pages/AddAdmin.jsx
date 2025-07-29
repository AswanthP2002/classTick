import { useEffect, useState } from "react"
import { getStudents } from "../services/getStudents"
import GenieLoader from "../components/Loading"
import Swal from "sweetalert2"
import updateStudent from "../services/editStudent"

export default function AddAssociateAdmin(){
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const [identifiedStudentName, setIdentifiedStudentName] = useState("")
    const [identifiedStudentData, setIdentifiedStudentData] = useState({})

    useEffect(() => {
        
        (async function(){
            setLoading(true)
            const studentList = await getStudents()
            setStudents(studentList)
            setLoading(false)
            console.log(studentList)
        })()
    }, [])

    function selectStudnet(name){
        //alert(name)
        //alert('Select function triggered')
        setIdentifiedStudentName(name)
        // const selectedStudent = students.find((student) => {
        //     if(student.name.toLowerCase() === name.toLowerCase()){
        //         return student
        //     }
        // })
        // setIdentifiedStudentData(selectedStudent)
        // alert(identifiedStudentName)
    }

    async function submit(){

        if(!identifiedStudentName) return
        Swal.fire({
            icon:'info',
            title:'Confirm your role upgrade?',
            text:`You’re about to become an Associate Admin. 
            This will grant you access to manage student data 
            and perform administrative actions. Please confirm to proceed.`,
            confirmButtonText:'Yes, upgrade',
            showCancelButton:true,
            allowOutsideClick:false
        }).then(async (response) => {
            if(response.isConfirmed){
                const studentData = students.find((student, index) => {
                    if(student.name.toLowerCase() === identifiedStudentName.toLowerCase()){
                        return student
                    }
                })

                console.log('Student data', studentData)
                try {
                    const updateResult = await updateStudent(studentData.id, {...studentData, role:'associate-admin'})
                    Swal.fire({
                        icon:'success',
                        title:'Upgraded',
                        text:'You are now an Associate Admin'
                    })
                } catch (error) {
                    Swal.fire({
                        icon:'error',
                        title:'Error',
                        text:error.message
                    })
                }
                
            }else{
                return
            }
        })
    }

    return(
        <div className="w-full h-screen bg-genie">
            {loading && (<GenieLoader />)}
            <div className="w-full header !p-3">
                <p className="text-2xl font-semibold font-libre text-white text-center">Join as an Associate Admin</p>
                <p className="text-white text-sm text-center">
                    Get admin level access to manage students and keep things running seamlessly.
                    As an Associate Admin, you ensure the system stays active and responsive.
                </p>
            </div>
            <div className="main w-full !mt-10 flex flex-row items-center justify-center">
                <div className="">
                    <label htmlFor="" className="block font-semibold text-white text-lg text-center">Confirm your identity</label>
                    <label htmlFor="" className="block text-white text-sm text-center">
                        Choose your name to proceed with role elevation. 
                        This step is required to grant operational access as an Associate Admin.
                    </label>
                    <select value={identifiedStudentName} onChange={(event) => selectStudnet(event.target.value)} className="outline-none w-full !mt-2 border border-gray-200 bg-white rounded !p-1" name="" id="">
                        <option value="">Who am I ?</option>
                        {
                            students.map((student, index) => {
                                return <option key={index} value={student.name}>{student.name}</option>
                            })
                        }
                    </select>
                </div>
                
            </div>
            <div className="flex justify-center">
                <button className="!mt-3 cursor-pointer bg-green-400 rounded !p-1" type="button" onClick={submit}>Confirm & continue</button>
            </div>
        </div>
    )
}

// Choose your name to proceed with role elevation. This step is required to grant operational access as an Associate Admin.