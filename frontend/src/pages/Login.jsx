import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const {login}= useContext(AuthContext)
  const navigate= useNavigate()

  const [formData, setFormData]= useState({email: '', password:''})
  const [error, setError]= useState('')

  const handleChange= e=> setFormData({...formData, [e.target.name]: e.target.value})

  const handleSubmit= async e=>{
    e.preventDefault()
    setError('')
    try{
      const res= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, formData)
      login(res.data)
      navigate('/')
    }
    catch(err){
      setError(err.response?.data?.msg || 'Something went wrong!')
    }
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded'>
      <h1 className='text-2xl mb-4'>Login</h1>
      {error && <p className='text-red-500'>{error}</p>}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input name='email' placeholder='Email' value={formData.email} className='w-full p-2 border rounded' onChange={handleChange} type="text" />
        <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleChange} className='w-full p-2 border rounded' />
        <button type='submit' className='w-full p-2 bg-green-600 text-white rounded'>Login</button>
      </form>
    </div>
  )
}

export default Login