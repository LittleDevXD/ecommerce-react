// import { getRedirectResult } from "firebase/auth";
// import { useEffect } from "react";
import { auth, signInWithGooglePopUp, createUserDocFromAuth, signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils";
import SignUp from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
    // useEffect(async () => {
    //     const response = await getRedirectResult(auth);
    //     console.log(response);
    // }, []);

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopUp();
        const userDoc = await createUserDocFromAuth(response.user);
    }

    // const logGoogleRedirectUser = async () => {
    //     const response = await signInWithGoogleRedirect();
    //     console.log(response);
    // }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google</button>
            <SignUp/>
        </div>
    )
}

export default SignIn;