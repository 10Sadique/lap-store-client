import useAdmin from '../../hooks/useAdmin';
import useSeller from '../../hooks/useSeller';
import useUser from '../../hooks/useUser';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import AdminPage from './AdminPage';
import SellerPage from './SellerPage';
import UserPage from './UserPage';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user.email);
    const [isSeller] = useSeller(user.email);
    const [isUser] = useUser(user.email);

    return (
        <>
            {isAdmin && <AdminPage />}
            {isSeller && <SellerPage />}
            {isUser && <UserPage />}
        </>
    );
};

export default Dashboard;
