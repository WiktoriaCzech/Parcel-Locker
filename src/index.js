import React from "react";
import {createRoot} from "react-dom/client";
import{
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainAdminPanel from "./components/admin/MainAdminPanel";
import MainUserPanel from "./components/User/MainUserPanel";
import LoginPanel from "./components/login/LoginPanel";
import RegisterPanel from "./components/login/RegisterPanel";
import RedirectPanel from "./RedirectPanel";

const router = createBrowserRouter( [
    {
        path: "home-admin",
        element: <MainAdminPanel />
    },
    {
        path: "home-user",
        element: <MainUserPanel />
    },
    {
        path: "login",
        element: <LoginPanel />
    },
    {
        path: "register",
        element: <RegisterPanel />
    },
    {
        path: '*',
        element: <RedirectPanel />

    }
],);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
