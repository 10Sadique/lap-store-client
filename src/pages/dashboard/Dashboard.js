import useAdmin from '../../hooks/useAdmin';
import useSeller from '../../hooks/useSeller';
import useUser from '../../hooks/useUser';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import AdminPage from './AdminPage';
import SellerPage from './SellerPage';
import UserPage from './UserPage';
import useTitle from './../../hooks/useTitle';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user.email);
    const [isSeller] = useSeller(user.email);
    const [isUser] = useUser(user.email);
    useTitle('Dashboard');

    return (
        <>
            {isAdmin && <AdminPage />}
            {isSeller && <SellerPage />}
            {isUser && <UserPage />}
        </>
    );
};

export default Dashboard;
