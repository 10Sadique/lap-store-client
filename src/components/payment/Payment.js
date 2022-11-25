import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../ui/Loader';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_stripe_publicKey);

const Payment = () => {
    const location = useLocation();
    const productId = location.pathname.split('/').at(-1);
    const { data: product, isLoading } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            const res = await axios.get(
                `http://localhost:5000/payment/products/${productId}`
            );

            return res.data;
        },
    });

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="p-5 m-10 shadow-md w-[370px] rounded-xl bg-accent/10">
                <Elements stripe={stripePromise}>
                    <CheckoutForm product={product} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
