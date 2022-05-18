import { FC, useState } from 'react';
import { TextField, Stack, Typography, Button, Link, Alert } from '@mui/material';

import { useFormik } from 'formik';
import { LoginSchema } from '../validation/Auth';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';

const formatFirebaseError = (error: any): string => {
    switch (error.code) {
        case 'auth/invalid-email':
            return 'Please enter a valid email.';
        case 'auth/wrong-password':
            return 'The password you entered is incorrect.';
        case 'auth/user-not-found':
            return 'No account found for that email.';
        default:
            return error.message;
    }
};

export const Login: FC = () => {
    const [authError, setAuthError] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((currentUser) => {
                    console.log(currentUser);
                    setAuthError('');
                })
                .catch((err) => setAuthError(formatFirebaseError(err)));
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
                {authError && <Alert severity="error">{authError}</Alert>}
                <Button variant="contained" type="submit">
                    Login
                </Button>
                <Link href="#" sx={{ textAlign: 'left' }}>
                    Register
                </Link>
            </Stack>
        </form>
    );
};
