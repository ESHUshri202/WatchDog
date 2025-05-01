import React from 'react'
import Sidebar from '../components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import CreateEmployee from '../components/CreateEmployee'
import ListEmployee from '../components/ListEmployee'
import LogActivity from '../components/LogActivity'
import Screenshot from '../components/Screenshot'

const Home = () => {
  return (
    <>
        <div className='flex-1 md:flex '>
          {/* SideBar */}
          <Sidebar/>
          {/* Create/List Employee section */}
          <Routes>
            <Route path='create_employee' element= {<CreateEmployee/>}/>
            <Route path='list-employee' element= {<ListEmployee/>}/>
            <Route path='log-activity' element= {<LogActivity/>}/>
            <Route path='screenshot' element= {<Screenshot/>}/>
          </Routes>
        </div>

    </>
  )
}

export default Home