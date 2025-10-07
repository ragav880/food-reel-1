import React ,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../../styles/profile.css';
const Profile = () => {
  const [profile, setProfile] = useState(null)
  const[videos, setVideos] = useState([])
  const { id } = useParams()
  
  useEffect(() => {
    const fetchProfile = async () => {
      const ress = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/foodpartner/${id}`,{ withCredentials: true  })
      setProfile(ress.data.foodPartner)
      setVideos(ress.data.videos)
      console.log(profile)
    
  }
    fetchProfile()
    
     
  },[id])

  // ...existing code...
  useEffect(() => {
    if (profile) console.log('profile state updated:', profile)
  }, [profile])
// ...existing code...

  // Placeholder data - the actual values can be wired to API later
  
  const customersServed = '15K'

   if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="profile-root">
      <header className="profile-header">
        <div className="profile-top">
          <div className="profile-avatar" aria-hidden >
            <img className='profile-pic' src='https://images.pexels.com/photos/8377494/pexels-photo-8377494.jpeg?_gl=1*1172wof*_ga*MjA3MTI3MzI1LjE3MzQ2MTY2NTA.*_ga_8JE65Q40S6*czE3NTkzNDI0ODYkbzE1JGcxJHQxNzU5MzQyNTMwJGoxNiRsMCRoMA..' alt="Profile Picture" />
          </div>
          <div className="profile-meta">
            <div className="profile-business">{profile.businessName}</div>
            <div className="profile-address">{profile.address}</div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat">
            <div className="stat-label">total meals</div>
            <div className="stat-value">{videos.length}</div>
          </div>
          <div className="stat">
            <div className="stat-label">customer serve</div>
            <div className="stat-value">{customersServed}</div>
          </div>
        </div>
      </header>

      <section className="profile-grid">
        {videos.map((item) => (
          <Link to="/food-partner/:id" key={item._id} className="">
            <video 
              src={item.video} 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover"
            />
            </Link>
        ))}
      </section>
    </div>
  )
}

export default Profile
