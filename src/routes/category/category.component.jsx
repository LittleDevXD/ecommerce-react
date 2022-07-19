import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories-context.component';

import './category.styles.scss';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <Fragment>
            <h2>{category.toUpperCase()}</h2>
            <div className="c-container">
            {
                products && 
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
            </div>
        </Fragment>  
    )
}

export default Category;