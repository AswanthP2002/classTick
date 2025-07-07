import { useEffect, useState } from "react";
import { students } from "../assets/students";
import InputEmoji from 'react-input-emoji'
import EmojiPicker from 'emoji-picker-react'
import { captions } from "../assets/energyCaptions";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StudentContext } from "./StudentContext";


export default function ReportEditor(){
    const {attendees, absentees, externalBatch, alternativeSession} = useContext(StudentContext)

    const [coordinator1, setCoordinator1] = useState('')
    const [coordinator1Error, setCoordinator1Error] = useState('')
    const [coordinator2, setCoordinator2] = useState('')
    const [coordinator2Error, setCoordinator2Error] = useState('')
    const [reportDate, setReportDate] = useState('')
    const [reportDateError, setReportDateError] = useState('')
    const [creator, setCreator] = useState('')
    const [creatorError, setCreatorError] = useState('')
    const [activity, setActivity] = useState('')
    const [activityError, setActivityError] = useState('')
    const [topic, setTopic] = useState('')
    const [start, setStart] = useState('')
    const [startError, setStartError] = useState('')
    const [end, setEnd] = useState('')
    const [endError, setEndError] = useState('')
    const [sessionOverview, setSessionOverview] = useState('')
    const [tldv, setTldv] = useState('')
    const [meetlist, setmeetlist] = useState('')
    const [loading, setloading] = useState(false)
    const [buttonText, setButtonText] = useState('Generate Report')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const handleEmojiPick = (emojiData) => {
        setSessionOverview(prev => prev + emojiData.emoji)
    }

    const handleEmojiPickerVisibility = () => setShowEmojiPicker(prev => !prev)

    const navigator = useNavigate()

    function generateReport(){
        const reportDateError = !reportDate || false
        const coordinator1error = !coordinator1 || false
        const coordinator2error = !coordinator2 || false
        const creatorerror = !creator || false
        const activityerror = !activity || false
        const starterror = !start || false
        const enderror = !end || false

        reportDateError ? setReportDateError('Please provide date') : setReportDateError('')
        coordinator1error ? setCoordinator1Error('Select coordinator') : setCoordinator1Error('')
        coordinator2error ? setCoordinator2Error('Select coordinator') : setCoordinator2Error('')
        creatorerror ? setCreatorError('Enter creator name') : setCreatorError('')
        activityerror ? setActivityError('Enter activity name') : setActivityError('')
        starterror ? setStartError('Enter start time') : setStartError('')
        enderror ? setEndError('Enter end time') : setEndError('')



        if(reportDateError || coordinator1error || coordinator2error || creatorerror || activityError || starterror || enderror) return


        setloading(true)
        setButtonText('Geting started...')
        let i = 0
        const interval = setInterval(() => {
            setButtonText(captions[i])
            i++
            if(i >= captions.length){
                setButtonText('Delivered')
                clearInterval(interval)
                setloading(false)
                navigator('/report', 
                    {state:{
                        coordinator1, 
                        coordinator2, 
                        reportDate, 
                        creator, 
                        activity, 
                        topic, 
                        sessionOverview, 
                        start, 
                        end, 
                        tldv, 
                        meetlist, 
                        attendeesArray:attendees, 
                        absenteesArray:absentees, 
                        externalBatchArray:externalBatch, 
                        alternativeSessionArray:alternativeSession
                    }})
            }
        }, 2000);
    }

    useEffect(() => {
        console.log('date for report', reportDate)
    }, [reportDate])

    return(

        <div className="!mt-3">
            <p className="font-semibold text-sm !mb-2">Edit Report <span className="text-xs bg-green-300 !px-2 rounded text-white">New</span></p>
            <div className="grid grid-cols-3 gap-2">
                <div className="w-full">
                    <label htmlFor="" className="text-xs text-gray-400 !mb-1 block">Date</label>
                    <input value={reportDate} onChange={(event) => setReportDate(event.target.value)} type="date" name="" id="" className="border border-gray-200 !text-sm !p-1 rounded-sm outline-none w-full" />
                    <label htmlFor="" className="error-label text-red-500 text-xs block">{reportDateError}</label>
                </div>
                <div className="w-full">
                    <label htmlFor="" className="text-xs text-gray-400 !mb-1 block">Coordinator</label>
                    <select value={coordinator1} onChange={(event) => setCoordinator1(event.target.value)} name="" id="" className="border border-gray-200 !text-sm !p-1 rounded-sm outline-none w-full">
                    <option value="">Coordinator 1</option>
                    {
                        students.map((student, index) => {
                            return(<option>{student.name}</option>)
                        })
                    }
                </select>
                <label htmlFor="" className="error-label text-red-500 text-xs block">{coordinator1Error}</label>
                </div>

                <div>
                    <label htmlFor="" className="text-xs text-gray-400 !mb-1 block">Coordinator</label>
                    <select value={coordinator2} onChange={(event) => setCoordinator2(event.target.value)} name="" id="" className="border border-gray-200 !text-sm !p-1 rounded-sm outline-none">
                    <option value="">Coordinator 2</option>
                    {
                        students.map((student, index) => {
                            return(<option>{student.name}</option>)
                        })
                    }
                </select>
                <label htmlFor="" className="error-label text-red-500 text-xs block">{coordinator2Error}</label>
                </div>
                
            </div>

            <div className="grid grid-cols-3 gap-2 !mt-2">
                <div className="w-full">
                    <label htmlFor="" className="text-xs text-gray-400 !mb-1 block">Report Made by</label>
                    <input type="text" name="" id="" value={creator} onChange={(event) => setCreator(event.target.value)} className="w-full border border-gray-200 !text-sm !p-1 rounded-sm outline-none" />
                    <label htmlFor="" className="error-label text-red-500 text-xs block">{creatorError}</label>
                </div>
                    <div className="w-full">
                        <label htmlFor="" className="text-xs text-gray-400 !mb-1 block">Starting Time</label>
                        <input type="text" name="" id="" value={start} onChange={(event) => setStart(event.target.value)} className="w-full border border-gray-200 !text-sm !p-1 rounded-sm outline-none" />
                        <label htmlFor="" className="error-label text-red-500 text-xs block">{startError}</label>
                    </div>

                    <div className="w-full">
                        <label htmlFor="" className="text-xs text-gray-400 !mb-1 block">Ending Time</label>
                        <input type="text" name="" id="" value={end} onChange={(event) => setEnd(event.target.value)} className="w-full border border-gray-200 !text-sm !p-1 rounded-sm outline-none" />
                        <label htmlFor="" className="error-label text-red-500 text-xs block">{endError}</label>
                    </div>

                    
            </div>
            <div className="w-full">
                        <label htmlFor="" className="text-xs text-gray-400 !mb-1 block">Activity</label>
                        <input type="text" name="" id="" value={activity} onChange={(event) => setActivity(event.target.value)} className="!w-full border border-gray-200 !text-sm !p-1 rounded-sm outline-none" />
                        <label htmlFor="" className="error-label text-red-500 text-xs block">{activityError}</label>
            </div>

            <div className="!mt-2">
                    <label htmlFor="" className="text-xs text-gray-400 !mb-1 block">Topic</label>
                    <InputEmoji value={topic} onChange={setTopic} placeholder="Topic name..." />
            </div>

            <div className="!mt-2">
                    <label htmlFor="" className="text-xs text-gray-400 !mb-1 block">Session Overview</label>
                    <div className="border border-gray-200 rounded relative">
                        <textarea value={sessionOverview} onChange={(event) => setSessionOverview(event.target.value)} name="" rows={8} id="" className="w-full outline-none"></textarea>
                        <button onClick={handleEmojiPickerVisibility} type="button" className="btn-emoji cursor-pointer !text-xs !ms-2 !mb-2 border border-gray-200 !p-1">{showEmojiPicker ? 'Close' : 'Add Emoji'}</button>
                        {
                            showEmojiPicker && (<div className="absolute">
                            <EmojiPicker onEmojiClick={handleEmojiPick} />
                        </div>)
                        }
                    </div>
            </div>

            <div className="!mt-2 w-full">
                <label htmlFor="" className="text-xs text-gray-400 !mb-1 block">TLDV Link</label>
                <input type="text" name="" id="" value={tldv} onChange={(event) => setTldv(event.target.value)} className="w-full border border-gray-200 !text-sm !p-1 rounded-sm outline-none" />
            </div>

            <div className="!mt-2 w-full">
                <label htmlFor="" className="text-xs text-gray-400 !mb-1 block">Meetlist Link</label>
                <input type="text" name="" id="" value={meetlist} onChange={(event) => setmeetlist(event.target.value)} className="w-full border border-gray-200 !text-sm !p-1 rounded-sm outline-none" />
            </div>
            <div className="!mt-2 w-full">
                <button onClick={generateReport} type="button" className="w-full rounded-sm !p-2 bg-blue-300 cursor-pointer text-white"><div className="flex items-center justify-center gap-2">{buttonText} {loading && (<Spinner />)}</div></button>
            </div>
        </div>
    )
}