import { Button, Container, Grid, LinearProgress, TextField } from '@mui/material';
import { useGlobalState } from 'constants/store';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { isNil } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { routes } from 'constants/routes';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';

type FormValues = {
    login: string;
    password: string;
};

function ErrorLabel({ message }: { message: string }) {
    return (
        <>
            <ErrorIcon className="mr-2 w-4 h-4" />
            <span>{message}</span>
        </>
    );
}

export default function Login() {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: { login: '', password: '' },
        reValidateMode: 'onSubmit',
    });
    const [user] = useGlobalState('user');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormValues> = async ({ login, password }) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(getAuth(), login, password);
        } catch (e) {
            alert((e as any) || '');
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!isNil(user)) {
            navigate(routes.HOME.path);
        }
    }, [user]);

    console.log(errors, 'errors');

    return (
        <Container maxWidth="sm" className="flex justify-center items-center h-screen">
            <div>
                {loading && <LinearProgress />}

                <div
                    style={{
                        borderRadius: '8px',
                        border: '1px solid #dadce0',
                        padding: '48px 40px 36px',
                    }}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="login"
                                    control={control}
                                    rules={{
                                        required: 'Wpisz Adres e-mail lub telefon',
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            className="w-full"
                                            {...field}
                                            error={!!errors.login}
                                            label="Adres e-mail lub telefon"
                                            variant="outlined"
                                            helperText={
                                                errors.login?.message && (
                                                    <ErrorLabel message={errors.login.message} />
                                                )
                                            }
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{
                                        required: 'Hasło',
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            type="password"
                                            className="w-full"
                                            {...field}
                                            error={!!errors.password}
                                            label="Wpisz hasło"
                                            variant="outlined"
                                            helperText={
                                                errors.password?.message && (
                                                    <ErrorLabel message={errors.password.message} />
                                                )
                                            }
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item container xs={12} className="justify-end">
                                <Button type="submit" variant="contained">
                                    Dalej
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </Container>
    );
}
