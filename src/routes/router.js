import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Login from "../components/Login";
import SettingWeekly  from "../components/SettingWeekly";
import Chatbot from "../components/Chatbot";
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
        path: "settings",
        element: <SettingWeekly />, 
      },
      {
        path: "chatbot",
        element: <Chatbot/>
      },
    ],
  },
  {
    path: "Login",
    element: <Login />, 
  },
  {
    path: "settingWeekly",
    element: <SettingWeekly />, 
  },
]);
