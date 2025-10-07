import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import PartnerRegister from '../pages/PartnerRegister'
import PartnerLogin from '../pages/PartnerLogin'
import Landing from '../pages/Landing'
import Home from '../pages/general/Home';
import CreateFood from '../pages/food-partner/CreateFood'
import Profile from '../pages/food-partner/Profile';
import SavedFoods from '../pages/SavedFoods';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/user/register" element={<UserRegister/>} />
        <Route path="/user/login" element={<UserLogin/>} />
        <Route path="/food-partner/register" element={<PartnerRegister/> } />
        <Route path="/food-partner/login" element={<PartnerLogin/> } />
        <Route path="/Home" element={<Home/> } />
        <Route path="/create-food" element={<CreateFood/> } />
        <Route path="/food-partner/:id" element={<Profile/> } />
        <Route path="/saved-foods" element={<SavedFoods />} /> 
        
      </Routes>
    </Router>
  )
}

export default AppRoutes
