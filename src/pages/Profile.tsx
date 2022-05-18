import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Profile: FC = () => {
    return (
        <Stack spacing={3}>
            <Typography variant="h5" component="div">
                Profile
            </Typography>
            <Typography variant="body1">You are not currently logged in.</Typography>
            <Link to="/">Click here to login</Link>
        </Stack>
    );
};
