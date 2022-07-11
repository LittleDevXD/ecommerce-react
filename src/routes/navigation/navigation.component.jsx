import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { UserContext } from '../../contexts/user-context.component';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

import { ReactComponent as CrownLogo } from './../../assets/crown.svg';

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    
    const handleSignOut = async () => {
        const user = await signOutUser();
        setCurrentUser(null);
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
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;