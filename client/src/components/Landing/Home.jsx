import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import '../styles/Home.css';
import SocialList from './SocialList';
import Navbar from '../Navbar';

const Home = () => {
    // const handleClick = () => {
    //     const AboutUsSection = document.getElementById('about-us');
    //     if (AboutUsSection) {
    //         AboutUsSection.scrollIntoView({ behavior: 'smooth' });
    //     }
    // };
    return (
        <Box className='home'>

            <Box className='text-wrapper'>
                <Box className='first-box'>
                    <p>Welcome to TerraZone : <span>Where</span> <br /> Reality Meets Adventure</p>
                </Box>
                <Box className='second-box'>
                    <p>Dive into our immersive GTA V role-playing experience, where you shape the story. Join a vibrant community, explore endless possibilities, and make your mark in the dynamic world of Los Santos. Your journey begins here</p>

                    <Box display="flex" alignItems='center' justifyContent='flex-end' margin={3}>
                        {/* <button className="abt-but" onClick={handleClick} style={{lineHeight:'normal', fontSize:'medium'}}>
                            About Us
                        </button> */}
                        <SocialList />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Home;
