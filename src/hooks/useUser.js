import { useState, useEffect } from 'react';

const useUser = (email) => {
    const [isUser, setIsUser] = useState(false);
    const [isUserLoading, setIsUsreLoading] = useState(true);

    useEffect(() => {
        fetch(`https://lap-store-server.vercel.app/users/${email}`)
            .then((res) => res.json())
            .then((data) => {
                setIsUser(data.isUser);
                setIsUsreLoading(false);
            });
    }, [email]);

    return [isUser, isUserLoading];
};

export default useUser;
