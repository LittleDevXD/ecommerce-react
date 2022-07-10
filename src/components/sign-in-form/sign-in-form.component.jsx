import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { signInWithGooglePopUp, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const submitHandler = (event) => {
        event.preventDefault();
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopUp();
        const user = await createUserDocFromAuth(response.user);
        console.log(user)
    }
    
    return (
        <div  className="sign-in-container">
            <h2>I already have an account</h2>
            <p>Sign In with Email or Google</p>
            <form onSubmit={submitHandler}>
                <FormInput 
                    label="Email"
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                    value={email}
                />

                <FormInput 
                    label="Password"
                    type="password"
                    name="password"
                    required
                    onChange={handleChange}
                    value={password}
                />
                <Button type="submit">Sign In</Button>
                <Button buttonType="google" onClick={logGoogleUser}>Sign In With Google</Button>
            </form>
        </div>
    )
}

export default SignIn;