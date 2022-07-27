import { useState, useContext } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE } from "../button/button.component";
import { signInWithGooglePopUp, signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            await signInUserWithEmailAndPassword(email, password);
            resetFormFields()
        } catch (error) {
            switch(error.code) {
                case 'auth/user-not-found':
                    alert("User with this email does not exist.");
                    break;
                case 'auth/wrong-password':
                    alert("Email or Password is incorrect.");
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const logGoogleUser = async () => {
        await signInWithGooglePopUp();
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
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE.google} onClick={logGoogleUser}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignIn;