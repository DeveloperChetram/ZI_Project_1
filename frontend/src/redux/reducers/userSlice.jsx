import { createSlice } from "@reduxjs/toolkit"

const initialState = {

}

const userSlice = createSlice({
    name:"userSlice",
    initialState : initialState,
    reducers:{
        loadUser:(state,action)=>{
            state.data = action.payload;
        }
    }


    
})

export default userSlice.reducer;
export const  { loadUser } = userSlice.actions;