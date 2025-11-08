import { useContext, useState } from "react"
import adminLogin from "../services/verifyAdmin"
import { StudentContext } from "../components/StudentContext"
import { useNavigate } from "react-router-dom"
import crossRoadsImg from '../../public/crossroads.webp'
import {Controller, useForm} from 'react-hook-form'
import {TextField, FormControl} from  '@mui/material'
import {IoMdArrowBack} from 'react-icons/io'
import { LuShieldCheck } from "react-icons/lu"
import {MdOutlineEmail, MdOutlineLock} from 'react-icons/md'

export default function AdminLoginPage(){

    const {control, formState:{errors}, watch, handleSubmit} = useForm()

    const {loginSuccess, setLogedAdmin, logedAdmin, setLoginError, loginError} = useContext(StudentContext)

    const navigator = useNavigate()

    const [passwordvisibility, setpasswordvisibility] = useState(false)
    const [email, setEmail]  = useState('')
    const [password, setpassword] = useState('')

    // console.log('this is loged admin after login', logedAdmin)

    const togglePassword = () => setpasswordvisibility(prev => !prev)

    async function login(data){
        if(!data.email || !data.password) return
        const {email, password} = data
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
        <div className="w-full flex flex-col justify-center items-center h-screen">
            <div className="w-100">
                <div onClick={() => navigator('/')} className="flex items-center gap-2 w-fit hover:bg-gray-100 !p-1 rounded-sm cursor-pointer"><IoMdArrowBack /><p>Back to home</p></div>
                <div className="login-card !mt-10 border border-gray-200 rounded-md shadow-lg !p-5">
                    <div className="flex justify-center items-center">
                        <div className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-in-out bg-gradient-to-br from-green-600 to-green-400 w-15 h-15 flex justify-center items-center rounded-md">
                            <LuShieldCheck size={30} color='white' />
                        </div>
                    </div>
                    <p className="!mt-5 text-center text-2xl">Admin Login</p>
                    <p className="!mt-3 text-center text-gray-700">Login to manage students & app level data</p>
                    <form onSubmit={handleSubmit(login)} className="!mt-10 !px-3 !pb-3">
                        <div className="email">
                            <label htmlFor="" className="font-medium text-sm block">Email</label>
                            <div className="bg-gray-100 rounded-md flex !p-2 gap-3 items-center !mt-1">
                                <MdOutlineEmail size={20} color="gray" />
                                <FormControl>
                                    <Controller 
                                        name="email"
                                        control={control}
                                        render={({field}) => (
                                            <input {...field} type="text" placeholder="Email" className="outline-none text-sm" />
                                        )}
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div className="email !mt-5">
                            <label htmlFor="" className="font-medium text-sm block">Password</label>
                            <div className="bg-gray-100 rounded-md flex !p-2 gap-3 items-center !mt-1">
                                <MdOutlineLock color="gray" size={20} />
                                <FormControl>
                                    <Controller 
                                        name="password"
                                        control={control}
                                        render={({field}) => (
                                            <input {...field} type="password" placeholder="Password" className="outline-none text-sm" />
                                        )}
                                    />
                                </FormControl>
                            </div>
                        </div>

                        <button type="submit" className="bg-gradient-to-br from-green-500 to-green-600 w-full !mt-5 rounded-md flex justify-center cursor-pointer items-center !py-1">
                            <LuShieldCheck color="white" /> 
                            <p className="text-white !ms-2">Login</p>
                        </button>
                    </form>
                </div>
            </div>
            
            {/* <div className="login-wrapper grid grid-cols-2 shadow-lg border border-gray-200 rounded w-[700px]">
                <div className="!p-3 flex flex-col justify-center">
                    <h3 className="text-xl text-center font-semibold !my-5 text-orange-200">Admin Login</h3>
                    <p className="text-xs text-center !mb-5">Welcome back, please login to continute!</p>
                    <form onSubmit={handleSubmit(login)}>
                        <FormControl fullWidth>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required:{value:true, message:'Please enter your valid email'}
                                }}
                                render={({field}) => {
                                    return <TextField
                                        {...field}
                                        variant="outlined"
                                        label="Email"
                                        error={Boolean(errors?.name)}
                                        helperText={errors?.name?.message}
                                    />
                                }}
                            />
                        </FormControl>

                        <FormControl className="!mt-5" fullWidth>
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required:{value:true, message:'Please enter your password'}
                                }}
                                render={({field}) => {
                                    return <TextField
                                        {...field}
                                        variant="outlined"
                                        label="Password"
                                        error={Boolean(errors?.name)}
                                        helperText={errors?.name?.message}
                                    />
                                }}
                            />
                        </FormControl>
                        <div className="!mt-5">
                            <button  type="submit" className="w-full cursor-pointer bg-orange-100 rounded !py-2">Login</button>
                        </div>
                    </form>
                </div>
                <div>
                    <img style={{objectFit:'cover'}} className="object-fit-cover" src={crossRoadsImg} alt="" />
                </div>
            </div> */}
            {/* <div className="card bg-genie rounded-sm !p-5 w-[350px]">
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
            </div> */}
        </div>
    )
}