import CategoryItem from "../category-item/category-item.component"
import './categories-container.styles.scss';

const CategoriesContainer = ({categories}) => {
    return (
        <div className="categories-container">
            {
                categories.map((category) => {
                    return <CategoryItem key={category.id} category={category} />
                })
            }
        </div>
    )
}

export default CategoriesContainer;