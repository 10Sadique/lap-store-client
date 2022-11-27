import React from 'react';

const NewsLetter = () => {
    return (
        <div className="mt-20 bg-neutral text-white flex items-center flex-col lg:flex-row justify-between lg:p-20 p-10 gap-10 rounded-xl">
            <div>
                <h1 className="text-4xl font-bold text-primary">
                    Join Our Newsletter
                </h1>
                <p className="text-gray-300">
                    We'll keep you updated when your desired laptop arrives.
                </p>
            </div>
            <div className="flex">
                <input
                    type="text"
                    placeholder="Your Email"
                    className="py-3 px-5 w-full max-w-xs rounded-l-lg"
                />
                <button className="py-3 px-5 bg-primary rounded-r-lg">
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default NewsLetter;
