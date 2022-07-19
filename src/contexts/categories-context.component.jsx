import { createContext, useState, useEffect } from "react";

import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap: []
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState([]);
    const value = {categoriesMap};

    // useEffect(() => {
    //     console.log(SHOP_DATA)
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, [])

    useEffect(() => {
        const getProducts = async () => {
            const categoryMap = await getCollectionAndDocuments();
            setCategoriesMap(categoryMap);
        }

        getProducts();
    }, [])

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}