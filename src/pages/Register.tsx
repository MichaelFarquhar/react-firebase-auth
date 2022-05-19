import React, { FC, useState } from 'react';
import {
    TextField,
    Stack,
    Typography,
    Button,
    Alert,
    Box,
    IconButton,
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useFormik } from 'formik';
import { RegisterSchema } from '../validation/Auth';

import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { Link, useNavigate } from 'react-router-dom';

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

const RegisterComplete = () => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <Alert severity="success">
                You account has been successfullly registered. Click the button below to
                proceed to the login page.
            </Alert>
            <Button variant="contained" onClick={() => navigate('/')}>
                Proceed To Login
            </Button>
        </React.Fragment>
    );
};

export const Register: FC = () => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] = useState(false);
    const [registerComplete, setRegisterComplete] = useState(false);
    const [authError, setAuthError] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: (values) => {
            createUserWithEmailAndPassword(auth, values.email, values.password)
                .then(() => {
                    setRegisterComplete(true);
                    // Firebase automatically logs in after create account and we don't want that:
                    signOut(auth);
                })
                .catch((err) => setAuthError(formatFirebaseError(err)));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
                {registerComplete ? (
                    <RegisterComplete />
                ) : (
                    <React.Fragment>
                        <Typography variant="h5" component="div">
                            Register
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
                            type={passwordIsVisible ? 'text' : 'password'}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            error={
                                formik.touched.password && Boolean(formik.errors.password)
                            }
                            helperText={formik.touched.password && formik.errors.password}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                        onClick={() =>
                                            setPasswordIsVisible((pass) => !pass)
                                        }
                                    >
                                        {passwordIsVisible ? (
                                            <VisibilityOffIcon />
                                        ) : (
                                            <VisibilityIcon />
                                        )}
                                    </IconButton>
                                ),
                            }}
                        />
                        <TextField
                            name="confirmPassword"
                            label="Confirm Password"
                            variant="outlined"
                            type={confirmPasswordIsVisible ? 'text' : 'password'}
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                            error={
                                formik.touched.confirmPassword &&
                                Boolean(formik.errors.confirmPassword)
                            }
                            helperText={
                                formik.touched.confirmPassword &&
                                formik.errors.confirmPassword
                            }
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                        onClick={() =>
                                            setConfirmPasswordIsVisible((pass) => !pass)
                                        }
                                    >
                                        {confirmPasswordIsVisible ? (
                                            <VisibilityOffIcon />
                                        ) : (
                                            <VisibilityIcon />
                                        )}
                                    </IconButton>
                                ),
                            }}
                        />
                        {authError && <Alert severity="error">{authError}</Alert>}
                        <Button variant="contained" type="submit">
                            Register
                        </Button>
                        <Box sx={{ textAlign: 'left' }}>
                            <Link to="/">Login</Link>
                        </Box>
                    </React.Fragment>
                )}
            </Stack>
        </form>
    );
};
