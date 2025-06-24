import { loadUser } from "../reducers/userSlice";

export const asyncRegisterUser = (userData) =>(dispatch)=>{
    dispatch(loadUser(userData))
}
