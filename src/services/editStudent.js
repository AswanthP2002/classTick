import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

async function updateStudent(studentid, updateData){
    try {
        const refDoc =  doc(db, "students", studentid)
        await updateDoc(refDoc, updateData)
        //console.log('Updated successfully')
    } catch (error) {
        // console.log('Error occured while updating the student', error)
    }
}

export default updateStudent