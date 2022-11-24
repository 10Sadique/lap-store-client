import { useState, useEffect } from 'react';

const useUser = (email) => {
    const [isUser, setIsUser] = useState(false);
    const [isUserLoading, setIsUsreLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/users/${email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setIsUser(data.isUser);
                setIsUsreLoading(false);
            });
    }, [email]);

    return [isUser, isUserLoading];
};

export default useUser;
