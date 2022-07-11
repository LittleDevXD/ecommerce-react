// import { getRedirectResult } from "firebase/auth";
// import { useEffect } from "react";
import { auth, signInWithGooglePopUp, createUserDocFromAuth, signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './authentication.styles.scss';

const Authentication = () => {
    // useEffect(async () => {
    //     const response = await getRedirectResult(auth);
    //     console.log(response);
    // }, []);

    // const logGoogleRedirectUser = async () => {
    //     const response = await signInWithGoogleRedirect();
    //     console.log(response);
    // }

    return (
        <div className="sign-in-wrapper">
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}

export default Authentication;