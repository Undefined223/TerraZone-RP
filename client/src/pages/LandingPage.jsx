import React from 'react'
import Background from '../components/Background'
import Home from '../components/Landing/Home'
import AboutUs from '../components/Landing/AboutUs'
import Navbar from '../components/Navbar'
import WebgiViewer from '../components/WebgiViewer'
const LandingPage = () => {
    return (
        <div >
            <Navbar />
            <WebgiViewer />
            <Background />
            <Home />
            <AboutUs />
        </div>
    )
}

export default LandingPage