import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import {
  selectCartItems,
  selectCartTotal
} from "../../store/cart/cart.selectors";
import { selectCurrentUser } from "../../store/user/user.selectors";
import { clearCart } from "../../store/cart/cart.actions";
import { updateUserOrdersHistory } from "../../store/user/user.actions";

import FormInput, {
  FormInputSelectCountries
} from "../../components/FormInput/FormInput";
import Button, { BUTTON_TYPES_CLASSES } from "../../components/Button/Button";

import "./Payment.scss";

const defaultFormFields = {
  billing_name: "",
  city: "",
  country: "",
  address: ""
};

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const amount = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { billing_name, city, country, address } = formFields;

  useEffect(() => {
    if (!amount) navigate("/checkout");
    // eslint-disable-next-line
  }, [amount]);

  useEffect(() => {
    if (currentUser) {
      setFormFields({
        billing_name: currentUser.displayName,
        ...currentUser.userAddress
      });
    } else {
      setFormFields(defaultFormFields);
    }
  }, [currentUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const ordersHistory = currentUser ? currentUser.ordersHistory : {};
    const newOrder = currentUser
      ? {
          date: new Date(),
          total: amount,
          orderItems: cartItems,
          completed: null
        }
      : {};

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ amount: amount * 100 })
    }).then((res) => res.json());

    const { client_secret } = response.paymentIntent;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: billing_name ? billing_name : "Guest",
          address: {
            city: city ? city : "City",
            country: country ? country : "RO",
            line1: address ? address : "street, nr."
          }
        }
      }
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      if (currentUser) {
        ordersHistory.push({ ...newOrder, completed: false });
        dispatch(updateUserOrdersHistory(currentUser, { ordersHistory }));
      }
      alert(paymentResult.error.message);
    }

    if (paymentResult.paymentIntent.status === "succeeded") {
      if (currentUser) {
        ordersHistory.push({ ...newOrder, completed: true });
        dispatch(updateUserOrdersHistory(currentUser, { ordersHistory }));
      }
      alert("Payment Successful");
      dispatch(clearCart());
    }
  };

  return (
    <div className="payment-form-container">
      <form className="form-container" onSubmit={paymentHandler}>
        <h2>Total to pay:</h2>
        <span className="total">{`$${amount}`}</span>
        <h2>Billing address:</h2>
        <FormInput
          label="name"
          type="text"
          onChange={handleChange}
          name="billing_name"
          value={billing_name}
        />
        <FormInputSelectCountries
          label="country"
          type="text"
          onChange={handleChange}
          name="country"
          value={country}
        />
        <FormInput
          label="city"
          type="text"
          onChange={handleChange}
          name="city"
          value={city}
        />
        <FormInput
          label="address"
          type="text"
          onChange={handleChange}
          name="address"
          value={address}
        />
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <br />
        <Button
          disabled={amount === 0 && "disabled"}
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPES_CLASSES.inverted}
        >
          Pay now
        </Button>
      </form>
      <div className="test-warning">
        *Billing address fields are optional*
        <br />
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 12/26 - CVV: 123 - ZIP: 12345
        <br />
        Card expiration date must be bigger than current date
        <br />
        The fields CVV and ZIP can be random numbers
      </div>
    </div>
  );
};

export default Payment;
