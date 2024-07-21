import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "../screens/Home/Home";
import App from "../App";
import Login from "../screens/Login/Login";
import Signup from "../screens/Signup/Signup";
import GoogleCallback from "../screens/GoogleCallBack/GoogleCallback";
import ProtectedRoute from "../utils/protectedRoute";

const token = sessionStorage.getItem("token");

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/client/auth/google/callback" element={<GoogleCallback />} />
      <Route element={<ProtectedRoute />}>
        <Route index element={<Home />} />
      </Route>
    </Route>
  )
);
