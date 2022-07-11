import { useState, useContext } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from '../../utils/firebase/firebase.utils';

import { UserContext } from '../../contexts/user-context.component';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFieldInputs, setFormFieldInputs] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFieldInputs;

    const { setCurrentUser } = useContext(UserContext);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFieldInputs((prevFormField) => {
            console.log(formFieldInputs)
            return {
                ...prevFormField,
                [name]: value,
            }
        })
    }

    const resetFormFields = () => {
        setFormFieldInputs(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            alert("Passwords do not match.")
            return;
        }

        try {
            const response = await createAuthUserWithEmailAndPassword(email, password);
            
            const user = await createUserDocFromAuth(response.user, {displayName});
            setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') alert('Email already in use.')
            console.log("error creating user", error)
        }
    }

    return (
        <div className='sign-up-container'>
            <h2>I don't have an account.</h2>
            <p>Sign Up With Email or Google</p>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type='text' 
                    required 
                    name='displayName' 
                    onChange={handleChange} 
                    value={displayName}
                />

                <FormInput 
                    label="Email"
                    type='email' 
                    required 
                    name='email' 
                    onChange={handleChange} 
                    value={email}
                />

                <FormInput 
                    label="Password"
                    type='password' 
                    required 
                    name='password' 
                    onChange={handleChange} 
                    value={password}
                />

                <FormInput 
                    label="Confirm Password"
                    type='password' 
                    required 
                    name='confirmPassword' 
                    onChange={handleChange} 
                    value={confirmPassword}
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;