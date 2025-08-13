import { useContext, useState } from 'react'
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
import Layout from './outlet'
import HomePage from './pages/intro'
import AdminLoginPage from './pages/adminLogin'
import SidebarLayout from './components/adminSidebarLayout'
import StudentManagePage from './pages/admin-students'
import GenieAlert from './components/Genie-Alter'
import { StudentContext } from './components/StudentContext'
import ProtectedRoute from './components/ProtectedRoute'
import AddAssociateAdmin from './pages/AddAdmin'
import FileReadPage from './pages/TestFileRead'

function App() {
  const [count, setCount] = useState(0)
  const {alertStatus} = useContext(StudentContext)

  return (
    <>
    <Routes >
      <Route path='/' element={<HomePage />} />
        {/* <Route index element={<HomePage />} /> */}
        <Route path='/editor' element={<Layout />}>
          <Route index element={<ReportGenerator />} />
        </Route>
        <Route path='/report' element={<Layout />}>
          <Route index element={<ReportPage />} />
        </Route>
        <Route path='/admin/login' element={<AdminLoginPage />} />
      {/* </Route> */}

      <Route path='/be-an-admin/associate' element={<AddAssociateAdmin />} />
      <Route path='/test/app' element={<FileReadPage />} />

      <Route path='/admin/dashboard' element={<ProtectedRoute><SidebarLayout /></ProtectedRoute>}>
        <Route index element={<StudentManagePage />} />
      </Route>
    </Routes>

    <GenieAlert infoStatus={alertStatus} />
   </> 
  )
}

export default App
