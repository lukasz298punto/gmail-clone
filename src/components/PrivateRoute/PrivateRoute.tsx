import { CircularProgress } from '@mui/material';
import { routes } from 'constants/routes';
import { useGlobalState } from 'constants/store';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }: { children: JSX.Element }) {
    const location = useLocation();
    const [user] = useGlobalState('user');

    if (user === undefined) {
        return <CircularProgress />;
    }

    if (user === null) {
        return <Navigate to={routes.LOGIN.path} state={{ from: location }} />;
    }

    return children;
}

export default PrivateRoute;
