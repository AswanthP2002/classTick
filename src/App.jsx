import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ActiveStudents from './components/Students'
import AttendedStudents from './components/Attended'
import AbsentStudents from './components/Absent'
import SelectedStudents from './components/Selected'
import ExternalBatchAttendees from './components/ExternalBatchStudents'
import AlternateSession from './components/AlternateSessionStudents'
import SelectedExternalStudents from './components/selectedExternalStudents'
import SelectedAlternativeSessionStudents from './components/SelectedAlternativeSessionStudents'
import ReportEditor from './components/ReportEditor'
import { Route, Routes } from 'react-router-dom'
import ReportGenerator from './components/ReportGenerator'
import ReportPage from './components/Report'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <Routes>
      <Route path='/' element={<ReportGenerator />} />
      <Route path='/report' element={<ReportPage />} />
    </Routes>
    
  )
}

export default App
