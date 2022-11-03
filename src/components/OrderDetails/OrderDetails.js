import "./OrderDetails.scss";

const OrderDetails = ({ orderItems }) => {
  return (
    <div className="order-details-container">
      <div className="order-details-head">
        <span className="id">ID</span>
        <span className="name">Item Name</span>
        <span className="quantity">Quantity</span>
        <span className="price">Unit Price</span>
      </div>
      {orderItems.map((item) => {
        const { id, name, quantity, price } = item;
        return (
          <div key={id} className="order-details-item">
            <span className="id">{`#${id}`}</span>
            <span className="name">{name}</span>
            <span className="quantity">{quantity}</span>
            <span className="price">{`$${price}`}</span>
          </div>
        );
      })}
    </div>
  );
};

export default OrderDetails;
