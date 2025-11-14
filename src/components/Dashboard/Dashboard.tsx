import { Box, Button, Text } from "@mantine/core";
import { useDispatch } from "react-redux";
import { logout } from "../../Slice/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Box>
      <Text>My Dashboard</Text>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

export default Dashboard;
