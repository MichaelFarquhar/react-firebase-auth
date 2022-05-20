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
import { auth, db } from '../firebase/firebase-config';
import { addDoc, collection } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebaseError } from '../firebase/hooks/useFirebaseError';

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
    const [firebaseError, setFirebaseError] = useFirebaseError('');

    const userCollectionRef = collection(db, 'users');

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            name: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: (values) => {
            createUserWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    const userId = userCredential.user.uid;

                    // After creating, we want to add username, name and email to firestore linked with UID
                    const addUserInfo = async () => {
                        await addDoc(userCollectionRef, {
                            UID: userId,
                            username: values.username,
                            email: values.email,
                            name: values.name || '',
                        });
                        setRegisterComplete(true);
                        // Firebase automatically logs in after create account and we don't want that:
                        signOut(auth);
                    };

                    addUserInfo();
                })
                .catch((err) => setFirebaseError(err));
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
                            name="username"
                            label="Username"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            error={
                                formik.touched.username && Boolean(formik.errors.username)
                            }
                            helperText={formik.touched.username && formik.errors.username}
                            fullWidth
                        />
                        <TextField
                            name="name"
                            label="Name"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={
                                formik.touched.name ? formik.errors.name : 'Optional'
                            }
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
                        {firebaseError && <Alert severity="error">{firebaseError}</Alert>}
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
