import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.userReducer?.isAuthenticated);
    const screenLoading = useSelector((state) => state.userReducer?.screenLoading);

    return !screenLoading&&!isAuthenticated ? <Navigate to="/login" replace />:children;
};

export default ProtectedRoute;
