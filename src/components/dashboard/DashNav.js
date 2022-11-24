import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthProvider';

const DashNav = () => {
    const [navbar, setNavbar] = useState(false);
    const { user, logOut } = useContext(AuthContext);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                console.log('Signed Out');
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const navLinks = [
        <div
            className="flex flex-col w-full gap-5 font-semibold md:items-center md:flex-row"
            key={1}
        >
            <NavLink
                className={({ isActive }) => (isActive ? 'text-primary' : '')}
                to={`/shop`}
            >
                Shop
            </NavLink>
            <NavLink
                className={({ isActive }) => (isActive ? 'text-primary' : '')}
                to={`/blog`}
            >
                Blog
            </NavLink>
            {user?.uid ? (
                <>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'text-primary' : ''
                        }
                        to={`/dashboard`}
                    >
                        Dashboard
                    </NavLink>
                    {/* <NavLink
                        className={({ isActive }) =>
                            isActive ? 'text-primary' : ''
                        }
                        to={`/signup`}
                    >
                        Sign Up
                    </NavLink> */}
                    <span className="cursor-pointer" onClick={handleSignOut}>
                        Sign Out
                    </span>
                    {user?.photoURL && (
                        <span className="w-10 h-10 overflow-hidden rounded-full">
                            <img
                                className="object-cover w-full h-full"
                                src={user.photoURL}
                                alt=""
                            />
                        </span>
                    )}
                </>
            ) : (
                <>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'text-primary' : ''
                        }
                        to={`/signin`}
                    >
                        Sing In
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'text-primary' : ''
                        }
                        to={`/signup`}
                    >
                        Sign Up
                    </NavLink>
                </>
            )}
        </div>,
    ];

    return (
        <nav className="sticky top-0 z-50 w-full text-gray-700 shadow-md bg-white/70 backdrop-blur-md">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 ">
                <div>
                    <div className="flex items-center justify-between py-3 md:block">
                        <NavLink to={`/`} className="text-2xl font-bold">
                            <span className="text-primary">Lap</span>
                            <span className="text-gray-700">Store</span>
                        </NavLink>
                        <div className="flex items-center gap-5 md:hidden">
                            <label
                                htmlFor="dashboard-drawer"
                                className="capitalize btn btn-sm btn-primary drawer-button lg:hidden"
                            >
                                Menu
                            </label>
                            <button
                                className="p-2rounded-md "
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <FaTimes className="w-6 h-6" />
                                ) : (
                                    <FaBars className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? 'block' : 'hidden'
                        }`}
                    >
                        {navLinks}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashNav;
