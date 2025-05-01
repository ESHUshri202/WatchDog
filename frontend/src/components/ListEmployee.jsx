import React, { useEffect, useState } from 'react'

const ListEmployee = () => {
  const [employees, setEmployees] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/list-employees');
        const data = await response.json();
        console.log(data);
        setEmployees(data); // Store data in state
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchData(); // Call the function
  }, []); 
  
  return (
    <>
      <div className='w-full border p-4'>
        <div className='bg-orange-100 text-center p-4'>
          <h1 className='text-4xl font-bold '>🧑‍🏭Employees List</h1>
        </div>
        <div className='border w-full '>
          <table className=' w-full'>
            <thead>
              <tr className='bg-orange-200 border'>
                <th className='border-r'>Id</th>
                <th className='border-r'>Name</th>
                <th className='border-r'>Email</th>
                <th className='border-r'>Password</th>
                <th className='border-r'>Log Activity</th>
                <th>Log ScreenShot</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className='border-b'>
                  <td className='border-r'>{employee.id}</td>
                  <td className='border-r'>{employee.name}</td>
                  <td className='border-r'>{employee.email}</td>
                  <td className='border-r'>{employee.password}</td>
                  <td className='border-r'>View</td>
                  <td>View 2</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>  
      </div>
    </>
  )
}

export default ListEmployee