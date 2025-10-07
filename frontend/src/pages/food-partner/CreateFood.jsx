import React, { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa"; // Both icons imported
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Custom Gradient Button Component
const GradientButton = ({ children, loading, ...props }) => {

  return (
    <button
      {...props}
      className={`
        w-full py-3 px-4 rounded-xl font-semibold text-lg relative overflow-hidden
        bg-gradient-to-r from-blue-500 to-purple-600 text-white
        hover:from-blue-600 hover:to-purple-700
        disabled:opacity-70 disabled:cursor-not-allowed
        transform transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 focus:ring-offset-slate-900
      `}
      disabled={loading}
    >
      <span className="relative z-10 flex items-center justify-center">
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </span>
    </button>
  );
};


// Custom Input Field Component with gradient focus
const GradientInput = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block mb-2 text-md font-medium text-gray-300">
      {label}
    </label>
    <input
      id={id}
      {...props}
      className="w-full p-3 rounded-lg bg-gray-800 border border-transparent text-white
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                 placeholder-gray-500 transition-all duration-200 ease-in-out
                 shadow-inner shadow-slate-900/50"
    />
  </div>
);

// Custom Textarea Field Component
const GradientTextarea = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block mb-2 text-md font-medium text-gray-300">
      {label}
    </label>
    <textarea
      id={id}
      {...props}
      className="w-full p-3 rounded-lg bg-gray-800 border border-transparent text-white
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                 placeholder-gray-500 transition-all duration-200 ease-in-out
                 shadow-inner shadow-slate-900/50"
    ></textarea>
  </div>
);


const CreateFood = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [foodPartner, setFoodPartner] = useState('');

  const fileInputRef = useRef(null);

    const checkAuth = async()=>{
    try {
      console.log('Checking authentication...');
      const ress =await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/foodpartner/checkin`,{ withCredentials: true})
      
      console.log('he')
      setFoodPartner(ress.data.foodPartner._id)
      
    } catch (e) {
      console.log('Not authenticated, redirecting to login page',e);
      navigate('/')
    }

  }
  useEffect(() => {
    checkAuth()

  }, []);

  useEffect(() => {
    if(foodPartner){
      console.log(foodPartner)
    }
  },[foodPartner]);

  const handleProfile = () => {
    console.log("Navigating to profile page...");
    if (foodPartner) {
    navigate(`/food-partner/${foodPartner}`);
  }
    
  };
  
  const handleLogout = async () => {
    try {
        await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/foodpartner/logout`, {
            withCredentials: true
        });
        console.log("Logout successful!");
        toast.success("Logged out successfully!");
        navigate('/');
    } catch (err) {
        console.error("Logout failed:", err);
        navigate('/');
    }
  };

  const handleFileChange = useCallback((selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setVideo(selectedFile);
      setVideoPreview(URL.createObjectURL(selectedFile));
      setMessage("");
    } else {
      setMessage("Please select a valid video file.");
      setVideo(null);
      setVideoPreview(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  }, []); 

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation(); 
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  }, [handleFileChange]); 

  const clearVideo = () => {
    setVideo(null);
    setVideoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setMessage(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !video) {
      setMessage("Please provide a reel name and upload a video.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", video);

    try {
      setLoading(true);
      setMessage("Uploading, please wait..."); 
      
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/food/`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);

      setMessage("Reel uploaded successfully! ✅");
      setName("");
      setDescription("");
      clearVideo(); 

      
        toast.success("food-Reel uploaded successfully!");
        navigate(`/food-partner/${foodPartner}`);
     
    } catch (err) {
      console.error(err);
      setMessage("Error uploading reel ❌");
      toast.error("Error uploading food-Reel!");
    } finally {
      setLoading(false);
    }
  };


  const isSuccess = message.includes("successfully");
  const isError = message.includes("Error") || message.includes("Please");
  const isUploading = message.includes("Uploading");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-4 relative overflow-hidden">
      
      {/* Profile button (top-left) */}
      <button
        onClick={handleProfile}
        title="Profile"
        className="absolute top-4 left-4 z-50 p-3 text-white bg-black/40 rounded-full hover:bg-black/60 transition-colors"
      >
        <FaUser size={22} />
      </button>

      {/* Logout button (top-right) */}
      {/* <Link className="reel-btn" to={`/food-partner/${foodPartner}`}> */}
      <button
        onClick={handleLogout}
        title="Logout"
        className="absolute top-4 right-4 z-50 p-3 text-white bg-black/40 rounded-full hover:bg-black/60 transition-colors"
      >
        <FaSignOutAlt size={22} />
      </button>
      {/* </Link> */}
      

      {/* Background blobs for visual interest */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>


      <div
        className=" create-food-main relative m-5 z-10 bg-gray-800/40 backdrop-blur-xl border border-gray-700
                       p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-lg
                       transform transition-all duration-300 ease-in-out
                       hover:shadow-blue-500/30 ring-1 ring-inset ring-gray-700"
      >
        <h2 className=" text-3xl sm:text-4xl font-extrabold mb-3 text-center
                       bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Upload Reel
        </h2>
        <p className="text-gray-400 text-center mb-8 text-lg">
          Share your moments with the world
        </p>

        <form onSubmit={handleSubmit} className=" create-food-main space-y-6">
          <GradientInput
            label="Reel Name"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., My Awesome Trip"
            required
          />

          <GradientTextarea
            label="Description"
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us more about your reel..."
          ></GradientTextarea>

          <div>
            <label className="block mb-2 text-md font-medium text-gray-300">
              Video File
            </label>
            {!videoPreview ? (
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed
                           border-gray-600 rounded-xl cursor-pointer bg-gray-800/50 hover:bg-gray-700/50
                           transition-colors duration-200 ease-in-out group
                           shadow-inner shadow-slate-900/50"
              >
                <svg
                  className="w-12 h-12 mb-3 text-gray-400 group-hover:text-blue-400 transform group-hover:scale-110 transition-transform duration-200 ease-in-out animate-bounce-slow"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-400 group-hover:text-white">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">MP4, Webm, or OGG (MAX. 800MB)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-gray-700">
                <video src={videoPreview} controls className="w-full h-auto max-h-64 object-cover"></video>
                <button
                  type="button"
                  onClick={clearVideo}
                  className=" absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2
                                shadow-md transform transition-all duration-200 ease-in-out
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400
                                flex items-center justify-center w-8 h-8"
                  aria-label="Remove video"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          {message && (
             <div className={`mt-4 text-center text-sm font-medium ${isSuccess ? 'text-green-400' : isError ? 'text-red-400' : 'text-blue-400'} flex items-center justify-center`}>
               {isSuccess && (
                   <svg className="w-5 h-5 mr-2 animate-pulse-once" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                   </svg>
               )}
               {isError && (
                    <svg className="w-5 h-5 mr-2 animate-shake" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
               )}
               {isUploading && !isError && !isSuccess && (
                    <svg className="animate-spin h-5 w-5 mr-3 text-blue-400" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
               )}
               {message}
             </div>
          )}

          <GradientButton type="submit" loading={loading}>
            {loading ? "Uploading..." : "Upload Reel"}
          </GradientButton>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;