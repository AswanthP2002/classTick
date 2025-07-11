import {db} from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getStudents(){
    try {
        const resultSnapshot = await getDocs(collection(db, "students"))
        const studentsData = resultSnapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}))
        return studentsData
    } catch (error) {
       // console.log('Error occured while geting the data from the fire base', error)
    }
}
