import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import React, { useState } from 'react';
import { useToast, VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Box, Img, Button } from '@chakra-ui/react';
import axios from 'axios';
import defaultUser from '../../assets/images/user.png'; // You need to specify the path to your default user image
import { server } from '../utils/serverUrl';


const Signup = ({ isOpen, onClose, onOpen }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [previewImage, setPreviewImage] = useState(defaultUser);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);




  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPic(file);

    // Update the previewImage to show the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(defaultUser);
    }
  };


  const submitHandler = async () => {
    setPicLoading(true);

    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmpassword", confirmpassword);
      formData.append("pic", pic);

      const { data } = await axios.post(
        `${server}/api/user`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      window.location.reload()
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log(error)

      setPicLoading(false);
    }
  };


  return (
    <>

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent background='#150555' color='white' zIndex={9999999999} isCentered>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="5px">
              <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter Your Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter Your Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="Confirm password"
                    onChange={(e) => setConfirmpassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl display='flex' justifyContent="center" alignItems="center">
                <div className="user-img" style={{ position: 'relative' }}>
                  <FormLabel htmlFor="file" margin="0" borderRadius="50%" >Upload Your Profile Picture
                    <Img style={{ width: "160px", height: '160px', borderRadius: '50%', margin: '0 auto' }} src={previewImage} id="photo" />
                    <Box
                      position="absolute"
                      top="5"
                      right="8"
                      padding="2"
                    >
                      <i className="fas fa-camera"></i>
                    </Box>
                  </FormLabel>

                  <Input
                    display="none"
                    type="file"
                    id="file"
                    p={1.5}
                    accept=".jpg, .jpeg, .png, .gif"
                    onChange={handleFileChange}
                  />
                </div>
              </FormControl>

              <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={picLoading}
              >
                Sign Up
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

export default Signup