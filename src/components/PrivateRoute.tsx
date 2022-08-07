import React, { Children, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import FChatContext from '../context/FChatContext'

type PrivateRouteProps = {
    children: React.ReactNode,
    redirectPath: string
};

const PrivateRoute = ({redirectPath, children}: PrivateRouteProps) => {

    const {user, loadingUser} = useContext (FChatContext);
    
    if (! loadingUser && ! user ) return <Navigate to={redirectPath} replace/>
    return children ? <>{children}</> : <Outlet />;

    
}

export default PrivateRoute;