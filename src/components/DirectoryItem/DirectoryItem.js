import { Link } from "react-router-dom";

import "./DirectoryItem.scss";

const DirectoryItem = (props) => {
  const { title, imageUrl } = props.category;

  return (
    <Link className="directory-item-container" to={`shop/${title}`}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </Link>
  );
};

export default DirectoryItem;
