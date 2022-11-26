import React, { useContext } from 'react';
import { AuthContext } from './../contexts/AuthProvider';
import useUser from './../hooks/useUser';
import { useLocation, Navigate } from 'react-router-dom';
import Loader from './../components/ui/Loader';

const UserRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isUser, isUserLoading] = useUser(user.email);
    const location = useLocation();

    if (user && isUser) {
        return children;
    }

    if (loading || isUserLoading) {
        return <Loader />;
    }

    return <Navigate to={`/signin`} state={{ from: location }} replace />;
};

export default UserRoute;
