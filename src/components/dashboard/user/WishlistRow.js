import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { AuthContext } from './../../../contexts/AuthProvider';

const WishlistRow = ({ productId, idx }) => {
    const { user } = useContext(AuthContext);
    const { data: product, isLoading } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            const res = await axios(
                `http://localhost:5000/wishlist/products/${productId}`
            );

            return res.data;
        },
    });

    const handleAddToMyOrders = () => {
        const product = {
            productId,
            userEmail: user.email,
        };

        fetch(`http://localhost:5000/orders/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success('Successfully added to your orders!');
                } else {
                    toast.error('Already exists in your orders!!!');
                }
            });
    };

    if (isLoading) {
        return <tr className="btn btn-ghost loading"></tr>;
    }

    return (
        <tr className="w-full">
            <td className="py-2 lg:py-3 text-sm lg:text-[16px] text-center">
                {idx + 1}
            </td>
            <td className="py-2 lg:py-3 text-sm lg:text-[16px] text-center">
                {product.name}
            </td>
            <td className="py-2 lg:py-3 text-sm lg:text-[16px] text-center">
                {product.price}
            </td>
            <td className="py-2 lg:py-3 text-sm lg:text-[16px] text-center capitalize">
                {product.category}
            </td>
            <td className="py-2 lg:py-3 text-sm lg:text-[16px] text-center capitalize">
                {product.isSold ? (
                    <span className="text-primary">Sold</span>
                ) : (
                    <span className="text-success">Avaiable</span>
                )}
            </td>
            <td className="py-2 lg:py-3 text-sm lg:text-[16px] text-center">
                <button
                    onClick={handleAddToMyOrders}
                    disabled={product.isSold}
                    className="text-xs normal-case btn btn-sm btn-primary"
                >
                    Add to Orders
                </button>
            </td>
        </tr>
    );
};

export default WishlistRow;
