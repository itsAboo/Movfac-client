import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SingleMedia from "./pages/SingleMedia";
import Planform from "./pages/PlanForm";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/mediaApi";
import AssignName from "./components/Signup/AssignName";
import UserContextProvider from "./context/UserContext";
import UserRoute from "./routes/UserRoute";
import MyAccount from "./pages/MyAccount";
import Profile from "./components/MyAccount/Profile";
import ChangePassword from "./components/MyAccount/ChangePassword";
import HaveUser from "./routes/HaveUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <Layout />
        </UserContextProvider>
      </QueryClientProvider>
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/category/search/:keyword",
        element: <Category />,
      },
      {
        path: "/category/:type/:genre",
        element: <Category />,
      },
      {
        path: "/login",
        element: (
          <HaveUser>
            <Login />
          </HaveUser>
        ),
      },
      {
        path: "/signup",
        element: (
          <HaveUser>
            <Signup />
          </HaveUser>
        ),
      },
      {
        path: "/signup/name",
        element: (
          <UserRoute>
            <AssignName />
          </UserRoute>
        ),
      },
      {
        path: "/media/:type/:path",
        element: (
          <UserRoute>
            <SingleMedia />
          </UserRoute>
        ),
      },
      {
        path: "/planform",
        element: (
          <UserRoute>
            <Planform />
          </UserRoute>
        ),
      },
      {
        path: "/myaccount",
        element: (
          <UserRoute>
            <MyAccount />
          </UserRoute>
        ),
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "password",
            element: <ChangePassword />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
