import { FC, useEffect } from 'react';
import { TextField, Stack, Typography, Button, Alert, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import { LoginSchema } from '../validation/Auth';

// Firebase
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    UserCredential,
} from 'firebase/auth';
import { auth, db } from '../firebase/firebase-config';
import { useFirebaseError } from '../firebase/hooks/useFirebaseError';
import { getDocs, collection, query, where } from 'firebase/firestore';

// Redux
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

                    const getUserDoc = async () => {
                        let data = {
                            username: '',
                            name: '',
                        };
                        const usersRef = collection(db, 'users');
                        const q = query(
                            usersRef,
                            where('UID', '==', 'hUtWcTScFodRkDYuuRnejl9W5Hq2')
                        );

                        const querySnapshot = await getDocs(q);
                        // This will only run once
                        querySnapshot.forEach((doc) => {
                            data.username = doc.data().username;
                            data.name = doc.data().name;
                        });

                        // Dispatch all data into the store
                        dispatch(
                            login({
                                email: user.email || '',
                                username: data.username,
                                name: data.name,
                            })
                        );
                        navigate('/profile');
                    };

                    getUserDoc();
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
