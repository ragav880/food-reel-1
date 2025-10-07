import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'
import { toast } from'sonner';


const UserRegister = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async (e) => {
    // empty handler — user will access form data via e.target.FIELDNAME.value
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const ress =await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/user/register`,{
      fullName,
      email,
      password
    },{
      withCredentials:true
    })
    console.log(ress)
    toast.success('Registration successful!.')
    navigate('/Home')
    } catch (error) {
      console.error(error)
      toast.error('Failed to register. Please try again.')
    }

   
    
  }

  const { pathname } = useLocation()
  return (
    <main className="auth-page">
      <form className="auth-card" aria-label="User register form" onSubmit={handleSubmit} >
        <div className="auth-switch">
          <Link to="/user/register" className={pathname === '/user/register' ? 'active' : ''}>Register as user</Link>
          <Link to="/food-partner/register" className={pathname === '/food-partner/register' ? 'active' : ''}>Register as partner</Link>
        </div>

        <h2 className="auth-title">Create account</h2>
        <p className="auth-sub">Sign up to start ordering your favorites</p>

        <label className="auth-label">Full name
          <input name="fullName" className="auth-input" type="text" placeholder="Jane Doe" />
        </label>

        <label className="auth-label">Email
          <input name="email" className="auth-input" type="email" placeholder="you@example.com" />
        </label>

        <label className="auth-label">Password
          <input name="password" className="auth-input" type="password" placeholder="Choose a secure password" />
        </label>

        <button className="auth-btn" type="submit">Create account</button>

        <div className="auth-footer">Already have an account? <Link to="/user/login">Log in</Link></div>
      </form>
    </main>
  )
}

export default UserRegister
