import { useContext } from "react"
import { StudentContext } from "./StudentContext"

export default function SelectedStudents(){
    const {attendees, unselect} = useContext(StudentContext)
    return(
        <>
            <div className="">
                <h3 className="text-center font-bold text-md">Selected Students</h3>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attendees.map((student, index) => {
                                return <tr key={index}>
                                    <td className="text-normal lg:text-xs">{student.name}</td>
                                    <td className="!px-2">
                                        <button onClick={() => unselect(student.id)} type="button" className="btn text-red-300 hover:text-red-500 cursor-pointer text-xs me-2">Unselect</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}