import * as Yup from 'yup';
import { required, tooShort, badEmail } from './messages';

export const LoginSchema = Yup.object({
    email: Yup.string().email(badEmail()).required(required('Email')),
    password: Yup.string().min(6, tooShort('Password')).required(required('Password')),
});

export const RegisterSchema = Yup.object({
    email: Yup.string().email(badEmail()).required(required('Email')),
    password: Yup.string().min(6, tooShort('Password')).required(required('Password')),
    confirmPassword: Yup.string()
        .min(6, tooShort('Confirm Password'))
        .required(required('Confirm Password'))
        .oneOf([Yup.ref('password')], 'Password does not match'),
});
