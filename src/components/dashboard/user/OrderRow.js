import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const OrderRow = ({ productId, idx }) => {
    // const { user } = useContext(AuthContext);
    const { data: product, isLoading } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            const res = await axios(
                `https://lap-store-server.vercel.app/wishlist/products/${productId}`
            );

            return res.data;
        },
    });

    if (isLoading) {
        return <tr className="btn btn-ghost loading"></tr>;
    }

    return (
        <>
            {product && (
                <tr className="w-full divide-x-[1px]">
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
                            <span className="font-bold text-error">Sold</span>
                        ) : (
                            <span className="font-bold text-success">
                                Available
                            </span>
                        )}
                    </td>
                    <td className="py-2 lg:py-3 text-sm lg:text-[16px] text-center">
                        <Link
                            to={`/dashboard/payment/${productId}`}
                            // onClick={handleAddToMyOrders}
                            disabled={product.isSold}
                            className="text-xs normal-case btn lg:btn-sm btn-primary"
                        >
                            Pay
                        </Link>
                    </td>
                </tr>
            )}
        </>
    );
};

export default OrderRow;
