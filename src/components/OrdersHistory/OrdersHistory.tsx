import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selectors";
import { Order } from "../../utils/firebase.utils";

import OrderRow from "../OrderRow/OrderRow";

import "./OrdersHistory.scss";

const OrdersHistory = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [ordersHistory, setOrdersHistory] = useState([] as Order[]);

  useEffect(() => {
    if (currentUser) {
      setOrdersHistory(currentUser.ordersHistory);
    } else {
      setOrdersHistory([] as Order[]);
    }
  }, [currentUser]);

  return (
    <div className="orders-history-container">
      <h2>Orders history</h2>
      <div className="orders-history-header">
        <div className="header-block">
          <span>Nr.</span>
        </div>
        <div className="header-block">
          <span>Date</span>
        </div>
        <div className="header-block">
          <span>Value</span>
        </div>
        <div className="header-block">
          <span>Completed</span>
        </div>
        <div className="header-block">
          <span>Details</span>
        </div>
      </div>
      {ordersHistory.length === 0 ? (
        <span className="no-orders">No orders to show</span>
      ) : (
        ordersHistory.reduce((acc, order, index) => {
          acc.unshift(<OrderRow key={index} order={order} nr={index + 1} />);
          return acc;
        }, [] as JSX.Element[])
      )}
    </div>
  );
};

export default OrdersHistory;
