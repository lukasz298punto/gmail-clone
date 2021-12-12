import { Button } from '@mui/material';
import { useGlobalState } from 'constants/store';
import { getAuth, signOut } from 'firebase/auth';

export default function Home() {
    const [user] = useGlobalState('user');

    return (
        <div className="App">
            <Button
                variant="text"
                onClick={async () => {
                    signOut(getAuth());
                }}
            >
                signout
            </Button>
            {user?.email}
        </div>
    );
}
