import React from 'react';
import AdvertisedProducts from '../home/AdvertisedProducts';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from './Loader';

const AdvertisedContainer = () => {
    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axios({
                method: 'get',
                url: `https://lap-store-server.vercel.app/products/advertised`,
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
            });

            return res.data.reverse();
        },
    });

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="mb-10">
            {products.length > 0 && <AdvertisedProducts products={products} />}
        </div>
    );
};

export default AdvertisedContainer;
