import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../components/ui/Footer';
import Navbar from '../components/ui/Navbar';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            {/* className="mx-auto max-w-[370px] md:max-w-3xl lg:max-w-6xl my-10 lg:my-14" */}
            <div>
                <Outlet />
                <ScrollRestoration />
            </div>
            <Footer />
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default MainLayout;
