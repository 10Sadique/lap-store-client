import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../ui/Loader';
import ProductCard from './ProductCard';
import useTitle from './../../hooks/useTitle';

const ProuductByCategory = () => {
    const location = useLocation();
    const category = location.pathname.split('/').at(-1);
    useTitle(category.charAt(0).toUpperCase() + category.slice(1));

    const { data: products, isLoading } = useQuery({
        queryKey: ['products', category],
        queryFn: async () => {
            const res = await axios(
                `https://lap-store-server.vercel.app/products/${category}`
            );

            return res.data;
        },
    });

    if (isLoading) {
        return <Loader />;
    }

    console.log(products);

    return (
        <div className="mx-auto max-w-[370px] md:max-w-3xl lg:max-w-6xl my-10 lg:my-14">
            <h1 className="mb-10 text-xl lg:text-2xl capitalize">
                Showing Laptops from {category} Category
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProuductByCategory;
