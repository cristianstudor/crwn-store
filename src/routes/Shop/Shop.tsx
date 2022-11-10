import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { fetchCategoriesStart } from "../../store/categories/categories.actions";

import CategoriesPreview from "../CategoriesPreview/CategoriesPreview";
import Category from "../Category/Category";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
    // eslint-disable-next-line
  }, []); // wrong dispatch dependency error, dispatch never changes

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
