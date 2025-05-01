// // import React from 'react'
// // import { FaUser } from "react-icons/fa";

// // const Navbar = () => {
// //   return (
// //     <>
// //         <div className='flex items-center justify-between px-[60px] py-[15px] shadow-[0_1px_3px_-2px_black] mb-[1px] bg-white'>
// //             <div>
// //                 <div>
// //                     <p className='text-orange-600 font-bold'>WatchDog <span className=' font-semibold text-orange-300'>Admin Panel</span></p>
// //                 </div>
// //             </div>
// //             <FaUser className='text-xl cursor-pointer'/>
// //         </div>
// //     </>
// //   )
// // }

// // export default Navbar

// import React, { useState } from 'react';
// import { FaUser } from "react-icons/fa";

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with real auth logic

//   const handleLogin = () => {
//     // Simulate login
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     // Simulate logout
//     setIsLoggedIn(false);
//   };

//   return (
//     <>
//       <div className='flex items-center justify-between px-[60px] py-[15px] shadow-[0_1px_3px_-2px_black] mb-[1px] bg-white'>
//         <div>
//           <p className='text-orange-600 font-bold'>
//             WatchDog <span className='font-semibold text-orange-300'>Admin Panel</span>
//           </p>
//         </div>

//         {isLoggedIn ? (
//           <div className='flex items-center gap-4'>
//             <FaUser className='text-xl cursor-pointer' title='Profile' />
//             <button
//               onClick={handleLogout}
//               className='bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600'
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <button
//             onClick={handleLogin}
//             className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
//           >
//             Login
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if token is stored in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsLoggedIn(!!token);  // Set login state based on token
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Remove token on logout
    setIsLoggedIn(false);  // Update state to reflect logout
    navigate("/admin-login"); // Redirect to login page
  };

  // Handle login functionality (this will be replaced with real login logic)
  const handleLogin = () => {
    navigate("/admin-login");  // Redirect to login page
  };

  return (
    <div className='flex items-center justify-between px-[60px] py-[15px] shadow-[0_1px_3px_-2px_black] mb-[1px] bg-white'>
      <div>
        <p className='text-orange-600 font-bold'>
          WatchDog <span className='font-semibold text-orange-300'>Admin Panel</span>
        </p>
      </div>

      {isLoggedIn ? (
        <div className='flex items-center gap-4'>
          <FaUser className='text-xl cursor-pointer' title='Profile' />
          <button
            onClick={handleLogout}
            className='bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600'
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
