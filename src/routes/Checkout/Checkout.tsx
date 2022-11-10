import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectCartItems,
  selectCartTotal
} from "../../store/cart/cart.selectors";

import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import Button from "../../components/Button/Button";

import "./Checkout.scss";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const navigate = useNavigate();

  const goToPaymentHandler = () => navigate("/payment");

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
      <span className="total">Total: ${cartTotal}</span>
      {cartTotal > 0 && (
        <Button onClick={goToPaymentHandler}>Go to payment</Button>
      )}
    </div>
  );
};

export default Checkout;
