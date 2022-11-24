import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import login from '../assets/login.svg';

const SignUpPage = () => {
    const imgHostingKey = process.env.REACT_APP_imgbb_apiKey;
    const [error, setError] = useState('');
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
    const handleSignIn = (data) => {
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
                                })
                                .catch((err) => {
                                    setError(err.message);
                                    console.log(err.message);
                                });

                            navigate(to, { replace: true });
                        })
                        .catch((err) => {
                            setError(err.message);
                            console.log(err.message);
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
                navigate(to, { replace: true });
            })
            .catch((err) => {
                setError(err.message);
                console.log(err.message);
            });
    };

    return (
        <div className="mx-auto max-w-[370px] md:max-w-3xl lg:max-w-6xl my-10 lg:my-14">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <div className="flex items-center justify-center">
                    <img src={login} alt="" />
                </div>
                <div className="flex flex-col items-center p-10 shadow-md bg-secondary/10 rounded-xl ">
                    <h1 className="text-xl font-bold text-primary">Sign Up</h1>
                    <form
                        className="w-full"
                        onSubmit={handleSubmit(handleSignIn)}
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
                            {error && (
                                <p className="mt-2 text-error" role="alert">
                                    {error}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col items-center gap-5 lg:flex-row">
                            {/* role select */}
                            <div className="w-full max-w-xs form-control">
                                <label className="label">
                                    <span className="label-text">You are</span>
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
                                {error && (
                                    <p className="mt-2 text-error" role="alert">
                                        {error}
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
                                {error && (
                                    <p className="mt-2 text-error" role="alert">
                                        {error}
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
                            {error && (
                                <p className="mt-2 text-error" role="alert">
                                    {error}
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
                            {error && (
                                <p className="mt-2 text-error" role="alert">
                                    {error}
                                </p>
                            )}
                        </div>

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
