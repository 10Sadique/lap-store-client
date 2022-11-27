import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Loader from '../../ui/Loader';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from './../../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const imgHostingKey = process.env.REACT_APP_imgbb_apiKey;
    const { user } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axios(
                'https://lap-store-server.vercel.app/categories'
            );

            return res.data;
        },
    });

    if (isLoading || loading) {
        return <Loader />;
    }

    const handleAddProduct = (data) => {
        const url = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
        const image = data.image[0];
        const formData = new FormData();
        setLoading(true);

        formData.append('image', image);
        fetch(url, { method: 'POST', body: formData })
            .then((res) => res.json())
            .then((imgData) => {
                if (imgData.success) {
                    const product = {
                        name: data.name,
                        category: data.category,
                        condition: data.condition,
                        desc: data.desc,
                        image: imgData.data.url,
                        location: data.location,
                        originalPrice: data.originaPrice,
                        phone: data.phone,
                        price: data.price,
                        purchaseYear: data.purchaseYear,
                        isSold: false,
                        isAdvertised: false,
                        sellerEmail: user.email,
                        sellerName: user.displayName,
                    };

                    fetch('https://lap-store-server.vercel.app/products/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem(
                                'accessToken'
                            )}`,
                        },
                        body: JSON.stringify(product),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.acknowledged) {
                                setLoading(false);
                                toast.success('Product Added Successfully!');
                                navigate('/dashboard');
                            }
                        });
                }
            });
    };

    return (
        <div className="m-8">
            <h1 className="mb-8 text-2xl text-center lg:text-left">
                Add New Product
            </h1>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {/* Product Name */}
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">
                                Name
                            </span>
                        </label>
                        <input
                            className="w-full input input-bordered"
                            type="text"
                            {...register('name', {
                                required: 'Please enter product name',
                            })}
                        />
                        {errors.name && (
                            <p className="mt-2 text-error" role="alert">
                                {errors.name?.message}
                            </p>
                        )}
                    </div>

                    {/* Product Image */}
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">
                                Product Image
                            </span>
                        </label>
                        <input
                            type="file"
                            className="w-full file-input file-input-bordered"
                            {...register('image', {
                                required: 'Please insert product image',
                            })}
                        />
                        {errors.image && (
                            <p className="mt-2 text-error" role="alert">
                                {errors.image?.message}
                            </p>
                        )}
                    </div>

                    {/* Product Price */}
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">
                                Price
                            </span>
                        </label>
                        <input
                            className="w-full input input-bordered"
                            type="text"
                            {...register('price', {
                                required: 'Please enter price',
                            })}
                        />
                        {errors.price && (
                            <p className="mt-2 text-error" role="alert">
                                {errors.price?.message}
                            </p>
                        )}
                    </div>

                    {/* Product Original Price */}
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">
                                Original Price
                            </span>
                        </label>
                        <input
                            className="w-full input input-bordered"
                            type="text"
                            {...register('originaPrice', {
                                required: 'Please enter origina price',
                            })}
                        />
                        {errors.originaPrice && (
                            <p className="mt-2 text-error" role="alert">
                                {errors.originaPrice?.message}
                            </p>
                        )}
                    </div>

                    {/* Product Condition */}
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">
                                Product Condition
                            </span>
                        </label>
                        <select
                            className="select select-bordered"
                            {...register('condition', {
                                required: 'Please enter product condition',
                            })}
                            defaultValue="default"
                        >
                            <option value="default" disabled>
                                Select Product Condition
                            </option>
                            <option value="excellent">Excellent</option>
                            <option value="good">Good</option>
                            <option value="fair">Fair</option>
                        </select>
                        {errors.condition && (
                            <p className="mt-2 text-error" role="alert">
                                {errors.condition?.message}
                            </p>
                        )}
                    </div>

                    {/* Product Category */}
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">
                                Product Category
                            </span>
                        </label>
                        <select
                            className="select select-bordered"
                            {...register('category', {
                                required: 'Please enter product category',
                            })}
                            defaultValue="default"
                        >
                            <option value="default" disabled>
                                Select Product Category
                            </option>
                            {categories.map((category) => (
                                <option
                                    key={category._id}
                                    className="capitalize"
                                    value={category.name}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="mt-2 text-error" role="alert">
                                {errors.category?.message}
                            </p>
                        )}
                    </div>

                    {/* Year of purchase */}
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">
                                Year of Purchase
                            </span>
                        </label>
                        <input
                            className="w-full input input-bordered"
                            type="text"
                            {...register('purchaseYear', {
                                required: 'Please enter year of purchase',
                            })}
                        />
                        {errors.purchaseYear && (
                            <p className="mt-2 text-error" role="alert">
                                {errors.purchaseYear?.message}
                            </p>
                        )}
                    </div>

                    {/* Phone Nubmer */}
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">
                                Phone
                            </span>
                        </label>
                        <input
                            className="w-full input input-bordered"
                            type="text"
                            {...register('phone', {
                                required: 'Please enter phone number',
                            })}
                        />
                        {errors.phone && (
                            <p className="mt-2 text-error" role="alert">
                                {errors.phone?.message}
                            </p>
                        )}
                    </div>

                    {/* Location */}
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">
                                Location
                            </span>
                        </label>
                        <input
                            className="w-full input input-bordered"
                            type="text"
                            {...register('location', {
                                required: 'Please enter location',
                            })}
                        />
                        {errors.location && (
                            <p className="mt-2 text-error" role="alert">
                                {errors.location?.message}
                            </p>
                        )}
                    </div>

                    {/* Product Description */}
                    <div className="w-full form-control lg:col-span-2">
                        <label className="label">
                            <span className="font-semibold label-text">
                                Description
                            </span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered"
                            {...register('desc', {
                                required: 'Please enter product description',
                            })}
                        ></textarea>
                        {errors.desc && (
                            <p className="mt-2 text-error" role="alert">
                                {errors.desc?.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="mt-4 btn btn-primary" type="submit">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
