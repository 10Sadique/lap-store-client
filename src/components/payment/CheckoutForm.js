import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import Loader from '../ui/Loader';
import { AuthContext } from './../../contexts/AuthProvider';

const CheckoutForm = ({ product }) => {
    const { user } = useContext(AuthContext);
    const { price, _id, sellerEmail, name } = product;
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        fetch(`http://localhost:5000/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
            });
    }, [price]);

    // handle payment
    const handleSubmit = async (e) => {
        e.preventDefault();

        // check if stripe.js is loaded or not
        if (!stripe || !elements) {
            return;
        }

        // mount a card
        const card = elements.getElement(CardElement);

        // check if card is null
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error);
            setCardError(error);
        } else {
            setCardError('');
        }

        setSuccess('');
        setLoading(true);

        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user.displayName,
                        email: user.email,
                    },
                },
            });

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            setSuccess('Payment Successful');
            setTransactionId(paymentIntent.id);

            // store buyer info in db
            const buyer = {
                price,
                buyerEmail: user.email,
                buyerName: user.displayName,
                productId: _id,
                productName: name,
                transactionId,
                sellerEmail,
            };

            fetch(`http://localhost:5000/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(buyer),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.insertedId) {
                        setSuccess('Payment Successful');
                        setTransactionId(paymentIntent.id);
                    }
                });
        }
        setLoading(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    className="px-5 py-3 mb-5 rounded-lg shadow-sm bg-gray-50"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="text-right">
                    <button
                        className="capitalize btn btn-primary"
                        type="submit"
                        disabled={
                            !stripe || !clientSecret || loading || transactionId
                        }
                    >
                        Pay Now
                    </button>
                </div>
            </form>
            {cardError && (
                <p className="mt-5 font-semibold text-red-500">{cardError}</p>
            )}
            {success && (
                <div className="mt-5 font-semibold">
                    <p className="text-green-500">{success}</p>
                    <p>
                        Your transaction Id:{' '}
                        <span className="font-bold">{transactionId}</span>
                    </p>
                </div>
            )}
        </>
    );
};

export default CheckoutForm;
