import React from 'react'
import { Link } from 'react-router-dom'
import { IoCreate } from "react-icons/io5";

const Sidebar = () => {
  return (
    <>
        <div className='flex-1 pt-[30px] gap-[32px] w-100 max-w-[250px] h-[100vh] bg-amber-100'>
            <Link to='/create_employee'>
                <div className='flex text-2xl  justify-center items-center m-2 p-4 rounded-xl bg-orange-300 hover:bg-orange-200'>
                  <span>🧑‍🏭</span>
                  <p>Add Employee</p>
                </div>
            </Link>
            <Link to= '/list-employee'>
              <div className='flex text-2xl justify-center items-center m-2 p-4 rounded-xl bg-orange-300 hover:bg-orange-200'>
                <span>📄</span>
                <p>Employee List</p>
              </div>
            </Link>
            <Link to= '/log-activity'>
              <div className='flex text-2xl justify-center items-center m-2 p-4 rounded-xl bg-orange-300 hover:bg-orange-200'>
                <span>📄</span>
                <p>Log Activity</p>
              </div>
            </Link>
            <Link to= '/screenshot'>
              <div className='flex text-2xl justify-center items-center m-2 p-4 rounded-xl bg-orange-300 hover:bg-orange-200'>
                <span>📄</span>
                <p>ScreenShots</p>
              </div>
            </Link>
        </div>
    </>
  )
}

export default Sidebar