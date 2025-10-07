import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'
import { toast } from'sonner';


const PartnerRegister = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async (e) => {
    // empty handler — access form values via e.target.FIELDNAME.value
    e.preventDefault();
    const businessName = e.target.businessName.value;
    const email = e.target.email.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const password = e.target.password.value;

    try {
      const ress = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/foodpartner/register`,{
      businessName,
      email,
      contactName,
      phone,
      address,
      password
    },{withCredentials:true} ) // to send cookies to the server)
    console.log(ress)
    toast.success("Registration successful!.");
    navigate('/create-food')
    
    // to redirect to home page after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please check your details and try again.");
    }

    
    
  }
  const { pathname } = useLocation()
  return (
    <main className="auth-page">
      <form className="auth-card" aria-label="Partner register form" onSubmit={handleSubmit}>
        <div className="auth-switch">
          <Link to="/user/register" className={pathname === '/user/register' ? 'active' : ''}>Register as user</Link>
          <Link to="/food-partner/register" className={pathname === '/food-partner/register' ? 'active' : ''}>Register as partner</Link>
        </div>

  <h2 className="auth-title">Food Partner Register</h2>
        <p className="auth-sub">Create a partner account to list your food</p>

        <label className="auth-label">Business name
          <input name="businessName" className="auth-input" type="text" placeholder="Bob's Burgers" />
        </label>

        <label className="auth-label">Contact email
          <input name="email" className="auth-input" type="email" placeholder="owner@example.com" />
        </label>

        <label className="auth-label">Contact name
          <input name="contactName" className="auth-input" type="text" placeholder="Owner name" />
        </label>

        <label className="auth-label">Phone
          <input name="phone" className="auth-input" type="tel" placeholder="+1 555 555 5555" />
        </label>

        <label className="auth-label">Address
          <input name="address" className="auth-input" type="text" placeholder="123 Main St, City, Country" />
        </label>

        <label className="auth-label">Password
          <input name="password" className="auth-input" type="password" placeholder="Create a password" />
        </label>

        <button className="auth-btn" type="submit">Create partner account</button>

        <div className="auth-footer">Already registered? <Link to="/food-partner/login">Log in</Link></div>
      </form>
    </main>
  )
}

export default PartnerRegister
