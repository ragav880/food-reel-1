import React from 'react'
import '../styles/auth.css'

const Landing = () => {
  return (
    <main className="auth-page">
      <div className="auth-card" style={{textAlign:'center'}}>
        <h2 className="auth-title">Welcome to Food Reel</h2>
        <p className="auth-sub">Choose how you'd like to join</p>

        <div style={{display:'flex',gap:12,flexDirection:'column',marginTop:18}}>
          <a className="auth-btn" href="/user/register" style={{display:'inline-block',textDecoration:'none'}}>Register as normal user</a>
          <a className="auth-btn" href="/food-partner/register" style={{display:'inline-block',textDecoration:'none'}}>Register as food partner</a>
        </div>

        <div className="auth-footer" style={{marginTop:16}}>
          Already joined? <a href="/user/login">User login</a> · <a href="/food-partner/login">Partner login</a>
        </div>
      </div>
    </main>
  )
}

export default Landing
