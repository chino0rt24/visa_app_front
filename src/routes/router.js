import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Login from "../components/Login";
import SettingWeekly  from "../components/SettingWeekly";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />, 
    children: [
      {
        path: "Home",
        element: <Home />, 
      },
      {
        path: "Login",
        element: <Login />, 
      },
      {
        path: "SettingWeekly",
        element: <SettingWeekly />, 
      }
    ],
  }
]);
