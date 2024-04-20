import React from 'react'
import '../styles/Auth.css'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useToast,
    Text,
    Box
} from '@chakra-ui/react'
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import Recovery from './Recovery';
import axios from 'axios'
import { server } from '../utils/serverUrl';
import { TerraState } from "../../context/TerraZoneProvider"
const Login = ({ isOpen, onClose, onOpen }) => {

    const { isOpen: isRecoveryOpen, onOpen: onRecoveryOpen, onClose: onRecoveryClose } = useDisclosure()
    const [show, setShow] = useState(false);
    const { setUser } = TerraState();
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {



            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                `${server}/api/user/login`,
                { email, password },
                config
            );

            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            window.location.reload()
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response?.data?.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            console.log(error)
            setLoading(false);
        }
    };

    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent background='#150555' color='white' zIndex={99999999999999} >
                    <ModalHeader>Login</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing="10px">
                            <FormControl id="email" isRequired>
                                <FormLabel>Email Address</FormLabel>
                                <Input
                                    value={email}
                                    type="email"
                                    placeholder="Enter Your Email Address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={show ? "text" : "password"}
                                        placeholder="Enter password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                                            {show ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>

                            </FormControl>
                            <Box display='flex' justifyContent='flex-start' w='100%'>
                                <Recovery onOpen={onRecoveryOpen} isOpen={isRecoveryOpen} onClose={onRecoveryClose} onClick={onClose} />

                            </Box>
                            <Button
                                backgroundColor="#2f1453"
                                color='white'
                                width="100%"
                                style={{ marginTop: 15 }}
                                onClick={submitHandler}
                                isLoading={loading}
                                _hover={{ backgroundColor: '#51277f' }}
                            >
                                Login
                            </Button>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Login