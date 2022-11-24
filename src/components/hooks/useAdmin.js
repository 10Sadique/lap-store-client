import { useState, useEffect } from 'react';

const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setisAdminLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/users/admin/${email}`)
            .then((res) => res.json())
            .then((data) => {
                setIsAdmin(data.isAdmin);
                setisAdminLoading(false);
            });
    }, [email]);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
