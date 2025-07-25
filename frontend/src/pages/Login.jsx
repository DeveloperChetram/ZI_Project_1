import { useForm } from 'react-hook-form';
import {Link} from 'react-router-dom'
import { asyncLoginUser } from '../redux/actions/userAction';
import { useDispatch } from 'react-redux';
const Login = () => {
    const {register, handleSubmit, reset} = useForm()
    const dispatch = useDispatch()
    const loginHandler = (data)=>{
    dispatch(asyncLoginUser(data))
        console.log(data)
        // reset()
    }
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-black px-4">
      <div className="   p-8 rounded-lg max-w-md w-full ">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Sign In to Your Account</h2>
        <form onSubmit={handleSubmit(loginHandler)}>
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
            {...register('password')}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#02b576]"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-[#02b576] text-white py-2 rounded-md shadow hover:shadow-[0_0_15px_#02b576] transition-all"
          >
            Login
          </button>
          <p className="text-sm text-center text-gray-400 mt-4">
            Don't have an account?{' '}
            <Link to='/sign-up' className="text-[#02b576] hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;