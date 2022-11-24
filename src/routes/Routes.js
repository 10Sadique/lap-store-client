import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import HomePage from '../pages/HomePage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [{ path: '/', element: <HomePage /> }],
    },
]);
