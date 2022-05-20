import * as Yup from 'yup';
import { required, tooShort, tooLong, badEmail, noSpaces } from './messages';

export const LoginSchema = Yup.object({
    email: Yup.string().email(badEmail()).required(required('Email')),
    password: Yup.string().min(6, tooShort('Password')).required(required('Password')),
});

export const RegisterSchema = Yup.object({
    email: Yup.string().email(badEmail()).required(required('Email')),
    username: Yup.string()
        .required(required('Username'))
        .min(3, tooShort('Username'))
        .matches(
            /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9])+[a-zA-Z0-9]$/,
            noSpaces('Username')
        )
        .max(25, tooLong('Username')),
    name: Yup.string().max(50, tooLong('Name')),
    password: Yup.string().min(6, tooShort('Password')).required(required('Password')),
    confirmPassword: Yup.string()
        .min(6, tooShort('Confirm Password'))
        .required(required('Confirm Password'))
        .oneOf([Yup.ref('password')], 'Password does not match'),
});
