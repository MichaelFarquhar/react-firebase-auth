# React + Firebase Authentication

A small user authentication app built with TypeScript React using Firebase. This system will be used in a larger site that I will be building which will require user authentication. This app has the bare minimum features of user authentication which includes registering a new user, logging in and logging out.

This app was built to gain experience in packages I have little experience in, particularly TypeScript, Firebase and Redux Toolkit. While Redux is not needed for this app in particular, any implementation of this authentication will most likely be using Redux.

This app is built with the following:

-   **React Typescript**, bootstrapped with Create React App
-   **Firebase Authentication & Firestore**
    -   (Firebase Authentication only stores an email and password so I used Firestore to handle the storage of Username and Name fields as well.)
-   **Material UI** as my component library.
-   **Redux Toolkit** to store user data in state after they log in
-   **React Router** to handle page routing
-   **Formik and Yup** to handle forms and validation.

### Login Test Account

-   Email: test@test.ca
-   **Password**: password

### Routes

| /         | Login page or redirect to [ /profile ] if already logged in. |
| --------- | ------------------------------------------------------------ |
| /register | Register page.                                               |
| /profile  | Profile page                                                 |
