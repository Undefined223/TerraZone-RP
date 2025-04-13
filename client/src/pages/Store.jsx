import React from 'react'
import Navbar from '../components/Navbar'
import Background from '../components/Background'
import { Box } from '@chakra-ui/react'
const Store = () => {
  return (
    <div>
      <Navbar />
      {/* <WebgiViewer /> */}
      <Background />
      
      <Box position='relative' display='flex' alignItems='center' height='20vh' >

      </Box>


    </div>
  )
}

export default Store