import * as Yup from 'yup';
import { required, tooShort, tooLong, badEmail } from './messages';

export const LoginSchema = Yup.object({
    email: Yup.string().email(badEmail()).required(required('Email')),
    password: Yup.string().min(6, tooShort('Password')).required(required('Password')),
});
