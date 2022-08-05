import { createContext, useState, useEffect, useReducer } from "react";

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

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'SET_CART_ITEMS':
            return {
                ...state, 
                ...payload
            }
        case 'SET_IS_CART_OPEN':
            return {
                ...state,
                isCartOpen: payload
            }
        default: 
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    totalQuantity: 0,
    totalValue: 0
}

export const CartProvider = ({children}) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [totalQuantity, setTotalQuantity] = useState(0);
    // const [totalValue, setTotalValue] = useState(0);

    const [{
            isCartOpen, 
            cartItems, 
            totalQuantity, 
            totalValue}, dispatchCart] = useReducer(cartReducer, INITIAL_STATE);

    // useEffect(() => {
    //     setTotalQuantity(cartItems.reduce((total, current) => 
    //     total + current.quantity, 0));
    // }, [cartItems])

    // useEffect(() => {
    //     setTotalValue(cartItems.reduce((total, current) => 
    //     total + current.quantity * current.price, 0))
    // }, [cartItems])

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = cartItems.reduce((total, current) => 
        total + current.quantity, 0);

        const newTotalPrice = cartItems.reduce((total, current) => 
        total + current.quantity * current.price, 0);

        dispatchCart({type: 'SET_CART_ITEMS', payload: {
            cartItems: newCartItems, 
            totalQuantity: newCartCount,
            totalValue: newTotalPrice
        }})
    }

    const addItemsToCart = (itemToAdd) => {
        const newCartItems = addCartItem(cartItems, itemToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemsFromCart = (itemToRemove) => {
        const newCartItems = removeCartItems(cartItems, itemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemsFromCart = (itemToRemove) => {
        const newCartItems = cartItems.filter(cartItem => cartItem.id !== itemToRemove.id);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatchCart({type: 'SET_IS_CART_OPEN', payload: bool})
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