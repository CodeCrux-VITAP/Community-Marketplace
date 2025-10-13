import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {
  const {login}= useContext(AuthContext)
  const navigate= useNavigate()

  const [formData, setFormData]= useState({username:"", email:'', password:''})
  const [error, setError]= useState('')

  const handleChange= e=> setFormData({...formData, [e.target.name]: e.target.value})

  const handleSubmit= async e=>{
    e.preventDefault();
    setError('')
    try{
      const res= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, formData)
      login(res.data)
      navigate('/')
    }
    catch(err){
      setError(err.response?.data?.msg || 'Something went wrong!')
    }
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-2xl mb-4 text-center">Register</h1>
      {error && <p className='text-red-500'>{error}</p>}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input type="text" name='username' placeholder='Username' value={formData.username} onChange={handleChange} className='w-full p-2 border rounded' />
        <input type='email' placeholder='Email' name='email' value={formData.email} onChange={handleChange} className='w-full p-2 border rounded' />
        <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} className='w-full p-2 border rounded' />
        <button type='submit' className='w-full p-2 bg-blue-600 text-white rounded'>Register</button>
      </form> 
      <p className='text-center mt-5'>Already a Member? <Link to={login}>Login</Link></p>
    </div>
  )
}

export default Register