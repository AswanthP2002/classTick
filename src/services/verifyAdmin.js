import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


async function adminLogin(email, password){
    try {
        const admin = await signInWithEmailAndPassword(auth, email, password)
        //console.log('Login successfull', admin.user)
        return {admin:true, error:null, user:admin.user}
    } catch (error) {
       // console.log('Error occured while admin login', error.message)
        return {admin:false, error:error, message:error.message}   
    }
}

export default adminLogin