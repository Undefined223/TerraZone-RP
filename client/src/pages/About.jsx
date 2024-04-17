import React from 'react'
import Navbar from '../components/Navbar'
import Background from '../components/Background'
import FlipBook from '../components/About/FlipBook'
import { Box } from '@chakra-ui/react'

const About = () => {
  return (
    <div>
      <Background />
      <Navbar />
      <Box height='100vh'>

      </Box>
      <FlipBook />
    </div>
  )
}

export default About