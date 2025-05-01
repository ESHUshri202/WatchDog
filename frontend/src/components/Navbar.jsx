import React from 'react'
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
        <div className='flex items-center justify-between px-[60px] py-[15px] shadow-[0_1px_3px_-2px_black] mb-[1px] bg-white'>
            <div>
                <div>
                    <p className='text-orange-600 font-bold'>WatchDog <span className=' font-semibold text-orange-300'>Admin Panel</span></p>
                </div>
            </div>
            <FaUser className='text-xl cursor-pointer'/>
        </div>
    </>
  )
}

export default Navbar