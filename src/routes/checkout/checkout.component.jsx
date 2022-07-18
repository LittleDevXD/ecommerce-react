import { useContext } from 'react';

import CheckOutItem from '../../components/checkout-item/checkout-item.component';

import { CartContext } from '../../contexts/cart-context.component';

import './checkout.styles.scss';

const CheckOut = () => {
    const { cartItems, totalValue } = useContext(CartContext);

    return (
        <div className='checkout-container'>
            <div className="checkout-header">
                <div className="header-block">
                    Product
                </div>
                <div className="header-block">
                    Description
                </div>
                <div className="header-block">
                    Quantity
                </div>
                <div className="header-block">
                    Price
                </div>
                <div className="header-block">
                    Remove
                </div>
            </div>
            {
                cartItems.map(cartItem => 
                    <CheckOutItem key={cartItem.id} cartItem={cartItem} />
                )
            }
            <span className='total'>Total : ${totalValue}</span>
        </div>
    )
}

export default CheckOut;