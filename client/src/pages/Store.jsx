import React from 'react'
import Navbar from '../components/Navbar'
import Background from '../components/Background'
import { Box } from '@chakra-ui/react'
import ListProducts from '../components/Store/ListProducts'
import CreateProduct from '../components/Store/CreateProduct'
const Store = () => {
  return (
    <div>
      <Navbar />
      {/* <WebgiViewer /> */}
      <Background />
      
      <Box position='relative' display='flex' alignItems='center' height='20vh' >

        <CreateProduct />
      </Box>
      <ListProducts />


    </div>
  )
}

export default Store