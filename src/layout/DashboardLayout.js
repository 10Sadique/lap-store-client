import { Link, Outlet, ScrollRestoration } from 'react-router-dom';
import DashNav from '../components/dashboard/DashNav';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthProvider';
import { useContext } from 'react';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import useUser from '../hooks/useUser';
import Loader from '../components/ui/Loader';
import { Toaster } from 'react-hot-toast';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user.email);
    const [isSeller] = useSeller(user.email);
    const [isUser] = useUser(user.email);
    // const { data: users, isLoading } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await axios('http://localhost:5000/users');

    //         return res.data;
    //     },
    // });

    // if (isLoading) {
    //     return <Loader />;
    // }

    // console.log(users);

    return (
        <div>
            <DashNav />
            <div className="drawer drawer-mobile h-[calc(100vh-56px)] ">
                <input
                    id="dashboard-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                {/* Main Content */}
                <div className="drawer-content no-scrollbar">
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
                                    <Link to={`/dashboard`}>All Users</Link>
                                </li>
                                <li>
                                    <Link to={`/dashboard/sellers`}>
                                        All Sellers
                                    </Link>
                                </li>
                            </>
                        )}
                        {isSeller && (
                            <>
                                <li>
                                    <Link to={`/dashboard`}>My Products</Link>
                                </li>
                                <li>
                                    <Link to={`/dashboard/add-product`}>
                                        Add Products
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/dashboard/my-buyers`}>
                                        My Buyers
                                    </Link>
                                </li>
                            </>
                        )}
                        {isUser && (
                            <>
                                <li>
                                    <Link to={`/dashboard`}>My Wishlist</Link>
                                </li>
                                <li>
                                    <Link to={`/dashboard/orders`}>
                                        My Orders
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default DashboardLayout;
