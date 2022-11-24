import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="p-10 footer bg-neutral text-neutral-content">
            <div>
                <div className="text-3xl">
                    <span className="text-primary">Lap</span>
                    <span className="">Store</span>
                </div>
                <p>
                    LapStore Ltd.
                    <br />
                    Providing reliable tech since 2020
                </p>
            </div>
            <div>
                <span className="footer-title">Social</span>
                <div className="grid grid-flow-col gap-4">
                    <button>
                        <FaFacebook className="transition-all duration-300 w-7 h-7 text-accent hover:text-primary ease" />
                    </button>
                    <button>
                        <FaTwitter className="transition-all duration-300 w-7 h-7 text-accent hover:text-primary ease" />
                    </button>
                    <button>
                        <FaInstagram className="transition-all duration-300 w-7 h-7 text-accent hover:text-primary ease" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
