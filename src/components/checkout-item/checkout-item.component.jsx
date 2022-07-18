import { useContext } from 'react';

import { CartContext } from '../../contexts/cart-context.component';

import './checkout-item.styles.scss';

const CheckOutItem = ({cartItem}) => {
    const { clearItemsFromCart, addItemsToCart, removeItemsFromCart } = useContext(CartContext);

    const { imageUrl, name, quantity, price } = cartItem;

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <span className="arrow" onClick={() => removeItemsFromCart(cartItem)}>&#10094;</span>
                <span className="value">{quantity}</span> 
                <span className="arrow" onClick={() => addItemsToCart(cartItem)}>&#10095;</span>
            </span>
            <span className="price">${price}</span>
            <span className="remove-button" onClick={() => clearItemsFromCart(cartItem)}>&#10005;</span>
        </div>
    )
}

export default CheckOutItem;