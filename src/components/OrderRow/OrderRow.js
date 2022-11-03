import { Fragment, useState } from "react";

import OrderDetails from "../OrderDetails/OrderDetails";

import "./OrderRow.scss";

const OrderRow = ({ order, nr }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { orderItems, completed, date, total } = order;

  const openDetails = () => setIsOpen(isOpen ? false : true);
  return (
    <Fragment>
      <div className="order-row-container">
        <span className="nr">{nr}</span>
        <span className="item">{date.toDate().toUTCString()}</span>
        <span className="item">{`$${total}`}</span>
        <span className="item">{completed ? "yes" : "no"}</span>
        <span className="details" onClick={openDetails}>
          {isOpen ? "Close" : "Open"}
        </span>
      </div>
      {isOpen && <OrderDetails orderItems={orderItems} />}
    </Fragment>
  );
};

export default OrderRow;
