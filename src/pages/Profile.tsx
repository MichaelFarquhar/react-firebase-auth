import { FC, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';

interface User {
    email: string;
}

export const Profile: FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        email: '',
    });

    const logout = () => {
        signOut(auth).then(() => {
            navigate('/');
        });
    };

    onAuthStateChanged(auth, (user: any) => {
        if (user) {
            setUser(user);
        } else {
            setUser({
                email: '',
            });
        }
    });

    return (
        <Stack spacing={3}>
            <Typography variant="h5" component="div">
                Profile
            </Typography>
            <Typography variant="body1">
                {user.email
                    ? `You are currently logged in as: ${user.email}`
                    : 'You are not currently logged in.'}
            </Typography>
            {user.email ? (
                <Button variant="contained" onClick={() => logout()}>
                    Logout
                </Button>
            ) : (
                <Link to="/">Click here to login</Link>
            )}
        </Stack>
    );
};
