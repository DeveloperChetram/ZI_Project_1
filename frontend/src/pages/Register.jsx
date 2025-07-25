import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useEffect } from "react";

const Registration = () => {
    const { register, reset, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, status, error } = useSelector((state) => state.auth);

    const registerHandler = (data) => {
        dispatch(registerUser(data));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    return (
        <section className="min-h-screen w-full flex items-center justify-center bg-black px-4">
            <div className=" p-8 rounded-lg max-w-md w-full  transition-all">
                <h2 className="text-2xl font-semibold mb-6 text-center text-white">Create an Account</h2>
                <form onSubmit={handleSubmit(registerHandler)}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm text-gray-400">Full Name</label>
                        <input
                            {...register("username")}
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-4 py-2 rounded-md bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#02b576]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm text-gray-400">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 rounded-md bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#02b576]"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm text-gray-400">Password</label>
                        <input
                            {...register("password")}
                            type="password"
                            placeholder="Create a password"
                            className="w-full px-4 py-2 rounded-md bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#02b576]"
                        />
                    </div>
                    {/* Add Role Selection Dropdown */}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm text-gray-400">Role</label>
                        <select
                            {...register("role")}
                            className="w-full px-4 py-2 rounded-md bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#02b576]"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-[#02b576] text-white py-2 rounded-md shadow hover:shadow-[0_0_15px_#02b576] transition-all"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Registering...' : 'Register'}
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <p className="text-sm text-center text-gray-400 mt-4">
                        Already have an account?{' '}
                        <Link to='/login' className="text-[#02b576] hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Registration;