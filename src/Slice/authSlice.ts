/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "../services/authServices";

interface AuthState {
  loading: boolean;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  token: localStorage.getItem("token"),
  error: null,
};

// 🔹 Async thunk: calls backend login API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (body: { username: string; password: string }, {rejectWithValue}) => {
    try {
      const response = await loginService(body);
      return response; 
    } catch (error: any) {
        console.log('error-test',error);
        
      return rejectWithValue(error?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // loading
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // success
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        // extract access token
        const accessToken = action.payload.results.access;

        state.token = accessToken;

        // save to localStorage
        localStorage.setItem("token", accessToken);
      })

      // error
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
