import { createContext, useState } from "react";

export const CartClickContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => false
})

export const CartClickProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = {isCartOpen, setIsCartOpen};

    return (
        <CartClickContext.Provider value={value}>
            {children}
        </CartClickContext.Provider>
    )
}