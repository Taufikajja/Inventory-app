import React from 'react'
import Sidebar from '../components/Sidebar'
import {Outlet} from 'react-router'


const Dashboard = ({ darkMode, setDarkMode }) => {

  return (
    <div>
        <div className='flex'>
            <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className={`flex-1 ml-16 md:ml-64 min-h-screen ${darkMode ? 'dark primary-dark-2 text-white' : 'primary-light-1 text-black'}`}>
        <Outlet />
      </div>
      </div>
    </div>
  )
}

export default Dashboard