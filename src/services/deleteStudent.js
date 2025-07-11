import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";

async function deleteStudent(studentId){
    try {
        await deleteDoc(doc(db, "students", studentId))
        //console.log('Deleted student')
        return true
    } catch (error) {
        //console.log('Error occured while deleting the student', error)
    }
}

export default deleteStudent