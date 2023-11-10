import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectRoutesProps {
    isAuth: boolean;
    path: string;
    children: React.ReactNode;
}

const ProtectRoutes: React.FC<ProtectRoutesProps> = ({ isAuth, path, children }) => {
    if (isAuth) {
        return <Outlet />;
    } else {
        return <Navigate to="/" />;
    }
};

export default ProtectRoutes;