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
        <form onSubmit={handleSubmit}  className='flex flex-col items-center justify-center gap-4 bg-[#000]/10 rounded-xl p-4'>
          <div className='flex items-center justify-center gap-6 max-w-full  '>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className='rounded-xl bg-white' style={{ padding: '6px', width: '300px' }} />
              
          </div>
          <div className='flex items-center justify-center gap-6'>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} className='rounded-xl bg-white' onChange={handleChange} required style={{ padding: '6px', width: '300px' }} />
          </div>
          <div className='flex items-center justify-center gap-6'>
            <label>Password:</label>
            <input type="text" name="password" value={formData.password} className='rounded-xl bg-white' onChange={handleChange} required style={{ padding: '6px', width: '300px' }} />
          </div>
          <button type="submit" style={{ marginTop: '10px', padding: '6px 12px' }}  className='rounded-xl bg-amber-400 hover:bg-orange-400 cursor-pointer'>Create</button>
        </form>
      </div>
    </>
  );
};

export default CreateEmployee;
