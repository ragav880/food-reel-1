import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from'react-router-dom'
import { toast } from'sonner'

import '../styles/auth.css'

const PartnerLogin = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async (e) => {
    // empty handler — access form values via e.target.FIELDNAME.value
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/foodpartner/login`,{
      email,
      password
    },{withCredentials:true})
    console.log(res)
    navigate('/create-food')
    toast.success('Logged in successfully!')
    
    } catch (error) {
      console.error('Error logging in:', error)
      toast.error('Failed to log in. Please check your credentials.')
    }
    
  }
  const { pathname } = useLocation()
  return (
    <main className="auth-page">
      <form className="auth-card" aria-label="Partner login form" onSubmit={handleSubmit}>
        <div className="auth-switch">
          <Link to="/user/login" className={pathname === '/user/login' ? 'active' : ''}>User login</Link>
          <Link to="/food-partner/login" className={pathname === '/food-partner/login' ? 'active' : ''}>Partner login</Link>
        </div>

  <h2 className="auth-title">Food Partner Login</h2>
        <p className="auth-sub">Access your partner dashboard</p>

        <label className="auth-label">Email
          <input name="email" className="auth-input" type="email" placeholder="owner@example.com" />
        </label>

        <label className="auth-label">Password
          <input name="password" className="auth-input" type="password" placeholder="Password" />
        </label>

        <button className="auth-btn" type="submit">Log in</button>

        <div className="auth-footer">Need an account? <Link to="/food-partner/register">Sign up</Link></div>
      </form>
    </main>
  )
}

export default PartnerLogin
