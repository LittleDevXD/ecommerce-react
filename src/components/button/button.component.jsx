import './button.styles.scss';

const BUTTON_TYPE = {
    inverted: 'inverted',
    google: 'google-sign-in'
}

const Button = ({ children, buttonType, ...otherProps }) => {
    return (
        <button 
            className={`${buttonType && BUTTON_TYPE[buttonType]} button-container`}
            {...otherProps}
        >                
            {children}
        </button>
    )
}

export default Button;