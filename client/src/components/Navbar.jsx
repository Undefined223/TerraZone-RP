import React, { useEffect } from 'react'
import { Box, Image, Text, IconButton } from '@chakra-ui/react'
import eclipse from '../assets/videos/blackhole.webm'
import './styles/Navbar.css'; // Import CSS file for styling
import TerraZoneLogo from '../assets/images/NavLogo.png'
import ServerStats from './lib/serverStats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faHouse, faPeopleGroup, faStore, faTasks } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const Navbar = () => {



    return (
        <Box >
            <Box  h='3vh' display='flex' justifyContent='space-between' alignItems='center' zIndex={99999999} position='relative' background='black' padding='5px' color='white'>
            <p> Login / Register </p>
            <ServerStats />
                
            </Box>
            <div className="navbar-container">
                <div className="video-wrapper">
                    <div id="about-me">
                        <video
                            autoPlay
                            muted
                            loop
                            className="video-element"
                        >
                            <source src={eclipse} type="video/webm" />
                        </video>
                    </div>
                </div>
                <Box className='nav' display="flex" justifyContent="center" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
                    <Box className='nav-list' display="flex" >

                        <Box className='logo' display="flex" >
                            <Image src={TerraZoneLogo} />
                            <Text display='flex' alignItems="center" color='white' className='tz' >Terrazone RP</Text>

                        </Box>


                        <ul>
                            <li>
                                <NavLink exact to="/applications" activeClassName="active"> {/* Use NavLink instead of a */}
                                    <div className="icon">
                                        <FontAwesomeIcon icon={faTasks} />
                                    </div>

                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/About" activeClassName="active">

                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    </div>

                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/" activeClassName="active">

                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faHouse} />
                                    </div>

                                </NavLink>
                            </li>

                            <li>
                                <NavLink exact to="/store" activeClassName="active">
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faStore} />
                                    </div>

                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/factions" activeClassName="active">

                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faPeopleGroup} />
                                    </div>

                                </NavLink>
                            </li>

                        </ul>






                    </Box>
                </Box>

            </div>
        </Box>
    )
}

export default Navbar
