import React from "react";
import {createRoot} from "react-dom/client";
import {
    BrowserRouter, Route, Routes,
} from "react-router-dom";
import MainAdminPanel from "./components/admin/MainAdminPanel";
import MainUserPanel from "./components/User/MainUserPanel";
import LoginPanel from "./components/login/LoginPanel";
import RegisterPanel from "./components/login/RegisterPanel";
import RedirectPanel from "./RedirectPanel";
import MainDeliverPanel from "./components/deliver/MainDeliverPanel";
import RouteGuard from "../src/auth/RouteGuard"

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

function App() {
    return(
        <BrowserRouter history={history}>
            <Routes>
                <Route path='/' element={<RouteGuard />}>
                    <Route path='/home-user' element={<MainUserPanel/>} />
                    <Route path='/home-admin' element={<MainAdminPanel/>} />
                    <Route path='/home-delivery' element={<MainDeliverPanel/>} />
                </Route>
                <Route path='/login' element={<LoginPanel/>} />
                <Route path='/register' element={<RegisterPanel/>} />
                <Route path='*' element={<RedirectPanel/>} />
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById("root")).render(
    App()
);
