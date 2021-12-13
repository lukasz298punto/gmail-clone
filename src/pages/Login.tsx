import {
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    LinearProgress,
    Link,
    TextField as MuiTextField,
    Typography,
} from '@mui/material';
import { useGlobalState } from 'constants/store';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { isNil } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { routes } from 'constants/routes';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';
import { styled } from '@mui/system';
import { ReactComponent as Logo } from 'static/images/google-logo.svg';
import clsx from 'clsx';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type FormValues = {
    login: string;
    password: string;
    passwordVisible: boolean;
};

function ErrorLabel({ message }: { message: string }) {
    return (
        <>
            <ErrorIcon className="mr-2 w-4 h-4" />
            <span>{message}</span>
        </>
    );
}

const Section = styled('div')(({ theme }) => ({
    borderRadius: '8px',
    border: `1px solid ${theme.palette.neutral.main}`,
    padding: '48px 40px 36px',
    width: '450px',
}));

const TextField = styled(MuiTextField)`
    &&&& .MuiFormHelperText-contained {
        margin-left: 0px;
    }
`;

export default function Login() {
    const {
        handleSubmit,
        control,
        trigger,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: { login: '', password: '', passwordVisible: false },
        reValidateMode: 'onSubmit',
    });
    const [user] = useGlobalState('user');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<1 | 2>(1);
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

    return (
        <Container maxWidth="sm" className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {loading && <LinearProgress />}
                    <Section>
                        <div>
                            <Logo className="w-full" />
                            <Typography
                                variant="h1"
                                className="text-2xl text-center pt-4 font-normal"
                            >
                                {step === 2 ? 'Witamy' : 'Zaloguj się'}
                            </Typography>
                            <span className="inline-block w-full text-center pt-2">
                                {step === 2 ? (
                                    <Button
                                        onClick={() => setStep(1)}
                                        sx={{
                                            borderRadius: '16px',
                                            color: 'neutral.dark',
                                            borderColor: 'neutral.main',
                                            '&:hover': {
                                                borderColor: 'neutral.main',
                                                backgroundColor: 'neutral.light',
                                            },
                                        }}
                                        variant="outlined"
                                        startIcon={<AccountCircleIcon />}
                                        endIcon={<KeyboardArrowDownIcon />}
                                    >
                                        {watch('login')}
                                    </Button>
                                ) : (
                                    'Otwórz Gmaila'
                                )}
                            </span>
                        </div>
                        <div className="pt-10">
                            <Grid container spacing={2}>
                                <Grid item xs={12} className={clsx(step === 2 && 'hidden')}>
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
                                                        <ErrorLabel
                                                            message={errors.login.message}
                                                        />
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                    <Link
                                        href="https://"
                                        component="button"
                                        variant="body2"
                                        underline="none"
                                        className="font-medium"
                                        onClick={() => {
                                            console.info("I'm a button.");
                                        }}
                                    >
                                        Nie pamiętasz adresu?
                                    </Link>
                                </Grid>
                                {step === 2 && (
                                    <Grid item xs={12}>
                                        <Controller
                                            name="password"
                                            control={control}
                                            rules={{
                                                required: 'Hasło',
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    type={
                                                        watch('passwordVisible')
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    className="w-full"
                                                    {...field}
                                                    error={!!errors.password}
                                                    label="Wpisz hasło"
                                                    variant="outlined"
                                                    helperText={
                                                        errors.password?.message && (
                                                            <ErrorLabel
                                                                message={errors.password.message}
                                                            />
                                                        )
                                                    }
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}

                                {step === 2 && (
                                    <Grid item xs={12} className="pt-0 pb-7">
                                        <Controller
                                            name="passwordVisible"
                                            control={control}
                                            render={({ field }) => (
                                                <FormControlLabel
                                                    control={<Checkbox {...field} />}
                                                    label="Pokaż hasło"
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                                {step === 1 && (
                                    <Grid item xs={12} className="py-6">
                                        <span className="text-sm">
                                            To nie Twój komputer? Aby zalogować się prywatnie, użyj
                                            trybu gościa.
                                            <Link
                                                href="https://"
                                                underline="none"
                                                className="font-medium"
                                            >
                                                Dowiedz się więcej
                                            </Link>
                                        </span>
                                    </Grid>
                                )}
                                <Grid item container xs={12} className="justify-between -ml-2">
                                    <Button type="submit" variant="text" className="normal-case">
                                        {step === 1 ? 'Utwórz konto' : 'Nie pamiętasz hasła'}
                                    </Button>
                                    <Button
                                        onClick={async () => {
                                            if (step === 1) {
                                                const res = await trigger('login');

                                                if (res) {
                                                    setStep(2);
                                                }
                                            }

                                            if (step === 2) {
                                                handleSubmit(onSubmit)();
                                            }
                                        }}
                                        variant="contained"
                                        className="normal-case"
                                    >
                                        Dalej
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Section>
                </div>
            </form>
        </Container>
    );
}
