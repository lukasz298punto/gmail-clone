import { Button } from '@mui/material';
import { useGlobalState } from 'constants/store';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect } from 'react';
import { isNil } from 'lodash';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [user] = useGlobalState('user');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isNil(user)) {
            navigate('/');
        }
    }, [user]);

    return (
        <Button
            variant="text"
            onClick={async () => {
                await signInWithEmailAndPassword(getAuth(), 'test@test.pl', 'test123456');
            }}
        >
            Login {user?.email}
        </Button>
    );
}
