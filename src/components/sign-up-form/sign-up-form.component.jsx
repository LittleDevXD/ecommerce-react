import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () => {
    const [formFieldInputs, setFormFieldInputs] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFieldInputs;

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
            console.log(user)
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') alert('Email already in use.')
            console.log("error creating user", error)
        }
    }

    return (
        <div>
            <h1>Sign Up With Email or Google</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type='text' required name='displayName' onChange={handleChange} value={displayName}/>

                <label>Email</label>
                <input type='email' required name='email' onChange={handleChange} value={email}/>

                <label>Password</label>
                <input type='password' required name='password' onChange={handleChange} value={password}/>

                <label>Confirm Password</label>
                <input type='password' required name='confirmPassword' onChange={handleChange} value={confirmPassword}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default SignUp;