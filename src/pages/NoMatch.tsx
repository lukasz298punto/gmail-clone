import { Button } from '@mui/material';
import { routes } from 'constants/routes';
import { useNavigate } from 'react-router-dom';

export default function NoMatch() {
    const navigate = useNavigate();

    return (
        <div className="App">
            <Button onClick={() => navigate(routes.HOME.path)}>Returen</Button>
        </div>
    );
}
