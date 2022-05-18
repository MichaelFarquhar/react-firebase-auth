import { FC } from 'react';
import { TextField, Stack, Typography, Button, Link } from '@mui/material';

export const Login: FC = () => {
    return (
        <form>
            <Stack spacing={3}>
                <Typography variant="h5" component="div">
                    Login
                </Typography>
                <TextField
                    name="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                />
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
