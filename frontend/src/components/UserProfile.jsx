import {useSelector} from "react-redux"
// import { useReducer } from "../redux/reducers/userSlice"
const UserProfile = () => {
    const userData = useSelector( (state)=> state.userSlice.data) 
  
    return(
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 flex flex-col items-center">
     
        <h2 className="text-xl font-semibold mb-1">{userData?.name}</h2>
        <p className="text-gray-500 mb-3">{userData?.email}</p>
        <p className="text-gray-500 mb-3">password : {userData?.password}</p>
        <p className="text-gray-700 text-center mb-4">
            Software Engineer at Zidio. Passionate about building scalable web applications and learning new technologies.
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Edit Profile
        </button>
    </div>
    )
}

export default UserProfile;