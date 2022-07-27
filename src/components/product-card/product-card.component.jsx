import { useContext } from 'react';

import { CartContext } from '../../contexts/cart-context.component';

import Button, { BUTTON_TYPE } from '../button/button.component';

import './product-card.styles.scss';

const ProductCard = ({product}) => {
    const { addItemsToCart } = useContext(CartContext);
    const { name, price, imageUrl } = product;

    const addProductToCart = () => {
        addItemsToCart(product);
    }

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE.inverted} onClick={addProductToCart}>Add to Cart</Button>
        </div>
    )
}

export default ProductCard;