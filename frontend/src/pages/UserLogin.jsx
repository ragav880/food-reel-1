import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'
import { toast } from 'sonner';


const UserLogin = () => {

  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    // empty handler — access form values via e.target.FIELDNAME.value
    e.preventDefault();
    const email = e.target.email.value 
    const password = e.target.password.value

    try {
      const ress = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/user/login`,{
      email,
      password
    },{withCredentials:true})
    console.log(ress)
    toast.success('login succesful!✅');

    navigate('/Home')
    } catch (error) {
      console.error(error)
      toast.error('Invalid email or password!��');
    }

    

  }
  const { pathname } = useLocation()
  return (
    <main className="auth-page">
      <form className="auth-card" aria-label="User login form" onSubmit={handleSubmit}>
        <div className="auth-switch">
          <Link to="/user/login" className={pathname === '/user/login' ? 'active' : ''}>User login</Link>
          <Link to="/food-partner/login" className={pathname === '/food-partner/login' ? 'active' : ''}>Partner login</Link>
        </div>

        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-sub">Log in to continue ordering</p>

        <label className="auth-label">Email
          <input name="email" className="auth-input" type="email" placeholder="you@example.com" />
        </label>

        <label className="auth-label">Password
          <input name="password" className="auth-input" type="password" placeholder="Your password" />
        </label>

        <button className="auth-btn" type="submit">Log in</button>

        <div className="auth-footer">Don't have an account? <Link to="/user/register">Sign up</Link></div>
      </form>
    </main>
  )
}

export default UserLogin
