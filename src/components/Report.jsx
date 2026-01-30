import '../index.css'
import { quotes } from '../assets/quotes'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { StudentContext } from './StudentContext'

export default function ReportPage() {

    const [currentQuote, setCurrentQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)])
    const [attendees, setAttendees] = useState([])

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        
        if(!location.state){
            navigate('/editor')
        }
    }, [location.state, navigate])

    if(!location.state) return null


    const {
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
        attendeesArray, absenteesArray, externalBatchArray, alternativeSessionArray
    } = location.state


    function copyReport(){
        
        const content = document.getElementById('report-content').innerText
        navigator.clipboard.writeText(content)
            .then(() => {
                alert('Report copied')
            }).catch((err) => {
                alert('Something went wrong!')
            })
    }

    return (
        <>
            <div className="overlay absolute w-full h-full left-0 top-0" style={{ zIndex: 1 }}></div>
            <div id="report-section" className="w-full h-screen" style={{ zIndex: -1 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full h-screen relative" style={{zIndex:5}}>
                    <div className="full hidden h-screen hidden md:flex items-center justify-center !px-10">
                        <p className='text-2xl text-white font-libre font-bold'>"{currentQuote.quote}"
                            <div className="text-start !mt-3">
                                <p className="text-sm">~ {currentQuote.name}</p>
                            </div>
                        </p>
                    </div>
                    <div className="w-full h-screen overflow-y-scroll">
                        <div className="rounded-sm bg-green-whatsap w-[450px] text-white !p-3 !mt-10">
                            <div className="flex justify-end">
                                <i onClick={copyReport} className="fa-solid fa-copy cursor-pointer"></i>
                            </div>
                            <pre id='report-content'>
                            <p className="font-bold">*Communication Session Report*</p>
                            <p>➖➖➖➖➖➖➖➖➖➖➖</p>
                            <p className='!mt-2'>🖥 BCR 64</p>
                            <p className='!mt-2'>📆 Date: {reportDate}</p>
                            <p className='!mt-2'>👩‍💻 Trainer: Anjana</p>
                            <p className='!mt-2'>👨🏻‍💼 Coordinators: </p>
                            <ul className='list-disc !ms-10'>
                                <li>• {coordinator1}</li>
                                <li>• {coordinator2}</li>
                            </ul>
                            <p className='!mt-2'>📝 Report by:   {creator}</p>
                            <p className='!mt-2 break-word'>📑 Activity:  {activity}</p>
                            <p className="!mt-2 break-word"> Topic : <span className='font-bold'>*{topic}*</span></p>
                            <p className='!mt-2'>Session Timing:</p>
                            <ul className="list-disc !ms-10">
                                <li>• Start:  {start}</li>
                                <li>• End:  {end}</li>
                            </ul>
                            <p className="font-bold !mt-5">*Session Overview*</p>

                            <p className='!mt-1 break-word'> {sessionOverview}</p>
                        
                            <p className="font-bold !mt-5">*Attendees*  🟢🟢🟢</p>
                             <ul>
                                {
                                attendeesArray.map((student, index) => {
                                    return <li key={index}>✅ {student.name}</li>
                                })
                            }
                             </ul>
                                {
                                    externalBatchArray.length > 0 && (
                                        <>
                                            <p className="font-bold !mt-5">*External Batch Attendees*  🟢🟢🟢</p>
                                            <ul>
                                                {
                                                    externalBatchArray.map((student, index) => {
                                                        return <li key={index}>✅ {student}</li>
                                                    })
                                                }
                                            </ul>
                                        </>
                                    )
                                }
                                {
                                    alternativeSessionArray.length > 0 && (
                                        <>
                                            <p className="font-bold !mt-5">*Alternative Session*  🟢🟢🟢</p>
                                            <ul>
                                                {
                                                    alternativeSessionArray.map((student, index) => {
                                                        return <li key={index}>✅ {student.name}</li>
                                                    })
                                                }
                                            </ul>
                                        </>
                                    )
                                }
                            <p className="font-bold !mt-5">*Absentees* 🔴🔴🔴</p>
                             <ul>
                                {
                                absenteesArray.map((student, index) => {
                                    return <li key={index}>❌ {student.name}</li>
                                })
                            }
                             </ul>
                            <p className='!mt-5 break-word'>TLDV : <a href="" className='text-blue-500' style={{textDecoration:'underline'}}>{tldv}</a></p>
                            <p className='!mt-2 break-word'>Meetlist : <a href="" className='text-blue-500' style={{textDecoration:'underline'}}>{meetlist}</a></p>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}