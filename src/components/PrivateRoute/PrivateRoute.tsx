import { CircularProgress } from '@mui/material';
import { useGlobalState } from 'constants/store';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }: { children: JSX.Element }) {
    const location = useLocation();
    const [user] = useGlobalState('user');

    console.log(user, 'user');

    if (user === undefined) {
        return <CircularProgress />;
    }

    if (user === null) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}

export default PrivateRoute;
