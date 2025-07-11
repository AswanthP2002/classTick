export default function Cards({ data, studentDelete, index, enableEdits }) {
    return (
        <>
                <div className="shadow cursor-pointer card border border-gray-100 rounded !p-3">
                    <div className="profile flex justify-center items-center">
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
                    </div>
                </div>
        </>
    )
}