import { loadUser } from "../reducers/userSlice";
import axios from 'axios';
import {  toast } from 'react-toastify';


export const asyncRegisterUser = (userData) => async (dispatch)=>{
    try{
        const res = await axios.post("http://localhost:8000/api/auth/signup",userData)
        dispatch(loadUser(res.data.user))
        console.log("response",res)
        if(res.status==201){
            toast.success('User register success!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
                });

                
            }
            else{
                toast.error('User already exist!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    
                    });
            }
    }
    catch(err){
        console.log(err)
    }

}

export const asyncLoginUser = (Input) => async ()=>{
    try {
        const res = await axios.post("http://localhost:8000/api/auth/login",Input)
        console.log("input", res)
        
    } catch (error) {
        console.log("faild login ",error)
    }
}