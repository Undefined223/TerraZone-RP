import React from 'react'
import { Box, Image, Text } from '@chakra-ui/react';
import gang from '../../assets/images/gang.png'


const Discover = () => {
    return (
        <Box height='100vh' w="100%" display='flex' alignItems='center' justifyContent='center' position='relative' color='white' className='discover'>
            <Box className='about-text'>
                <h1>Discover the Story Behind TerraZone RP: <span>Where Dreams Meet Reality</span></h1>
                <p> Explore our passion-driven GTA V role-playing server, crafted with dedication and enthusiasm by our developers. Immerse yourself in the rich world of Los Santos and join us on an unforgettable journey filled with excitement, adventure, and endless possibilities.</p>
            </Box>
            <Box className='about-image'>
                <Image src={gang} className='about-img' />

            </Box>


        </Box>
    )
}

export default Discover