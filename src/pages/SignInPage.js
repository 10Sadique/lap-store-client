import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import login from '../assets/login.svg';
import Loader from './../components/ui/Loader';
import verifyJWT from './../components/utils/verifyJWT';
import useTitle from './../hooks/useTitle';

const SignInPage = () => {
    useTitle('Sign In');
    const [error, setError] = useState('');
    const [pageLoading, setPageLoading] = useState(false);
    const [loggedUserEmail, setLoggedUserEmail] = useState('');
    const navigate = useNavigate();
    // const location = useLocation();
    // const to = location.state?.from?.pathname || '/';
    const to = '/';
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signIn, googleSignIn } = useContext(AuthContext);

    // handle sign in button
    const handleSignIn = (data) => {
        setPageLoading(true);
        signIn(data.email, data.password)
            .then((result) => {
                setPageLoading(false);
                const user = result.user;
                setError('');
                console.log(user);
                verifyJWT(user.email);
                navigate(to, { replace: true });
            })
            .catch((err) => {
                setError(err.message);
                console.log(err.message);
                setPageLoading(false);
            });
    };

    // handle google sign in
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;
                setError('');
                console.log(user);
                saveUser(user.displayName, user.email, 'user', false);
                verifyJWT(user.email);
                setPageLoading(false);
                navigate(to, { replace: true });
            })
            .catch((err) => {
                setError(err.message);
                console.log(err.message);
                setPageLoading(false);
            });
    };

    // save user function
    const saveUser = (name, email, role = 'user', isVerified = false) => {
        const user = { name, email, role, isVerified };

        fetch(`https://lap-store-server.vercel.app/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                // verifyJWT(email);
                if (data.acknowledged) {
                    setLoggedUserEmail(email);
                }
            });
    };

    if (pageLoading) {
        return (
            <div className="flex items-center justify-center h-[70vh]">
                <Loader />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-[360px] md:max-w-3xl lg:max-w-6xl my-10 lg:my-14">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <div className="flex items-center justify-center">
                    <img src={login} alt="" />
                </div>
                <div className="flex flex-col items-center p-10 shadow-md bg-secondary/10 rounded-xl ">
                    <h1 className="text-xl font-bold text-primary">Sign In</h1>
                    <form
                        className="w-full"
                        onSubmit={handleSubmit(handleSignIn)}
                    >
                        {/* email input field */}
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="font-semibold label-text">
                                    Email
                                </span>
                            </label>
                            <input
                                className="w-full input input-bordered"
                                type="email"
                                {...register('email', {
                                    required: 'Please enter your email',
                                })}
                            />
                            {errors.email && (
                                <p className="mt-2 text-error" role="alert">
                                    {errors.email?.message}
                                </p>
                            )}
                        </div>

                        {/* password input field */}
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="font-semibold label-text">
                                    Password
                                </span>
                            </label>
                            <input
                                className="w-full input input-bordered"
                                type="password"
                                {...register('password', {
                                    required: 'Please enter you password',
                                })}
                            />
                            {errors.password && (
                                <p className="mt-2 text-error" role="alert">
                                    {errors.password?.message}
                                </p>
                            )}
                        </div>

                        {error && (
                            <p className="mt-2 text-error" role="alert">
                                {error}
                            </p>
                        )}

                        {/* sign up button */}
                        <button
                            className="w-full mt-4 btn btn-primary"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </form>
                    <div className="divider">OR</div>
                    {/* googole signin button */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="flex items-center w-full gap-2 btn btn-outline btn-primary"
                    >
                        <FaGoogle />
                        <span>Contnue with Google</span>
                    </button>
                    <div className="mt-2 ">
                        <p>
                            Don't have an account?{' '}
                            <Link className="text-primary" to={`/signup`}>
                                Sign Up Now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
