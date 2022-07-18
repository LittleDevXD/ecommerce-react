import { useContext } from 'react';

import { CartContext } from '../../contexts/cart-context.component';

import { ReactComponent as CartIconSvg } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, totalQuantity } = useContext(CartContext); 

    const toggleCartDropdown = () => setIsCartOpen(!isCartOpen);

    return (
        <div className='cart-icon-container' onClick={toggleCartDropdown}>
            <CartIconSvg className='shopping-icon' />
            <span className='item-count'>{totalQuantity}</span>
        </div>
    )
}

export default CartIcon;