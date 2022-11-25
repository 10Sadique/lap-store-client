import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from './../../../contexts/AuthProvider';
import axios from 'axios';
import Loader from '../../ui/Loader';
import WishlistRow from './WishlistRow';

const MyWishlist = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/wishlist?email=${user.email}`;
    const { data: wishlist, isLoading } = useQuery({
        queryKey: ['wishlist', user.email],
        queryFn: async () => {
            const res = await axios(url);
            return res.data;
        },
    });

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="mx-2 my-8 lg:m-8">
            <h1 className="mb-5 text-2xl text-center lg:text-left">
                My Wishlist
            </h1>
            {wishlist.length ? (
                <div className="overflow-hidden shadow-md rounded-xl">
                    <table className="w-full table-fixed lg:table-auto">
                        <thead className="bg-secondary/20">
                            <tr className="overflow-x-scroll">
                                <th className="py-2 lg:px-5">Sl.</th>
                                <th className="py-2 lg:px-5">Name</th>
                                <th className="py-2 lg:px-5">Price</th>
                                <th className="py-2 lg:px-5">Category</th>
                                <th className="py-2 lg:px-5">Status</th>
                                <th className="py-2 lg:px-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-[1px] bg-secondary/10">
                            {wishlist.map((product, idx) => (
                                <WishlistRow
                                    key={product._id}
                                    productId={product.productId}
                                    idx={idx}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center">Wishlist is empty.</p>
            )}
        </div>
    );
};

export default MyWishlist;
