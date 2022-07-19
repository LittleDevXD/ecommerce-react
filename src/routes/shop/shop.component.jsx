import { Fragment, useContext } from 'react';

import { Routes, Route } from 'react-router-dom';

import { CategoriesContext } from "../../contexts/categories-context.component";
import Category from '../category/category.component';

import './shop.styles.scss';
import CategoriesPreview from '../categories-preview/categories-preview.component';

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>} />
            <Route path=":category" element={<Category/>} />
        </Routes>
        
    )
}

export default Shop;