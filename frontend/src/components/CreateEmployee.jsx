import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:5000/create_employee', formData);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <>
      <div className='p-12 bg-orange-100 w-full'>
        <h2 className='text-center text-3xl font-semibold bg-red-200 p-4 mb-10 '>Create Employee</h2>
        <form onSubmit={handleSubmit}  className='grid grid-cols-2 border'>
          <div className='flex items-center justify-center gap-6'>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className='border' style={{ padding: '6px', width: '300px' }} />
              
          </div>
          <div className='flex items-center justify-center gap-6'>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} className='border' onChange={handleChange} required style={{ padding: '6px', width: '300px' }} />
          </div>
          <div className='flex items-center justify-center gap-6'>
            <label>Password:</label>
            <input type="text" name="password" value={formData.password} className='border' onChange={handleChange} required style={{ padding: '6px', width: '300px' }} />
          </div>
          <button type="submit" style={{ marginTop: '10px', padding: '6px 12px' }}  className='border bg-amber-400 hover:bg-amber-600 cursor-pointer'>Create </button>
        </form>
      </div>
    </>
  );
};

export default CreateEmployee;
