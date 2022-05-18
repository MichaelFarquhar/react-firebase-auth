import * as Yup from 'yup';
import { required, tooShort, tooLong } from './messages';

export const LoginSchema = Yup.object({
    username: Yup.string()
        .min(6, tooShort('Username'))
        .max(50, tooLong('Username'))
        .required(required('Username')),
    password: Yup.string()
        .min(6, tooShort('Password'))
        .max(25, tooLong('Password'))
        .required(required('Password')),
});
