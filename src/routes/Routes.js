import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import HomePage from '../pages/HomePage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';

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
        element: <DashboardLayout />,
        children: [{ path: '/dashboard', element: <Dashboard /> }],
    },
]);
