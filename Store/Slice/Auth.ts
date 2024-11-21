import { base_url, endpoints } from "@/Api/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  state: string;
  message: string | undefined;
  userData: any[]; 
}

const initialState: AuthState = {
  state: "idle",
  message: "",
  userData: [], 
};


export const registerAuth = createAsyncThunk("auth/registerAuth", async (data: any) => {
  try {
    let response = await axios.post(base_url + endpoints.user, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});


export const loginAuth = createAsyncThunk("auth/loginAuth", async (data:any) => {
  try {
    let response = await axios.post(base_url + endpoints.user,data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register extra reducers
    builder.addCase(registerAuth.pending, (state, action) => {
      state.state = "loading";
    });
    builder.addCase(registerAuth.fulfilled, (state, action) => {
      state.state = "succeeded";
      state.message = "User registered successfully";
    });
    builder.addCase(registerAuth.rejected, (state, action) => {
      state.state = "failed";
      state.message = action.error.message;
    });

    // Login extra reducers
    builder.addCase(loginAuth.pending, (state, action) => {
      state.state = "loading";
    });
    builder.addCase(loginAuth.fulfilled, (state, action) => {
      state.state = "succeeded";
      state.message = "Login successful";
      state.userData = action.payload; 
    });
    builder.addCase(loginAuth.rejected, (state, action) => {
      state.state = "failed";
      state.message = action.error.message;
    });
  },
});

export default authSlice.reducer;
