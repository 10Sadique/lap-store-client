import { createBrowserRouter } from 'react-router-dom';
import AddProduct from '../components/dashboard/seller/AddProduct';
import MyBuyers from '../components/dashboard/seller/MyBuyers';
import ProuductByCategory from '../components/home/ProuductByCategory';
import DashboardLayout from '../layout/DashboardLayout';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import SellerPage from '../pages/dashboard/SellerPage';
import HomePage from '../pages/HomePage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import PrivateRoute from './PrivateRoute';
import Shop from '../components/home/Shop';
import MyWishlist from '../components/dashboard/user/MyWishlist';
import MyOrders from '../components/dashboard/user/MyOrders';
import Payment from '../components/payment/Payment';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/signup', element: <SignUpPage /> },
            { path: '/signin', element: <SignInPage /> },
            {
                path: '/category/:id',
                element: (
                    <PrivateRoute>
                        <ProuductByCategory />
                    </PrivateRoute>
                ),
            },
            {
                path: '/shop',
                element: (
                    <PrivateRoute>
                        <Shop />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: '/dashboard',
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
            },
            // serller routes
            {
                path: '/dashboard',
                element: (
                    <PrivateRoute>
                        <SellerPage />
                    </PrivateRoute>
                ),
            },
            {
                path: '/dashboard/add-product',
                element: (
                    <PrivateRoute>
                        <AddProduct />
                    </PrivateRoute>
                ),
            },
            {
                path: '/dashboard/my-buyers',
                element: (
                    <PrivateRoute>
                        <MyBuyers />
                    </PrivateRoute>
                ),
            },
            // user routes
            {
                path: '/dashboard',
                element: (
                    <PrivateRoute>
                        <MyWishlist />
                    </PrivateRoute>
                ),
            },
            {
                path: '/dashboard/orders',
                element: (
                    <PrivateRoute>
                        <MyOrders />
                    </PrivateRoute>
                ),
            },
            // payment route
            {
                path: '/dashboard/payment/:id',
                element: (
                    <PrivateRoute>
                        <Payment />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);
