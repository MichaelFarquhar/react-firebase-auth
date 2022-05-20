import { FirebaseError } from 'firebase/app';
import { useState } from 'react';

export const useFirebaseError = (initialError: string) => {
    const [firebaseError, setError] = useState(initialError);

    const setFirebaseError = (error: FirebaseError) => {
        let errorString = '';
        switch (error.code) {
            case 'email-already-in-use':
                errorString = 'Email already in use.';
                break;
            case 'auth/invalid-email':
                errorString = 'Please enter a valid email.';
                break;
            case 'auth/wrong-password':
                errorString = 'The password you entered is incorrect.';
                break;
            case 'auth/user-not-found':
                errorString = 'No account found for that email.';
                break;
            default:
                errorString = error.message;
        }
        setError(errorString);
    };

    return [firebaseError, setFirebaseError] as const;
};
