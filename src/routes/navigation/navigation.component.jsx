import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user-context.component';
import { CartClickContext } from '../../contexts/cart-click-context.component';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

import { ReactComponent as CrownLogo } from './../../assets/crown.svg';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartClickContext);
    
    const handleSignOut = async () => {
        await signOutUser();
    }

    const handleCartClick = () => {
        setIsClicked(!isClicked);
    }

    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrownLogo className='logo' to='/' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to="/shop">Shop</Link>
                    {
                        currentUser ? (
                            <span className='nav-link' onClick={handleSignOut}>Sign Out</span>
                        ) : (
                            <Link className='nav-link' to="/auth">Sign In</Link>
                        )
                    }
                    <CartIcon/>
                </div>
                { isCartOpen && <CartDropdown /> }
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;