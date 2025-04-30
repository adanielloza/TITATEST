// src/features/auth/components/LoginContainer.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../services/firebase'
import { login } from '../services/authService'
import LoginForm from './LoginForm'

export default function LoginContainer() {
  const [data, setData]         = useState({ email: '', password: '' })
  const [errorMsg, setErrorMsg] = useState('')
  const navigate                = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    const result = await login(auth, data.email, data.password)
    if (result.error) {
      setErrorMsg(result.errorMessage || 'Login failed')
      return
    }

    localStorage.setItem('role', result.role)
    navigate(result.role === 'admin' ? '/dashboard/admin' : '/dashboard')
  }

  return (
    // <-- make this panel stretch the full viewport height
    <div className="flex min-h-screen">
      {/* Left: centered form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <LoginForm
          data={data}
          errorMsg={errorMsg}
          onChange={e => setData({ ...data, [e.target.name]: e.target.value })}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Right: image, also full height */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
