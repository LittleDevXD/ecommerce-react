import { createContext, useState, useEffect } from "react";

// Add items to cart helper func
const addCartItem = (cartItems, itemToAdd) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === itemToAdd.id);

    if (existingItem) {
        return cartItems.map(cartItem => {
            return cartItem.id === existingItem.id ? 
            {...cartItem, quantity: cartItem.quantity + 1} : cartItem;
        })
    }

    return [...cartItems, {...itemToAdd, quantity: 1}];
}

// Remove items from cart helper func
const removeCartItems = (cartItems, itemToRemove) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === itemToRemove.id);

    if (existingItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== existingItem.id);
    }

    return cartItems.map(cartItem => {
        return cartItem.id === existingItem.id ?
        {...cartItem, quantity: cartItem.quantity - 1} :
        cartItem
    })
}    

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => false,
    cartItems: [],
    addItemstoCart: () => {},
    totalQuantity: 0,
    removeItemsFromCart: () => {},
    clearItemsFromCart: () => {},
    totalValue: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        setTotalQuantity(cartItems.reduce((total, current) => 
        total + current.quantity, 0));
    }, [cartItems])

    useEffect(() => {
        setTotalValue(cartItems.reduce((total, current) => 
        total + current.quantity * current.price, 0))
    }, [cartItems])

    const addItemsToCart = (itemToAdd) => {
        setCartItems(addCartItem(cartItems, itemToAdd));
    }

    const removeItemsFromCart = (itemToRemove) => {
        setCartItems(removeCartItems(cartItems, itemToRemove));
    }

    const clearItemsFromCart = (itemToRemove) => {
        setCartItems(cartItems.filter(cartItem => cartItem.id !== itemToRemove.id));
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemsToCart, 
        cartItems, 
        totalQuantity, 
        removeItemsFromCart,
        clearItemsFromCart,
        totalValue
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}