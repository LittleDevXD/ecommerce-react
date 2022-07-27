import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart-context.component';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { 
    CartDropdownContainer, 
    EmptyMessage, 
    CartItems 
} from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    const navigate = useNavigate();

    const goToCheckOutHandler = () => {
        navigate('/checkout');
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? 
                    cartItems.map(cartItem => {
                        return (
                            <CartItem key={cartItem.id} cartItem={cartItem}/>
                        )
                    }) : 
                    <EmptyMessage>This cart is empty.</EmptyMessage>
                }
            </CartItems>
            <Button onClick={goToCheckOutHandler}>Go to checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;