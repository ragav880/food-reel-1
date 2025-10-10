import React, { useEffect, useState } from 'react';
import '../../styles/reels.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// FaSignOutAlt is imported for the new logout button
import { FaRegHeart, FaRegBookmark, FaHome, FaBookmark, FaSignOutAlt } from "react-icons/fa";
import { toast } from 'sonner';

const Home = () => {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();

    const fetchFoodReels = async () => {
        console.log('Fetching food reels...');
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/food/`, { withCredentials: true,
            headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
             });
            const items = res?.data?.foodItems ?? [];
            setVideos(Array.isArray(items) ? items : []);
        } catch (err) {
            console.error(err);
            navigate('/')
        }
    };

    useEffect(() => {
        fetchFoodReels();
    }, []);
    
    


    const handleLike = async (foodId) => {
        console.log(`Liking food item with ID: ${foodId}`);
        await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/food/like`, { foodId }, { withCredentials: true });
        fetchFoodReels();
    };

    const handleSave = async (foodId) => {
        console.log(`Saving food item with ID: ${foodId}`);
        await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/food/save`, { foodId }, { withCredentials: true });
        fetchFoodReels();
    };
    

    // ## NEW LOGOUT FUNCTION ##
    const handleLogout = async () => {
        try {
            // IMPORTANT: Replace this with your actual logout API endpoint
            await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/user/logout`, {
                withCredentials: true
            });
            console.log("Logout successful!");
            // Navigate to a different page (e.g., login) after logout
            toast.success("Logged out successfully!");
            navigate('/');
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };
  
   
    return (
        // Added `relative` class to make it a positioning container for the absolute button
        <div className="reels-root relative">

            {/* ## LOGOUT BUTTON WITH TAILWIND CSS ## */}
            <button
                onClick={handleLogout}
                title="Logout"
                className="absolute top-4 right-4 z-20 p-3 text-white bg-black/40 rounded-full hover:bg-black/60 transition-colors"
            >
                <FaSignOutAlt size={22} />
            </button>

            <div className="reels-list">
                {videos.map(item => (
                    <section className="reel-item" key={item._id}>
                        <div className="reel-card">
                            <video
                                className="reel-video"
                                src={item.video}
                                playsInline
                                muted
                                loop
                                autoPlay
                            />

                            <div className="reel-overlay">
                                <div className="reel-desc" title={item.description}>{item.description}</div>
                                <Link className="reel-btn" to={`/food-partner/${item.foodPartner}`}>Visit store</Link>
                            </div>

                            <div className="reel-actions">
                                <div className="action-item">
                                    <button className="action-btn" onClick={() => handleLike(item._id)}>
                                        <FaRegHeart size={28} />
                                    </button>
                                    <span className="action-count">{item.likeCount || 0}</span>
                                </div>
                                <div className="action-item">
                                    <button className="action-btn" onClick={() => handleSave(item._id)}>
                                        <FaRegBookmark size={28} />
                                    </button>
                                    <span className="action-count">{item.saveCount}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            <nav className="bottom-nav">
                <button className="nav-btn" onClick={() => navigate('/Home')}>
                    <FaHome size={28} />
                </button>
                <button className="nav-btn" onClick={() => navigate('/saved-foods')}>
                    <FaBookmark size={28} />
                </button>
            </nav>
        </div>
    );
    
}

export default Home;