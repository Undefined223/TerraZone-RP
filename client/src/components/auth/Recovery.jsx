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
import axios from 'axios'
import { server } from '../utils/serverUrl';
const Recovery = ({ isOpen, onClose, onOpen }) => {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState()
    const handleClick = () => setShow(!show);
    const toast = useToast()


    const submitHandler = async () => {
        try {
            axios.post(`${server}/api/user/recovery`, {
                email: email
            }
            )
        } catch (err) {
            console.log(err)

        }
    }
    return (
        <div>
            <Text textDecoration='underline' color='grey' cursor='pointer' onClick={onOpen} >Forgot Password?</Text>


            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent background='#150555' color='white' zIndex={9999999999} isCentered>
                    <ModalHeader>Password Recovery</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing="10px">
                            <FormControl id="email" isRequired>
                                <FormLabel>Email Address</FormLabel>
                                <Input
                                    type="email"
                                    placeholder="Enter Your Email Address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>

                            <Box display='flex' justifyContent='flex-start' w='100%'>

                            </Box>
                            <Button
                                backgroundColor="#2f1453"
                                color='white'
                                width="100%"
                                style={{ marginTop: 15 }}
                                isLoading={loading}
                                onClick={submitHandler}
                                _hover={{ backgroundColor: '#51277f' }}
                            >
                                Recover Password
                            </Button>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Recovery