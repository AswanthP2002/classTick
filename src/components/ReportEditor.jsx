import { useState } from "react";
import { students } from "../assets/students";
import InputEmoji from 'react-input-emoji'
import EmojiPicker from 'emoji-picker-react'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StudentContext } from "./StudentContext";
import {FaFile} from 'react-icons/fa6'


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

    return(

        <div className="!mt-3">
            <div>
                <label htmlFor="" className="text-sm font-semibold !mb-1 block">Date</label>
                <div className="bg-gray-100 !p-1 rounded-md">
                    <input value={reportDate} onChange={(event) => setReportDate(event.target.value)} type="date" name="" id="" className="border border-gray-200 !text-sm !p-1 rounded-sm outline-none w-full" />
                </div>
                <label htmlFor="" className="error-label text-red-500 text-xs block">{reportDateError}</label>
            </div>
            <div className="flex gap-2 !mt-3">
                <div className="w-full">
                    <label htmlFor="" className="text-sm font-semibold !mb-1 block">Coordinator</label>
                    <div className="bg-gray-100 !p-1 rounded-md">
                        <select value={coordinator1} onChange={(event) => setCoordinator1(event.target.value)} name="" id="" className="border border-gray-200 !text-sm !p-1 rounded-sm outline-none w-full">
                    <option value="">Coordinator 1</option>
                    {
                        students.map((student, index) => {
                            return(<option>{student.name}</option>)
                        })
                    }
                </select>
                    </div>
                <label htmlFor="" className="error-label text-red-500 text-xs block">{coordinator1Error}</label>
                </div>

                <div className="w-full">
                    <label htmlFor="" className="text-sm font-semibold !mb-1 block">Coordinator</label>
                    <div className="bg-gray-100 !p-1 rounded-md">
                        <select value={coordinator2} onChange={(event) => setCoordinator2(event.target.value)} name="" id="" className="border border-gray-200 !text-sm !p-1 rounded-sm outline-none w-full">
                    <option value="">Coordinator 2</option>
                    {
                        students.map((student, index) => {
                            return(<option>{student.name}</option>)
                        })
                    }
                </select>
                    </div>
                <label htmlFor="" className="error-label text-red-500 text-xs block">{coordinator2Error}</label>
                </div>
            </div>
            <div className="w-full !mt-3">
                    <label htmlFor="" className="text-sm font-semibold !mb-1 block">Report Made by</label>
                    <div className="bg-gray-100 rounded-md !p-1">
                        <input placeholder="Your name" type="text" name="" id="" value={creator} onChange={(event) => setCreator(event.target.value)} className="w-full border border-gray-200 !text-sm !p-1 rounded-sm outline-none" />
                    </div>
                    <label htmlFor="" className="error-label text-red-500 text-xs block">{creatorError}</label>
            </div>
            <div className="!mt-3 flex gap-2 w-full">
                <div className="w-full">
                        <label htmlFor="" className="text-sm font-semibold !mb-1 block">Starting Time | <span style={{fontSize:'.7rem'}}>(eg : 2.00 PM)</span></label>
                        <div className="bg-gray-100 rounded-md !p-1">
                            <input placeholder="2.00 PM" type="text" name="" id="" value={start} onChange={(event) => setStart(event.target.value)} className="w-full border border-gray-200 !text-sm !text-sm !p-1 rounded-sm outline-none" />
                        </div>
                        <label htmlFor="" className="error-label text-red-500 text-xs block">{startError}</label>
                    </div>

                    <div className="w-full">
                        <label htmlFor="" className="text-sm font-semibold !mb-1 block">Ending Time | <span style={{fontSize:'.7rem'}}>(eg : 3.00 PM)</span></label>
                        <div className="bg-gray-100 rounded-md !p-1">
                            <input placeholder="3.00 PM" type="text" name="" id="" value={end} onChange={(event) => setEnd(event.target.value)} className="w-full border border-gray-200 !text-sm !p-1 rounded-sm outline-none" />
                        </div>
                        <label htmlFor="" className="error-label text-red-500 text-xs block">{endError}</label>
                    </div>
            </div>

            <div className="w-full !mt-3">
                <label htmlFor="" className="text-sm font-semibold !mb-1 block">Activity</label>
                <div className="bg-gray-100 rounded-md !p-1">
                    <input placeholder="Activity Name" type="text" name="" id="" value={activity} onChange={(event) => setActivity(event.target.value)} className="!w-full border border-gray-200 !text-sm !p-1 rounded-sm outline-none" />
                </div>
                <label htmlFor="" className="error-label text-red-500 text-xs block">{activityError}</label>
            </div>

            <div className="!mt-3">
                    <div className="bg-gray-100 rounded-md !p-1">
                        <label htmlFor="" className="font-semibold text-sm !mb-1 block">Topic</label>
                        <InputEmoji value={topic} onChange={setTopic} placeholder="Topic name..." />
                    </div>
            </div>

            <div className="!mt-3">
                    <label htmlFor="" className="text-sm font-semibold !mb-1 block">Session Overview</label>
                    <div className="bg-gray-100 rounded-md relative">
                        <textarea placeholder="Overview about the session" value={sessionOverview} onChange={(event) => setSessionOverview(event.target.value)} name="" rows={8} id="" className="!p-2 w-full text-sm outline-none"></textarea>
                        <button onClick={handleEmojiPickerVisibility} type="button" className="btn-emoji cursor-pointer !text-xs !ms-2 !mb-2 border border-gray-200 !p-1">{showEmojiPicker ? 'Close' : 'Add Emoji'}</button>
                        {
                            showEmojiPicker && (<div className="absolute">
                            <EmojiPicker onEmojiClick={handleEmojiPick} />
                        </div>)
                        }
                    </div>
            </div>
            
            <div className="!mt-3 w-full">
                <label htmlFor="" className="text-sm font-semibold !mb-1 block">TLDV Link</label>
                <div className="bg-gray-100 rounded-md !p-1">
                    <input placeholder="https://tldv.com.............." type="text" name="" id="" value={tldv} onChange={(event) => setTldv(event.target.value)} className="w-full border border-gray-200 !text-sm !p-1 rounded-sm outline-none" />
                </div>
            </div>

            <div className="!mt-3 w-full">
                <label htmlFor="" className="text-sm font-semibold !mb-1 block">Meetlist Link</label>
                <div className="bg-gray-100 rounded-md !p-1">
                    <input placeholder="https://meetlist.com........." type="text" name="" id="" value={meetlist} onChange={(event) => setmeetlist(event.target.value)} className="w-full border border-gray-200 !text-sm !p-1 rounded-sm outline-none" />
                </div>
            </div>

            <div className="!mt-5 w-full">
                <button onClick={generateReport} type="button" className="w-full rounded-sm !p-2 bg-gradient-to-r from-blue-500 to-violet-600 cursor-pointer text-white">
                    <div className="flex items-center justify-center gap-2">
                        <p>Generate Session Report</p>
                        <FaFile />
                    </div>
                </button>
            </div>
        </div>
    )
}