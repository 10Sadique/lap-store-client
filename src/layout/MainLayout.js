import { Outlet, ScrollRestoration } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <div className="mx-auto max-w-[370px] md:max-w-3xl lg:max-w-6xl my-10 lg:my-14">
                <Outlet />
                <ScrollRestoration />
            </div>
        </div>
    );
};

export default MainLayout;
