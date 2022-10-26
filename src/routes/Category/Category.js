import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectCategoriesMap } from "../../store/categories/categories.selectors";

import ProductCard from "../../components/ProductCard/ProductCard";

import "./Category.scss";

const Category = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const { category } = useParams();

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
    </Fragment>
  );
};

export default Category;
