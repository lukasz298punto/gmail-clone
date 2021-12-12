import { PrivateRoute } from 'components/PrivateRoute';
import { useGlobalState } from 'constants/store';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Home from 'pages/Home';
import Login from 'pages/Login';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const firebaseConfig = {
    apiKey: 'AIzaSyC7k5hkrfiKIWVfR_bjx4s3XEf4Iyf3ENM',
    authDomain: 'test-p-64541.firebaseapp.com',
    projectId: 'test-p-64541',
    storageBucket: 'test-p-64541.appspot.com',
    messagingSenderId: '463564250016',
    appId: '1:463564250016:web:36040b511e5edf3e62a2c5',
};

initializeApp(firebaseConfig);

function App() {
    const authentication = getAuth();
    const [, setUser] = useGlobalState('user');

    useEffect(() => {
        onAuthStateChanged(authentication, (authUser) => {
            console.log(authUser, 'asas');
            setUser(authUser);
        });
    }, [onAuthStateChanged, authentication]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
