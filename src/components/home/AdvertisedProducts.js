import React from 'react';
import ProductCard from './ProductCard';

const AdvertisedProducts = ({ products }) => {
    return (
        <div>
            <h1 className="mb-4 text-2xl lg:text-3xl text-center ">
                Advertised Products
            </h1>
            <p className="text-center mb-10 text-gray-500">
                See all the trending laptops from our sellers.
            </p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {products.reverse().map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AdvertisedProducts;
