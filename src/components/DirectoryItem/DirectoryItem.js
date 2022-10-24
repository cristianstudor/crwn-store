import { useNavigate } from "react-router-dom";

import "./DirectoryItem.scss";

const DirectoryItem = (props) => {
  const { title, imageUrl, route } = props.category;
  const navigate = useNavigate();

  const goToCategoryHandler = () => navigate(route);

  return (
    <div className="directory-item-container" onClick={goToCategoryHandler}>
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
    </div>
  );
};

export default DirectoryItem;
