import { useEffect, useState } from "react"
import useReadMeetlist from "../hooks/useReadMeetlist"

export default function FileReadPage(){
    const fileScanner = useReadMeetlist()
    const [students, setStudents] = useState([])
    async function scanFile(event){
        fileScanner(event)
            .then((resul) => {
                console.log('Result ', resul)
                resul.forEach((studentData) => {
                    console.log(studentData['*     Meet'])
                })
                setStudents(resul)
            })
        
    }
    useEffect(() => {
        console.log('just testing')
    }, [students])
    return(
        <div className="w-full w-screen bg-genie">
            <input onChange={(event) => scanFile(event)} type="file" placeholder="Upload your file" />
            {
                students.length > 0
                    ? <div className="!mt-10">
                        <ul>
                            {
                                students.map((studentData, index) => {
                                    return <li key={index}>{studentData['Meet']}</li>
                                })
                            }
                        </ul>
                      </div>
                    : null
            }
        </div>
    )
}