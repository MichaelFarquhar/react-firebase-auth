import { FC, useEffect } from 'react';
import { TextField, Stack, Typography, Button, Alert, Box } from '@mui/material';

import { useFormik } from 'formik';
import { LoginSchema } from '../validation/Auth';

import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    UserCredential,
} from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { useFirebaseError } from '../firebase/hooks/useFirebaseError';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { login } from '../store/user/userSlice';

export const Login: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [firebaseError, setFirebaseError] = useFirebaseError('');

    // If logged in, skip login form and go to profile
    useEffect(() => {
        const onAuth = onAuthStateChanged(auth, (user: any) => {
            if (user) {
                navigate('/profile');
            }
        });

        return onAuth;
    });

    // Setup form
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential: UserCredential) => {
                    const user = userCredential.user;
                    dispatch(
                        login({
                            email: user.email || '',
                        })
                    );
                    navigate('/profile');
                })
                .catch((err) => setFirebaseError(err));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
                <Typography variant="h5" component="div">
                    Login
                </Typography>
                <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                />
                <TextField
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    fullWidth
                />
                {firebaseError && <Alert severity="error">{firebaseError}</Alert>}
                <Button variant="contained" type="submit">
                    Login
                </Button>
                <Box sx={{ textAlign: 'left' }}>
                    <Link to="/register">Register</Link>
                </Box>
            </Stack>
        </form>
    );
};
