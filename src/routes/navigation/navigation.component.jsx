import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user-context.component';
import { CartContext } from '../../contexts/cart-context.component';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import { 
    NavigationContainer, 
    LogoContainer,
    NavLinks, 
    NavLink 
} from './navigation.styles.jsx';

import { ReactComponent as CrownLogo } from './../../assets/crown.svg';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    
    const handleSignOut = async () => {
        await signOutUser();
    }

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo className='logo' to='/' />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">Shop</NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={handleSignOut}>Sign Out</NavLink>
                        ) : (
                            <NavLink to="/auth">Sign In</NavLink>
                        )
                    }
                    <CartIcon/>
                </NavLinks>
                { isCartOpen && <CartDropdown /> }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;