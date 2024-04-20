import React from 'react'
import Navbar from '../components/Navbar'
import Background from '../components/Background'
import FlipBook from '../components/About/FlipBook'
import { Box } from '@chakra-ui/react'
import Home from '../components/Landing/Home'
import AboutUs from '../components/Landing/AboutUs'
import Discover from '../components/About/Discover'
import '../components/styles/About.css'

const About = () => {
  return (
    <div>
      <Background />
      <Navbar />

      <Discover />
      <Box height="100vh" width="100%" display='flex' alignItems='center' justifyContent='center'  >
        <FlipBook />
      </Box>
    </div>
  )
}

export default About