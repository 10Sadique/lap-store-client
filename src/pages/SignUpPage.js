import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import login from '../assets/login.svg';
import Loader from '../components/ui/Loader';
import verifyJWT from './../components/utils/verifyJWT';
import useTitle from './../hooks/useTitle';

const SignUpPage = () => {
    useTitle('Sign Up');
    const imgHostingKey = process.env.REACT_APP_imgbb_apiKey;
    const [error, setError] = useState('');
    const [pageLoading, setPageLoading] = useState(false);
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const to = location.state?.from?.pathname || '/';
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signUp, googleSignIn, updateUser, setLoading } =
        useContext(AuthContext);

    // handle sign in button
    const handleSignUp = (data) => {
        setPageLoading(true);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
        const image = data.image[0];
        const formData = new FormData();

        formData.append('image', image);

        // hosting image to imgbb
        fetch(url, { method: 'POST', body: formData })
            .then((res) => res.json())
            .then((imgData) => {
                if (imgData.success) {
                    console.log(imgData.data.url);

                    // create user with email and password
                    signUp(data.email, data.password)
                        .then((result) => {
                            const user = result.user;
                            setError('');

                            // setting image and password
                            updateUser(data.name, imgData.data.url)
                                .then(() => {
                                    console.log('Profile Updated');
                                    console.log(user);
                                    saveUser(
                                        data.name,
                                        data.email,
                                        data.role,
                                        false
                                    );
                                    verifyJWT(user.email);
                                    setPageLoading(false);
                                })
                                .catch((err) => {
                                    setError(err.message);
                                    console.log(err.message);
                                    setPageLoading(false);
                                });
                            navigate(to, { replace: true });
                        })
                        .catch((err) => {
                            setError(err.message);
                            console.log(err.message);
                            setPageLoading(false);
                        });
                }
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
                // authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if (data.acknowledged) {
                    verifyJWT(email);
                    setCreatedUserEmail(email);
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
                    <h1 className="text-xl font-bold text-primary">Sign Up</h1>
                    <form
                        className="w-full"
                        onSubmit={handleSubmit(handleSignUp)}
                    >
                        {/* name input field */}
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="font-semibold label-text">
                                    Name
                                </span>
                            </label>
                            <input
                                className="w-full input input-bordered"
                                type="text"
                                {...register('name', {
                                    required: 'Please enter your name',
                                })}
                            />
                            {errors.name && (
                                <p className="mt-2 text-error" role="alert">
                                    {errors.name?.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col items-center gap-5 lg:flex-row">
                            {/* role select */}
                            <div className="w-full form-control">
                                <label className="label">
                                    <span className="font-semibold label-text">
                                        You are
                                    </span>
                                </label>
                                <select
                                    className="select select-bordered"
                                    {...register('role', {
                                        required: 'Please enter your role',
                                    })}
                                    defaultValue="user"
                                >
                                    <option value="user">I am a User</option>
                                    <option value="seller">
                                        I am a Seller
                                    </option>
                                </select>
                                {errors.role && (
                                    <p className="mt-2 text-error" role="alert">
                                        {errors.role?.message}
                                    </p>
                                )}
                            </div>

                            {/* image input */}
                            <div className="w-full form-control">
                                <label className="label">
                                    <span className="font-semibold label-text">
                                        Profile Picture
                                    </span>
                                </label>
                                <input
                                    type="file"
                                    className="w-full file-input file-input-bordered"
                                    {...register('image', {
                                        required: 'Please insert your image',
                                    })}
                                />
                                {errors.image && (
                                    <p className="mt-2 text-error" role="alert">
                                        {errors.image?.message}
                                    </p>
                                )}
                            </div>
                        </div>

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
                                {error.slice(9, -1)}
                            </p>
                        )}

                        {/* sign up button */}
                        <button
                            className="w-full mt-4 btn btn-primary"
                            type="submit"
                        >
                            Sign Up
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
                            Already have an account?{' '}
                            <Link className="text-primary" to={`/signin`}>
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
