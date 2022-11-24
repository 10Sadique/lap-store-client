import { Outlet, ScrollRestoration } from 'react-router-dom';
import DashNav from '../components/dashboard/DashNav';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthProvider';
import { useContext } from 'react';
import useAdmin from '../components/hooks/useAdmin';
import useSeller from '../components/hooks/useSeller';
import useUser from '../components/hooks/useUser';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user.email);
    const [isSeller] = useSeller(user.email);
    const [isUser] = useUser(user.email);
    const { data: users, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios('http://localhost:5000/users');

            return res.data;
        },
    });

    console.log(isUser);

    console.log(users);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <DashNav />
            <div className="drawer drawer-mobile">
                <input
                    id="dashboard-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                {/* Main Content */}
                <div className="drawer-content">
                    <Outlet />
                    <ScrollRestoration />
                </div>

                {/* Sidebar */}
                <div className="drawer-side">
                    <label
                        htmlFor="dashboard-drawer"
                        className="drawer-overlay"
                    ></label>
                    <ul className="p-4 text-white menu w-52 bg-neutral">
                        {isAdmin && (
                            <>
                                <li>
                                    <a>All Users</a>
                                </li>
                                <li>
                                    <a>All Sellers</a>
                                </li>
                            </>
                        )}
                        {isSeller && (
                            <>
                                <li>
                                    <a>My Products</a>
                                </li>
                                <li>
                                    <a>Add Products</a>
                                </li>
                                <li>
                                    <a>My Buyers</a>
                                </li>
                            </>
                        )}
                        {isUser && (
                            <>
                                <li>
                                    <a>My Wishlist</a>
                                </li>
                                <li>
                                    <a>Add Order</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
