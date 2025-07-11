import { useContext, useState } from "react"
import { StudentContext } from "./StudentContext"

export default function GenieAlert({ infoStatus}) {
   
    const {alertStatus, setAlertStatus, icon, message, flag} = useContext(StudentContext)

    useState(() => {
        setTimeout(() => setAlertStatus(false), 2000)
    }, [])
    return (
        <>
            {
                infoStatus && (
                    <div className="absolute !p-3 left-0 top-0 w-screen h-screen transparent">
                        <div className="alert w-[200px] h-[50px] bg-white flex">
                            <div className={`h-full bg-${flag}-500 !px-1`}></div>
                            <div className="w-full h-full flex items-center !px-4">
                                <p className="text-sm">{message}</p>
                                <i className={`${icon} !text-${flag}-500 !ms-2`}></i>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}