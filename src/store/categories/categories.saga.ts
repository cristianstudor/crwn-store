import { takeLatest, all, call, put } from "typed-redux-saga/macro";

import { getCollectionAndDocuments } from "../../utils/firebase.utils";

import { CATEGORIES_ACTION_TYPES } from "./categories.types";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed
} from "./categories.actions";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(
      getCollectionAndDocuments,
      "categories"
    );
    yield* put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
