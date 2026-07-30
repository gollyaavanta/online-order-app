import React,{useState} from 'react'
import LoginPopup from "../.././components/LoginPopup/LoginPopup"
import Navbar from "../.././components/Navbar/Navbar"
const Auth = () => {
    const [showLogin,setShowLogin]=useState(true)
  return (
    <div>
        <Navbar/>
        {showLogin&&<LoginPopup setShowLogin={setShowLogin}/> }
    </div>
  )
}

export default Auth