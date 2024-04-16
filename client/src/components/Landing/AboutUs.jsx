import React from 'react'
import '../styles/AboutUs.css'
import { Box, Text } from '@chakra-ui/react'

const AboutUs = () => {
    return (
        <Box id='about-us' className="AboutUs">
            
            <Box className='text-wrapper'>
                <Box>
                    <h1>Who Are <span>We</span></h1>

                </Box>
                <Box marginBottom={8}>
                    <p>TerraZone is a passion project born from a love of gaming and a desire to create something extraordinary. Inspired by GTA V and the role-playing genre, our community-driven server offers an immersive experience in Los Santos. With a dedicated team and a commitment to fostering camaraderie and creativity, TerraZone invites you to join the adventure and discover the endless possibilities of role-playing.</p>
                </Box>
                <button className="abt-but">More About Us</button>
            </Box>
        </Box>
    )
}

export default AboutUs