import { CategoryItem } from "../categories/categories.types";
import { CART_ACTION_TYPES, TypeCartItem } from "./cart.types";
import {
  createAction,
  ActionWithPayload,
  withMatcher
} from "../../utils/reducer.utils";

const addCartItem = (
  cartItems: TypeCartItem[],
  productToAdd: CategoryItem
): TypeCartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  const newCartItemToAdd = { ...productToAdd, quantity: 1 };
  return [...cartItems, newCartItemToAdd];
};

const removeCartItem = (
  cartItems: TypeCartItem[],
  cartItemToRemove: TypeCartItem
): TypeCartItem[] => {
  if (cartItemToRemove.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (
  cartItems: TypeCartItem[],
  cartItemToClear: TypeCartItem
): TypeCartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;
export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  TypeCartItem[]
>;

export const setIsCartOpen = withMatcher(
  (boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);
export const setCartItems = withMatcher(
  (cartItems: TypeCartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: TypeCartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: TypeCartItem[],
  cartItemToRemove: TypeCartItem
) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: TypeCartItem[],
  cartItemToClear: TypeCartItem
) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return setCartItems(newCartItems);
};

export const clearCart = () => {
  const newCartItems: TypeCartItem[] = [];
  return setCartItems(newCartItems);
};
