import { useSelector, useDispatch } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selectors";
import { addItemToCart } from "../../store/cart/cart.actions";
import { CategoryItem } from "../../store/categories/categories.types";

import Button from "../Button/Button";

import "./ProductCard.scss";

type ProductCardProps = {
  product: CategoryItem;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt="product" />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
