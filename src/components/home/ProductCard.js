import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { IoCalendarClear } from 'react-icons/io5';
import { MdLocationOn } from 'react-icons/md';
import Loader from '../ui/Loader';
import { AuthContext } from './../../contexts/AuthProvider';
import ProductModal from './ProductModal';

const ProductCard = ({ product }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const { user } = useContext(AuthContext);
    const date = new Date(product.postedAt);

    const postedAt = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

    const { data: sellerId, isLoading } = useQuery({
        queryKey: ['sellerId', product.sellerEmail],
        queryFn: async () => {
            const res = await axios(
                `https://lap-store-server.vercel.app/seller/${product.sellerEmail}`
            );

            return res.data;
        },
    });

    // close modal
    const closeModal = () => {
        setSelectedProduct(null);
    };

    // handle add to wishlist
    const handleAddToWishlist = (product, email) => {
        const wishlishted = {
            productId: product._id,
            userEmail: email,
        };
        fetch('https://lap-store-server.vercel.app/wishlist/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(wishlishted),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    setDisabled(data.acknowledged);
                    toast.success('Successfully added to wishlist');
                } else toast.error('Already exsists in wishlist');
            });
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="col-span-1 p-4 rounded-2xl shadow-md bg-accent/10">
            <div className="w-full h-[185px] rounded-lg overflow-hidden mb-3 shadow-md">
                <img
                    className="object-cover w-full h-full"
                    src={product.image}
                    alt=""
                />
            </div>
            <div>
                {/* product title */}
                <h1 className="mb-3 text-xl font-bold">{product.name}</h1>
                {/* seller info */}
                <div className="mb-2 text-sm text-gray-500">
                    <p className="flex items-center justify-between mb-1">
                        <span className="flex items-center gap-1">
                            {product.sellerName}{' '}
                            {sellerId.isVerified && (
                                <BsFillPatchCheckFill className="w-3 text-primary" />
                            )}
                        </span>
                        <span className="flex items-center gap-1">
                            <MdLocationOn /> <span>{product.location}</span>
                        </span>
                    </p>
                    <p className="flex items-center gap-1 text-xs">
                        <IoCalendarClear /> <span>{postedAt}</span>
                    </p>
                </div>

                {/* price */}
                <div className="grid grid-cols-5 gap-4 mb-2">
                    <p className="col-span-2">
                        Price:{' '}
                        <span className="text-xl font-bold text-primary">
                            ${product.price}
                        </span>
                    </p>
                    <p className="col-span-3 text-right">
                        Original Price:{' '}
                        <span className="text-xl font-bold">
                            ${product.originalPrice}
                        </span>
                    </p>
                </div>

                <p className="mb-2 ">
                    Category:{' '}
                    <span className="font-semibold ">
                        <span className="capitalize">{product.category}</span>
                    </span>
                </p>
                {/* conditions */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                    <p>
                        Condition:{' '}
                        <span className="font-bold capitalize">
                            {product.condition}
                        </span>
                    </p>
                    <p className="text-right">
                        Years Used:{' '}
                        <span className="font-bold">
                            {new Date().getFullYear() - product.purchaseYear}
                        </span>
                    </p>
                </div>

                {/* Product Desc. */}
                <div className="mb-3 h-12 overflow-hidden text-ellipsis">
                    <span className="font-semibold">Product Description: </span>
                    <span>{product.desc}</span>
                </div>

                {/* buttons */}
                <div className="grid grid-cols-2 gap-4">
                    <label
                        onClick={() => setSelectedProduct(product)}
                        htmlFor="product-modal"
                        className="capitalize btn btn-primary"
                    >
                        Book Laptop
                    </label>
                    <button
                        disabled={disabled}
                        onClick={() => handleAddToWishlist(product, user.email)}
                        className="capitalize btn"
                    >
                        Add to Wishlist
                    </button>
                </div>
            </div>
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    user={user}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default ProductCard;
