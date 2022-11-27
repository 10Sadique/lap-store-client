import React from 'react';
import { Link } from 'react-router-dom';
import error from '../../assets/404.svg';

const NotFound = () => {
    return (
        <div className="h-screen flex items-center gap-10 justify-center flex-col">
            <img className="lg:w-1/3 w-1/2" src={error} alt="Not Found" />
            <p className="font-semibold flex items-center gap-1 text-lg">
                <span>Page Not Found. </span>
                <Link className="text-primary" to={`/`}>
                    Return to Home
                </Link>
            </p>
        </div>
    );
};

export default NotFound;
