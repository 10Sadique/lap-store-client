import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from './../components/ui/Loader';
import { AuthContext } from './../contexts/AuthProvider';
import useAdmin from './../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user.email);
    const location = useLocation();

    if (user && isAdmin) {
        return children;
    }

    if (loading || isAdminLoading) {
        return <Loader />;
    }

    return <Navigate to={`/signin`} state={{ from: location }} replace />;
};

export default AdminRoute;
