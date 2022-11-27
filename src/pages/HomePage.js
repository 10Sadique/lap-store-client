import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AdvertisedContainer from '../components/ui/AdvertisedContainer';
import Banner from '../components/ui/Banner';
import Loader from '../components/ui/Loader';
import NewsLetter from '../components/ui/NewsLetter';
import { AuthContext } from './../contexts/AuthProvider';
import useTitle from './../hooks/useTitle';

const HomePage = () => {
    useTitle('Home');
    const { user } = useContext(AuthContext);
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axios(
                'https://lap-store-server.vercel.app/categories'
            );

            return res.data;
        },
    });

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <div className="mx-auto max-w-[360px] md:max-w-3xl lg:max-w-6xl my-10 lg:my-14">
                <Banner />
                {user?.uid && <AdvertisedContainer />}
                <div>
                    <h1 className="mb-4 lg:text-3xl text-2xl text-center">
                        Prouduct Categories
                    </h1>
                    <p className="text-center mb-10 text-gray-500">
                        Look for laptops from different catagories we have.
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                        {categories.map((category) => (
                            <Link
                                to={`/category/${category.name}`}
                                key={category._id}
                            >
                                <div className="capitalize bg-primary h-[100px] lg:h-[150px] text-white lg:text-3xl text-center rounded-xl flex items-center justify-center">
                                    <p>{category.name}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <NewsLetter />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
