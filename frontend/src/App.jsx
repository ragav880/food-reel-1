import React from 'react'
import AppRoutes from './routes/AppRoutes'
import './App.css'
import { Toaster } from 'sonner'; 

function App() {


  return (
    <>
     <Toaster richColors position="bottom-right" />
    <AppRoutes />
    </>  
  )
}

export default App
