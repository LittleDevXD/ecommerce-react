import { useContext } from 'react';

import { CartContext } from '../../contexts/cart-context.component';

import {CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles.jsx';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, totalQuantity } = useContext(CartContext); 

    const toggleCartDropdown = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleCartDropdown}>
            <ShoppingIcon />
            <ItemCount>{totalQuantity}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;