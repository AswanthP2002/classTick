import { FiUser } from "react-icons/fi"
import {FaRegEdit} from 'react-icons/fa'
import {RiDeleteBinLine} from 'react-icons/ri'

/**
 * active
 * refreshemnt
 * cool off
 * break
 * suspended
 */
export default function Cards({ data, studentDelete, index, enableEdits }) {

    const getPill = (status) => {
        switch (status) {
            case 'Active':
               return (
                <span className="text-xs font-medium bg-green-300 !px-3 text-green-800 rounded-full">{status}</span>
               )
            case 'Refreshment':
                return (
                    <span className="text-xs font-medium bg-blue-300 !px-3 text-blue-800 rounded-full">{status}</span>
                )
            case 'Suspended':
                return (
                    <span className="text-xs font-medium bg-red-300 !px-3 text-red-800 rounded-full">{status}</span>
                )
            case 'Break':
                return (
                    <span className="text-xs font-medium bg-orange-300 !px-3 text-orange-800 rounded-full">{status}</span>
                )
            default:
                return

        }
        
    }

    return (
        <>
                <div className="card border border-gray-300 rounded-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out !p-5 bg-white">
                    <div className="flex gap-2 items-center">
                        <div className="w-11 h-11 flex justify-center items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
                            <FiUser size={20} color='white' />
                        </div>
                        <div>
                            <p className="font">{data.name}</p>
                            <p className="text-sm text-gray-700">Stack</p>
                        </div>
                    </div>
                    <div className="!mt-10">{getPill(data.status)}</div>
                    <div className="actions flex gap-5 !mt-5 w-full">
                        <button onClick={() => enableEdits(index)} className="w-full flex gap-2 items-center justify-center !px-3 !py-1 rounded-md cursor-pointer border border-2 border-blue-200 text-blue-500">
                            <FaRegEdit />
                            <p className="font-medium">Update</p>
                        </button>
                        <button onClick={(event) => studentDelete(data.id)} className="w-full flex gap-2 items-center justify-center !px-3 !py-1 rounded-md cursor-pointer border border-2 border-red-200 text-red-500">
                            <RiDeleteBinLine />
                            <p className="font-medium">Delete</p>
                        </button>
                    </div>
                    {/* <div className="profile flex justify-center items-center">
                        <i className="fa-solid fa-user !text-gray-400 border border-gray-200 !p-3 rounded-full"></i>
                    </div>
                    <div className="details">
                        <p className="text-center !mt-4 font-libre text-sm">{data.name}</p>
                        <div className="flex justify-center">
                            {data.status === 'Active' && (<label htmlFor="" className="bg-green-300 text-xs !px-2 rounded-full text-white !mt-3">{data.status}</label>)}
                            {data.status === 'Refreshment' && (<label htmlFor="" className="bg-blue-300 text-xs !px-2 rounded-full text-white !mt-3">{data.status}</label>)}
                            {data.status === 'Suspended' && (<label htmlFor="" className="bg-red-300 text-xs !px-2 rounded-full text-white !mt-3">{data.status}</label>)}
                            {data.status === 'Break' && (<label className="bg-orange-300 text-xs !px-2 rounded-full text-white !mt-3">{data.status}</label>)}
                        </div>
                    </div>
                    <div className="action flex justify-center !mt-4 gap-2">
                        <button onClick={() => enableEdits(index)} type="button" className="border border-gray-200 !text-xs !px-2 !py-1">Update <i className="!ms-1 !text-xs fa-solid fa-pen"></i></button>
                        <button onClick={(event) => studentDelete(data.id)} type="button" className="border border-gray-200 !text-xs !px-2 !py-1">Delete<i className="!ms-1 !text-xs fa-solid fa-trash"></i></button>
                    </div> */}
                </div>
        </>
    )
}