import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

const hasJWT = ()=> {
    let flag = false;
    //check user has JWT token
    localStorage.getItem("token") ? flag=true : flag=false
    return flag
}
const RouteGuard = () => {
    const auth = hasJWT();
    return auth ? <Outlet/> : <Navigate to="/login" />
};

export default RouteGuard;