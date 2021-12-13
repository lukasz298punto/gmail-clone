import { firebaseConfig } from 'api/config';
import { PrivateRoute } from 'components/PrivateRoute';
import { routes } from 'constants/routes';
import { useGlobalState } from 'constants/store';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { map } from 'lodash';
import NoMatch from 'pages/NoMatch';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'layout/style/root.css';
import { CssBaseline } from '@mui/material';
import theme from 'styles/theme';
import { ThemeProvider } from '@mui/material/styles';

initializeApp(firebaseConfig);

function Root() {
    const authentication = getAuth();
    const [, setUser] = useGlobalState('user');

    useEffect(() => {
        onAuthStateChanged(authentication, (authUser) => {
            setUser(authUser);
        });
    }, [onAuthStateChanged, authentication]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    {map(routes, ({ path, component, isPrivate }) =>
                        isPrivate ? (
                            <Route
                                key={path}
                                path={path}
                                element={<PrivateRoute>{component}</PrivateRoute>}
                            />
                        ) : (
                            <Route key={path} path={path} element={component} />
                        )
                    )}

                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default Root;
