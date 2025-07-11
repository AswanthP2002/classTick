import { signOut } from "firebase/auth";
import { auth } from "../firebase";

async function adminLogout(){
    try {
        const result = await signOut(auth)
        //alert('Logout successfully')
        //console.log('logout result', result)
    } catch (error) {
        console.log('Error occured whhile logout', error)
        //alert('error')
    }
}

export default adminLogout