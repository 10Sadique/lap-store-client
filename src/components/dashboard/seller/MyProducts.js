import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useState } from 'react';
import ConfirmationModal from '../../ui/ConfirmationModal';
import Loader from '../../ui/Loader';
import { AuthContext } from './../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const MyProducts = () => {
    const [deletingProduct, setDeletingProduct] = useState(null);
    const { user } = useContext(AuthContext);
    const email = user.email;
    const {
        data: products,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['products', email],
        queryFn: async () => {
            const res = await axios(
                `http://localhost:5000/products?email=${email}`
            );

            return res.data;
        },
    });

    const handleAdvertise = (id) => {
        fetch(`http://localhost:5000/advertise/${email}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    refetch();
                }
            });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/products/${id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            // },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    console.log(data);
                    toast.success('Product successfully deleted!');
                    refetch();
                }
            });
    };

    const closeModal = () => {
        setDeletingProduct(null);
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="mx-2 my-8 lg:m-8">
            <h1 className="mb-8 text-2xl text-center lg:text-left">
                My Products
            </h1>
            {products.length ? (
                <div className="overflow-hidden shadow-md rounded-xl">
                    <table className="w-full table-fixed lg:table-auto">
                        <thead className="bg-secondary/20">
                            <tr className="overflow-x-scroll">
                                <th className="py-2 lg:px-5">Sl.</th>
                                <th className="py-2 lg:px-5">Name</th>
                                <th className="py-2 lg:px-5">Price</th>
                                <th className="py-2 lg:px-5">Status</th>
                                <th className="py-2 lg:px-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-[1px] bg-secondary/10">
                            {products.map((product, i) => (
                                <tr key={product._id}>
                                    <td className="py-2 lg:py-3 text-sm lg:text-[16px] text-center">
                                        {i + 1}
                                    </td>
                                    <td className="py-2 lg:py-3 text-sm lg:text-[16px] ">
                                        {product.name}
                                    </td>
                                    <td className="py-2 lg:py-3 text-sm lg:text-[16px] text-center">
                                        {product.price}
                                    </td>
                                    <td className="py-2 lg:py-3 text-sm lg:text-[16px] text-center">
                                        {product.isSold ? (
                                            <span className="text-primary">
                                                Sold
                                            </span>
                                        ) : (
                                            <span className="text-success">
                                                Available
                                            </span>
                                        )}
                                    </td>
                                    <td className="flex flex-col items-center justify-center gap-2 py-2 lg:py-3 text-sm lg:text-[16px] text-center lg:flex-row">
                                        <button
                                            onClick={() =>
                                                handleAdvertise(product._id)
                                            }
                                            disabled={product.isAdvertised}
                                            className="w-full btn btn-success btn-xs lg:w-auto"
                                        >
                                            Advertise
                                        </button>
                                        <label
                                            onClick={() =>
                                                setDeletingProduct(product)
                                            }
                                            htmlFor="confirmation-modal"
                                            className="w-full btn btn-primary btn-xs lg:w-auto"
                                        >
                                            Delete
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center">No products added.</p>
            )}
            {deletingProduct && (
                <ConfirmationModal
                    title={`Are you sure you want to remove product?`}
                    message={`If you remove ${deletingProduct.name}, it cannot be undome!!`}
                    product={deletingProduct}
                    handleDelete={handleDelete}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default MyProducts;
