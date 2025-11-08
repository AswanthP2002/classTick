import { useContext, useState } from 'react'
import './App.css'
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
import {CiLight, CiDark} from 'react-icons/ci'
import {FaCircleInfo} from 'react-icons/fa6'
import {SiDarkreader} from 'react-icons/si'
import ThemeContextProvider, { themeContext } from './contexts/themeContext'

function App() {
  const {alertStatus} = useContext(StudentContext)
  const {theme, changeTheme} = useContext(themeContext)

  return (
    <>
    {/* <div className='bg-gray-200 shadow-lg absolute top-3 right-3 items-center rounded-full !px-3 !py-2 flex gap-3'>
      {
        theme === 'dark'
          ? <button onClick={() => changeTheme('light')} className="cursor-pointer"><CiLight size={20} /></button>
          : <button onChange={() => changeTheme('dark')} className='cursor-pointer'><CiDark size={20} /></button>
      }

      <button className='cursor-pointer'><SiDarkreader /></button>
      <button title='Whats new' className='cursor-pointer'><FaCircleInfo /></button>
    </div> */}
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
        <Route path='/admin/dashboard' element={<StudentManagePage />} />
      </Route>
    </Routes>

    <GenieAlert infoStatus={alertStatus} />
   </> 
  )
}

export default App
