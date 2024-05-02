import { useState } from 'react';
import { Card, CardBody, CardFooter, Divider, ButtonGroup, Button, Stack, Heading, Text, Image, Box } from '@chakra-ui/react';
import { server } from '../utils/serverUrl';

const Product = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Card
            maxW='sm'
            h='100%'
            zIndex={9999999}
            bgGradient="radial(at top, #0d0d0d, #2d0a33)"
            color="white"
            boxShadow={isHovered ? 'lg' : 'md'}
            borderRadius="xl"
            transition="all 0.3s"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            transform={isHovered ? 'scale(1.05)' : 'scale(1)'}
            display="flex"
            flexDirection="column"
        >
            <CardBody flex="1" p="4">
                <Image
                    src={`${server}/${product?.image.data}`}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                    h="200px"
                    objectFit="cover"
                />
                <Stack mt='3' spacing='2'>
                    <Heading size='md'> {product?.name} </Heading>
                    <Box
                        maxH="50px"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="normal"
                        sx={{
                            WebkitBoxOrient: 'vertical',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                        }}
                    >
                        <Text>
                            {product?.description}
                        </Text>
                    </Box>
                    <Text color='blue.600' fontSize='2xl'>
                        TND {product?.price}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter p="4">
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='blue'>
                        Buy now
                    </Button>
                    <Button variant='ghost' colorScheme='blue'>
                        Learn More
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};

export default Product;
