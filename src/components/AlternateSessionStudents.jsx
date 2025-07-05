import { useState } from "react"

export default function AlternateSession(){
    const [isPresent, setIsPresent] = useState(false)

    const toggleCheck = () => {
        setIsPresent(prevState => !prevState)
    }

    return(
        <>
        <div className="">
            <div>
            <input type="checkbox" checked={isPresent ? true : false} onChange={toggleCheck} />
            <label htmlFor="" className="text-xs !ms-2">Students attended from another batch?</label>
        </div>
        {
            isPresent && (
                        <div className="flex gap-3 !mt-3">
                            <input type="text" placeholder="Enter name" className="border border-gray-200 rounded !text-sm !px-2 !outline-none" />
                            <button type="button" className="bg-green-400 text-white rounded !text-xs !px-2 !py-1">Add</button>
                        </div>
            )
        }
        </div>
        </>
    )
}