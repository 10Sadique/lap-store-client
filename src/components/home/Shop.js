import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../ui/Loader';
import ProductCard from './ProductCard';

const Shop = () => {
    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axios('http://localhost:5000/products/all');

            return res.data;
        },
    });

    if (isLoading) {
        return <Loader />;
    }

    console.log(products);

    return (
        <div className="mx-auto max-w-[370px] md:max-w-3xl lg:max-w-6xl my-10 lg:my-14">
            <h1 className="mb-5 text-2xl text-center lg:text-left">Shop</h1>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Shop;
