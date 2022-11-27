import { useState, useEffect } from 'react';

const useSeller = (email) => {
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(true);

    useEffect(() => {
        fetch(`https://lap-store-server.vercel.app/users/sellers/${email}`)
            .then((res) => res.json())
            .then((data) => {
                setIsSeller(data.isSeller);
                setIsSellerLoading(false);
            });
    }, [email]);

    return [isSeller, isSellerLoading];
};

export default useSeller;
