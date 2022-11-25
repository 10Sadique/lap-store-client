import React, { useContext } from 'react';
import { AuthContext } from './../../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { async } from '@firebase/util';
import axios from 'axios';
import Loader from '../../ui/Loader';
import OrderRow from './OrderRow';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const email = user.email;
    const { data: products, isLoading } = useQuery({
        queryKey: ['products', email],
        queryFn: async () => {
            const res = await axios(
                `http://localhost:5000/orders?email=${email}`
            );

            return res.data;
        },
    });

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="mx-2 my-8 lg:m-8">
            <h1 className="mb-5 text-2xl text-center lg:text-left">
                My Orders
            </h1>
            {products.length ? (
                <div className="overflow-hidden shadow-md rounded-xl">
                    (
                    <table className="w-full table-fixed lg:table-auto">
                        <thead className="bg-secondary/20">
                            <tr className="overflow-x-scroll">
                                <th className="py-2 lg:px-5">Sl.</th>
                                <th className="py-2 lg:px-5">Name</th>
                                <th className="py-2 lg:px-5">Price</th>
                                <th className="py-2 lg:px-5">Category</th>
                                <th className="py-2 lg:px-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-[1px] bg-secondary/10">
                            {products.map((product, idx) => (
                                <OrderRow
                                    key={product._id}
                                    idx={idx}
                                    productId={product.productId}
                                />
                            ))}
                        </tbody>
                    </table>
                    )
                </div>
            ) : (
                <p className="text-center">No order placed yet.</p>
            )}
        </div>
    );
};

export default MyOrders;
