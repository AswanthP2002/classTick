export default function SmartAssist({excelScanner}){

    return(
        <div>
            <label htmlFor="" className="text-xs block">Upload meetlist find attendees easly</label>
            <input onChange={(event) => excelScanner(event)} type="file" className="border border-gray-300 rounded !text-xs" placeholder="Upload meetlist" />
        </div>
    )
}