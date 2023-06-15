import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectIsCartOpen,
  selectCartItems
} from "../../store/cart/cart.selectors";
import { setIsCartOpen } from "../../store/cart/cart.actions";

import Button from "../Button/Button";
import CartItem from "../CartItem/CartItem";

import "./CartDropdown.scss";
import { useCallback } from "react";

const CartDropdown = () => {
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const goToCheckoutHandler = useCallback(() => navigate("/checkout"), []);
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  const onClickHandler = () => {
    goToCheckoutHandler();
    toggleIsCartOpen();
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <span>Your cart is empty</span>
        )}
      </div>
      <Button onClick={onClickHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
