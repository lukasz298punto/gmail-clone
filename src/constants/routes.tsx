import Home from 'pages/Home';
import Login from 'pages/Login';

const prefix = '/gmail-clone';

export const routes = {
    HOME: {
        path: `${prefix}/`,
        component: <Home />,
        name: 'Home',
        isPrivate: true,
    },
    LOGIN: {
        path: `${prefix}/login`,
        component: <Login />,
        name: 'Login',
        isPrivate: false,
    },
} as const;
