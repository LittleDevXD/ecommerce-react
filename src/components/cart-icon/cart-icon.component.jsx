import { useContext } from 'react';

import { CartClickContext } from '../../contexts/cart-click-context.component';

import { ReactComponent as CartIconSvg } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

const CartIcon = ({onClick}) => {
    const { isCartOpen, setIsCartOpen } = useContext(CartClickContext); 

    const toggleCartDropdown = () => setIsCartOpen(!isCartOpen);

    return (
        <div className='cart-icon-container' onClick={toggleCartDropdown}>
            <CartIconSvg className='shopping-icon' />
            <span className='item-count'>0</span>
        </div>
    )
}

export default CartIcon;