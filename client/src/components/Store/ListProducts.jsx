import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../utils/serverUrl';
import Product from './Product';
import CreateProduct from '../../components/Store/CreateProduct'


const ListProducts = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${server}/api/products`);
            setProducts(data);
        } catch (err) {
            console.log('Error', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Box
        className='grid-container'
            h='100vh'
            w='100%'
            position='relative'
            display='grid'
            // gridTemplateColumns='repeat(auto-fit, minmax(250px, 1fr))'
            gap='20px' // Adjust as needed
            justifyContent='center'
            alignItems='center'
            padding='20px' // Adjust as needed
        >
            

            {loading ? (
                <Text>Loading...</Text>
            ) : (
                products.map((product, index) => (
                    <Box key={index} display='flex' justifyContent='center' alignItems='center' m={10}>
                        <Product product={product}/>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default ListProducts;
