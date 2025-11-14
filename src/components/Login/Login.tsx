// Logic for Login
//----------------------------------------------
// When you click Login:

// You enter username & password

// You click submit

// Redux sends the data to backend

// Backend returns a token

// Redux saves that token in localStorage

// PrivateRoute sees the token → allows dashboard

// PublicRoute sees the token → redirects to dashboard if already logged in

// That's it.

// Logic for Login
//----------------------------------------------


import { Box, Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Slice/authSlice";
import type { AppDispatch, RootState } from "../../store";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const result = await dispatch(loginUser({ username, password }));

    if (result) {
      navigate("/dashboard");
    }
  };

  return (
    <Box>
      <Text>Login</Text>

      <TextInput
        label="Username"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <PasswordInput
        label="Password"
        placeholder="xxxxxxxxxxxxxxxxxx"
        pt={16}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <Text c="red">{error}</Text>}

      <Button mt={10} onClick={handleSubmit} loading={loading}>
        Submit
      </Button>
    </Box>
  );
};

export default Login;
