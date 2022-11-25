import { useContext, useState } from 'react';
import {
    HiCheckBadge,
    HiCalendarDays,
    HiOutlineCalendar,
} from 'react-icons/hi2';
import { HiLocationMarker } from 'react-icons/hi';
import { AuthContext } from './../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import ProductModal from './ProductModal';
import { FaCalendar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    const [disabled, setDisabled] = useState(false);
    const { user } = useContext(AuthContext);
    const date = new Date(product.postedAt);
    const postedAt = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    const handleAddToWishlist = (product, email) => {
        const wishlishted = {
            productId: product._id,
            userEmail: email,
        };
        fetch('http://localhost:5000/wishlist/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

    return (
        <div className="col-span-1 p-5 rounded-lg shadow-md bg-accent/10">
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
                    <p className="flex items-center justify-between">
                        <span className="flex items-center gap-1">
                            {product.sellerName}{' '}
                            {product.verifiedSeller && (
                                <span>
                                    <HiCheckBadge />
                                </span>
                            )}
                        </span>
                        <span className="flex items-center gap-1">
                            <HiLocationMarker /> <span>{product.location}</span>
                        </span>
                    </p>
                    <p className="flex items-center gap-1">
                        <HiOutlineCalendar /> <span>{postedAt}</span>
                    </p>
                </div>

                {/* price */}
                <div className="grid grid-cols-5 gap-4 mb-3">
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

                {/* buttons */}
                <div className="grid grid-cols-2 gap-4">
                    <label htmlFor="product-modal" className="btn btn-primary">
                        Book Laptop
                    </label>
                    <button
                        disabled={disabled}
                        onClick={() => handleAddToWishlist(product, user.email)}
                        className="btn"
                    >
                        Add to Wishlist
                    </button>
                </div>
            </div>
            <ProductModal product={product} user={user} />
        </div>
    );
};

export default ProductCard;
