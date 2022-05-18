import { FC } from 'react';
import { TextField, Stack, Typography, Button, Link } from '@mui/material';

import { useFormik } from 'formik';
import { LoginSchema } from '../validation/Auth';

export const Login: FC = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            console.log(values);
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
