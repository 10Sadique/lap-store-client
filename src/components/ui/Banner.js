import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../../assets/banner.svg';

const Banner = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 my-24 gap-10">
            <div className="order-2 lg:order-1 flex flex-col items-start justify-center">
                <h1 className="lg:text-6xl text-5xl font-bold mb-5 text-primary">
                    Get The Best Laptops at a Reasonable Price
                </h1>
                <p className="text-gray-500 mb-5">
                    We sell high-quality, well-maintained used laptop computers.
                    Find the laptop you want the most. The selection will wow
                    you.
                </p>
                <Link to={`/shop`} className="btn btn-primary">
                    Shop Now!!
                </Link>
            </div>
            <div className="w-full order-1 lg:order-2">
                <img src={banner} alt="Laptop" />
            </div>
        </div>
    );
};

export default Banner;
