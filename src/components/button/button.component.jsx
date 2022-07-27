import { 
    BaseButton, 
    GoogleSignInButton, 
    InvertedButton 
} from './button.styles.jsx';

export const BUTTON_TYPE = {
    base: 'base',
    inverted: 'inverted',
    google: 'google-sign-in'
}

const getButton = (buttonType = BUTTON_TYPE.base) => {
    return (
        {
            [BUTTON_TYPE.base]: BaseButton,
            [BUTTON_TYPE.inverted]: InvertedButton,
            [BUTTON_TYPE.google]: GoogleSignInButton
        }[buttonType]
    )
}
    
const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    console.log(CustomButton)

    return <CustomButton {...otherProps}> {children} </CustomButton>;
}

export default Button;