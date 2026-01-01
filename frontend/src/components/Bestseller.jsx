import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const Bestseller = () => {
    const { products } = useContext(ShopContext);
    const [bestseller, setBestseller] = useState([]);

    useEffect(() => {
        // 1. Filter products where bestseller property is true
        // 2. Slice the array to only get the first 5
        const bestProduct = products.filter((item) => (item.bestseller));
        setBestseller(bestProduct.slice(0, 5));
    }, [products])

    

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Our most popular pieces, loved by customers worldwide.
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestseller.map((item, index) => (
                        <ProductItem 
                            key={index} 
                            id={item._id} 
                            image={item.image} 
                            name={item.name} 
                            price={item.price} 
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Bestseller;