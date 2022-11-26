import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from '../ui/Loader';
import { toast } from 'react-hot-toast';

const ProductModal = ({ product, user, closeModal }) => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleAddToOrder = (data) => {
        setLoading(true);
        const order = {
            productId: product._id,
            userEmail: user.email,
            // userPhone: data.phone,
            // meetLocation: data.meetLocation,
        };

        fetch(`http://localhost:5000/orders/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(order),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    setLoading(false);
                    toast.success('Successfully added to your orders!');
                    closeModal();
                } else {
                    setLoading(false);
                    toast.error('Already exists in your orders!!!');
                    closeModal();
                }
            });
    };

    if (loading) {
        return (
            <>
                <input
                    type="checkbox"
                    id="product-modal"
                    className="modal-toggle"
                />
                <div className="modal">
                    <div className="modal-box">
                        <Loader />
                        <div></div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <input
                type="checkbox"
                id="product-modal"
                className="modal-toggle"
            />
            <div className="modal no-scrollbar">
                <div className="modal-box no-scrollbar">
                    <form
                        onSubmit={handleSubmit(handleAddToOrder)}
                        className="w-full"
                    >
                        {/* Name field */}
                        <div className="w-full form-control">
                            <label className="label label-text">
                                Your Name
                            </label>
                            <input
                                type="text"
                                defaultValue={user.displayName}
                                disabled
                                className="w-full input input-bordered"
                            />
                        </div>

                        {/* Email field */}
                        <div className="w-full form-control">
                            <label className="label label-text">
                                Your Email
                            </label>
                            <input
                                type="text"
                                defaultValue={user.email}
                                disabled
                                className="w-full input input-bordered"
                            />
                        </div>

                        {/* product name */}
                        <div className="w-full form-control">
                            <label className="label label-text">
                                Product Name
                            </label>
                            <input
                                type="text"
                                defaultValue={product.name}
                                disabled
                                className="w-full input input-bordered"
                            />
                        </div>

                        {/* product price */}
                        <div className="w-full form-control">
                            <label className="label label-text">
                                Product Price
                            </label>
                            <input
                                type="text"
                                defaultValue={product.price}
                                disabled
                                className="w-full input input-bordered"
                            />
                        </div>

                        {/* phone nubmer */}
                        <div className="w-full form-control">
                            <label className="label label-text">
                                Your Phone
                            </label>
                            <input
                                type="text"
                                {...register('phone', {
                                    required: 'Enter phone number',
                                })}
                                className="w-full input input-bordered"
                            />
                            {errors.phone && (
                                <p className="mt-2 text-error" role="alert">
                                    {errors.phone?.message}
                                </p>
                            )}
                        </div>

                        {/* meeting location */}
                        <div className="w-full form-control">
                            <label className="label label-text">
                                Meeting Location
                            </label>
                            <input
                                type="text"
                                {...register('meetLocation', {
                                    required: 'Enter meeting location',
                                })}
                                className="w-full input input-bordered"
                            />
                            {errors.meetLocation && (
                                <p className="mt-2 text-error" role="alert">
                                    {errors.meetLocation?.message}
                                </p>
                            )}
                        </div>

                        {/* button section */}
                        <div className="modal-action">
                            <button
                                type="submit"
                                className="capitalize btn btn-primary"
                            >
                                Add to My Orders
                            </button>
                            <label
                                onClick={closeModal}
                                htmlFor="product-modal"
                                className="capitalize btn"
                            >
                                Close
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProductModal;
