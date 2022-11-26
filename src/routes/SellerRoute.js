import React, { useContext } from 'react';
import { AuthContext } from './../contexts/AuthProvider';
import useSeller from './../hooks/useSeller';
import Loader from './../components/ui/Loader';
import { Navigate, useLocation } from 'react-router-dom';

const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user.email);
    const location = useLocation();

    if (user && isSeller) {
        return children;
    }

    if (loading || isSellerLoading) {
        return <Loader />;
    }

    return <Navigate to={`/signin`} state={{ from: location }} replace />;
};

export default SellerRoute;
