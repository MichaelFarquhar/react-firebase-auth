# React + Firebase Authentication

A basic user authentication app built with TypeScript React using Firebase. This system can be used in other projects that also utilize Material UI and Redux. This app includes the bare minimum features of user authentication, such as registering a new user, logging in and logging out.

This app was built to gain experience in packages I have little experience in, particularly TypeScript, Firebase and Redux Toolkit.

This app is built with the following packages:

-   **React Typescript**, bootstrapped with Create React App
-   **Firebase Authentication & Firestore**
    -   (Firebase Authentication only stores an email and password so I used Firestore to handle the storage of Username and Name fields as well.)
-   **Material UI** as my component library.
-   **Redux Toolkit** to store user data in state after they log in
-   **React Router** to handle page routing
-   **Formik and Yup** to handle forms and validation.

---

### Live Demo On Netlify
- [View Demo](https://react-firebase-authenticator.netlify.app/)

### Demo Test Account

-   Email: test@test.ca
-   **Password**: password

### Routes

| /         | Login page or redirect to [ /profile ] if already logged in. |
| --------- | ------------------------------------------------------------ |
| /register | Register page.                                               |
| /profile  | Profile page                                                 |
