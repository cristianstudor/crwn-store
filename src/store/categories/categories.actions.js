import { CATEGORIES_ACTION_TYPES } from "./categories.types";
//import { createActionObject } from "../../utils/reducer.utils";

export const setCategories = (categoriesArray) => {
  return {
    type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
    payload: categoriesArray
  };
};
