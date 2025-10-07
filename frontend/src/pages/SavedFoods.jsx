import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// Added FaSignOutAlt for the logout button
import { FaHeart, FaBookmark, FaHome, FaSignOutAlt } from 'react-icons/fa';
import '../styles/reels.css';
import { toast } from 'sonner';

const SavedFoods = () => {
    const [savedItems, setSavedItems] = useState([]);
    const navigate = useNavigate();

    const fetchSavedReels = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/food/save`, {
                withCredentials: true,
            });
            const items = res?.data?.savedFoods ?? [];
            setSavedItems(Array.isArray(items) ? items : []);
        } catch (err) {
            // If the fetch fails, navigate to the home page
            console.error("Error fetching saved reels:", err);
            navigate('/');
        }
    };

    useEffect(() => {
        fetchSavedReels();
    }, []);

    const handleLike = async (foodId) => {
        console.log('clicked');
        try {
            await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/food/like`, { foodId }, { withCredentials: true });
            fetchSavedReels();
        } catch (err) {
            console.error("API call to like food failed:", err);
        }
    };

    const handleSave = async (foodId) => {
        try {
            await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/food/save`, { foodId }, { withCredentials: true });
            fetchSavedReels();
        } catch (err) {
            console.error("API call to save food failed:", err);
        }
    };
    
    // ## LOGOUT FUNCTION ADDED ##
    const handleLogout = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/user/logout`, {
                withCredentials: true
            });
            console.log("Logout successful!");
            toast.success("Logged out successfully!");
            navigate('/');
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        // Added `relative` to this div for positioning the button
        <div className="reels-root relative">

            {/* ## LOGOUT BUTTON WITH TAILWIND CSS ## */}
            <button
                onClick={handleLogout}
                title="Logout"
                className="absolute top-4 right-4 z-20 p-3 text-white bg-black/40 rounded-full hover:bg-black/60 transition-colors"
            >
                <FaSignOutAlt size={22} />
            </button>

            <div className="reels-container">
                <div className="reels-list">
                    {savedItems.map((item) => (
                        <section className="reel-item" key={item.food._id}>
                            <div className="reel-card">
                                <video
                                    className="reel-video"
                                    src={item.food.video}
                                    playsInline
                                    muted
                                    loop
                                    autoPlay
                                />
                                <div className="reel-overlay">
                                    <div className="reel-info">
                                        <div className="reel-desc" title={item.food.description}>
                                            {item.food.description}
                                        </div>
                                        <Link className="reel-btn" to={`/food-partner/${item.food.foodPartner}`}>
                                            Visit Store
                                        </Link>
                                    </div>
                                    <div className="reel-actions">
                                        <div className="action-button">
                                            <button className='reel-btn' onClick={() => handleLike(item.food._id)}>
                                                <FaHeart size={30} color={item.food.isLikedByUser ? 'red' : 'white'} />
                                            </button>
                                            <span>{item.food.likeCount}</span>
                                        </div>
                                        <div className="action-button">
                                            <button className='reel-btn' onClick={() => handleSave(item.food._id)}>
                                                <FaBookmark size={30} color={'#25A4D3'} />
                                            </button>
                                            <span>{item.food.saveCount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>

                <nav className="bottom-nav">
                    <button onClick={() => navigate('/Home')}>
                        <FaHome size={28} />
                    </button>
                    <button onClick={() => navigate('/saved-foods')}>
                        <FaBookmark size={28} />
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default SavedFoods;