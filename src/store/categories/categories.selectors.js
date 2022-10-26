import { createSelector } from "reselect";

const selectCategoriesReducer = (state) => state.categories;

const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categories) => categories.categoriesArray
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categoriesArray) =>
    categoriesArray.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
