import { createBrowserRouter } from 'react-router-dom';
import AddProduct from '../components/dashboard/seller/AddProduct';
import MyBuyers from '../components/dashboard/seller/MyBuyers';
import DashboardLayout from '../layout/DashboardLayout';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import SellerPage from '../pages/dashboard/SellerPage';
import HomePage from '../pages/HomePage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/signup', element: <SignUpPage /> },
            { path: '/signin', element: <SignInPage /> },
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
            {
                path: '/dashboard/products',
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
        ],
    },
]);
