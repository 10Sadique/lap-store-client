import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../components/ui/Loader';

const HomePage = () => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axios('http://localhost:5000/categories');

            return res.data;
        },
    });

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <div className="mx-auto max-w-[370px] md:max-w-3xl lg:max-w-6xl my-10 lg:my-14">
                Home
                <div>
                    {categories.map((category) => (
                        <p key={category._id}>{category.name}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
