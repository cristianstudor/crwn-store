import { Fragment, useState } from "react";
import { Order } from "../../utils/firebase.utils";

import OrderDetails from "../OrderDetails/OrderDetails";

import "./OrderRow.scss";

type OrderRowProps = {
  order: Order;
  nr: number;
};

const OrderRow = ({ order, nr }: OrderRowProps) => {
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
