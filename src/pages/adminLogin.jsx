import { useContext, useState } from "react"
import adminLogin from "../services/verifyAdmin"
import { StudentContext } from "../components/StudentContext"
import { useNavigate } from "react-router-dom"

export default function AdminLoginPage(){

    const {loginSuccess, setLogedAdmin, logedAdmin, setLoginError, loginError} = useContext(StudentContext)

    const navigator = useNavigate()

    const [passwordvisibility, setpasswordvisibility] = useState(false)
    const [email, setEmail]  = useState('')
    const [password, setpassword] = useState('')

    // console.log('this is loged admin after login', logedAdmin)

    const togglePassword = () => setpasswordvisibility(prev => !prev)

    async function login(){
        try {
            const admin = await adminLogin(email, password)
            if(!admin.admin){
                setLogedAdmin(null)
                setLoginError('Invalid email or password')
                alert('failed')
                return
            }

            setLogedAdmin(admin.user)
            loginSuccess(admin.user.email)
            setLoginError('')
            navigator('/admin/dashboard')
            
        } catch (error) {
            alert('error occured')
            console.log(error)
        }
    }

    return(
        <div className="w-full h-screen flex items-center justify-center">
            <div className="card bg-genie rounded-sm !p-5 w-[350px]">
                <div className="flex justify-center items-center">
                    {
                        logedAdmin && (<i className="fa-solid fa-user"></i>)
                    }
                </div>
                <p className="text-center text-white">Admin Login</p>
                <div className="credentials !mt-5">
                    <div className="w-full">
                        <label htmlFor="" className="block error-label text-red-500 !text-center text-xs">{loginError}</label>
                    </div>
                    <div className="username">
                        <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Username" type="text" name="" id="" className="outline-none rounded-sm bg-white w-full !px-2 !py-1" />
                    </div>
                    <div className="username !mt-3 relative">
                        <input value={password} onChange={(event) => setpassword(event.target.value)} placeholder="password" type={passwordvisibility ? "text" : "password"} name="" id="" className="outline-none rounded-sm bg-white w-full !px-2 !py-1" />
                        <i onClick={togglePassword} className="fa-solid fa-eye absolute right-2 !text-xs !text-gray-500 cursor-pointer top-2"></i>
                    </div>
                    <div className="!mt-3">
                        <button onClick={login} type="button" className="w-full rounded-sm bg-black text-white text-sm !p-2">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}