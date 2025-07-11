import {db} from "../firebase";
import {addDoc, collection} from 'firebase/firestore'


export default async function insertStudent(name, status){
   try {
      const resultRef = await addDoc(collection(db, 'students'), {
        name:name,
        status:status
      })
      // console.log('student added', resultRef.id)
      return resultRef.id
   } catch (error) {
        console.log('An error occured while adding the student', error)
        return null
   }
}