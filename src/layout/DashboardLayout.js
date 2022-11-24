import { Outlet } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';

const DashboardLayout = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
