import React from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Button,
    useDisclosure,
    Avatar,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Login from './Login';
import Signup from './Signup';
import { TerraState } from '../../context/TerraZoneProvider';
import { server } from '../utils/serverUrl';

const Auth = () => {
    const { isOpen: isSignOpen, onOpen: onSignOpen, onClose: onSignClose } = useDisclosure();
    const { isOpen: isLogOpen, onOpen: onLogOpen, onClose: onLogClose } = useDisclosure();

    const { user } = TerraState()
    const handleLogClick = () => {
        onLogOpen();
    };

    const handleSignClick = () => {
        onSignOpen();
    };

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        window.location.reload()
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >

            {user ? 
            <Menu>
                <MenuButton  borderRadius='50%' size={'sm'} backgroundColor='#1c1c1c' color='white' >
                <Avatar src={`${server}/${user.pic.data}`} />
            </MenuButton>
            <MenuList backgroundColor='#1c1c1c'>
                <MenuItem backgroundColor='#1c1c1c' color='white' >
                    Account
                </MenuItem>
                <MenuDivider />
                <MenuItem backgroundColor='#1c1c1c' color="white" onClick={logoutHandler}>
                    Logout
                </MenuItem>
            </MenuList>

            </Menu>
            : 
            <Menu >
            <MenuButton borderRadius='50%' size={'sm'} backgroundColor='#1c1c1c' color='white' >
                <FontAwesomeIcon icon={faUser} />
            </MenuButton>

            <MenuList backgroundColor='#1c1c1c'>
                <MenuItem backgroundColor='#1c1c1c' color='white' onClick={handleLogClick}>
                    Login
                </MenuItem>
                <MenuDivider />
                <MenuItem backgroundColor='#1c1c1c' color="white" onClick={handleSignClick}>
                    Signup
                </MenuItem>
            </MenuList>
        </Menu>
            }

            {/* <Menu >
                <MenuButton as={Button} borderRadius='50%' size={'sm'} backgroundColor='#1c1c1c' color='white' >
                    <FontAwesomeIcon icon={faUser} />
                </MenuButton>

                <MenuList backgroundColor='#1c1c1c'>
                    <MenuItem backgroundColor='#1c1c1c' color='white' onClick={handleLogClick}>
                        Login
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem backgroundColor='#1c1c1c' color="white" onClick={handleSignClick}>
                        Signup
                    </MenuItem>
                </MenuList>
            </Menu> */}

            {/* Render the Login and Signup components within the modal */}
            <Login isOpen={isLogOpen} onClose={onLogClose} />
            <Signup isOpen={isSignOpen} onClose={onSignClose} />
        </div>
    );
};

export default Auth;
