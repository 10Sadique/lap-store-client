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
import AllUsers from '../components/dashboard/admin/AllUsers';
import AllSellers from '../components/dashboard/admin/AllSellers';
import AdminRoute from './AdminRoute';
import SellerRoute from './SellerRoute';
import UserRoute from './UserRoute';
import NotFound from './../components/ui/NotFound';
import Blog from '../pages/Blog';

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
            {
                path: '/blog',
                element: <Blog />,
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
                    <SellerRoute>
                        <SellerPage />
                    </SellerRoute>
                ),
            },
            {
                path: '/dashboard/add-product',
                element: (
                    <SellerRoute>
                        <AddProduct />
                    </SellerRoute>
                ),
            },
            {
                path: '/dashboard/my-buyers',
                element: (
                    <SellerRoute>
                        <MyBuyers />
                    </SellerRoute>
                ),
            },
            // user routes
            {
                path: '/dashboard/wishlist',
                element: (
                    <UserRoute>
                        <MyWishlist />
                    </UserRoute>
                ),
            },
            {
                path: '/dashboard',
                element: (
                    <UserRoute>
                        <MyOrders />
                    </UserRoute>
                ),
            },
            // payment route
            {
                path: '/dashboard/payment/:id',
                element: (
                    <UserRoute>
                        <Payment />
                    </UserRoute>
                ),
            },
            // Admin routes,
            {
                path: '/dashboard',
                element: (
                    <AdminRoute>
                        <AllUsers />
                    </AdminRoute>
                ),
            },
            {
                path: '/dashboard/sellers',
                element: (
                    <AdminRoute>
                        <AllSellers />
                    </AdminRoute>
                ),
            },
        ],
    },
    {
        path: '/*',
        element: <NotFound />,
    },
]);
