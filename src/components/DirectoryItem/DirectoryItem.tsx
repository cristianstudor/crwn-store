import { useNavigate } from "react-router-dom";

import { CategoryDirectory } from "../../routes/Directory/Directory";

import "./DirectoryItem.scss";

type DirectoryItemProps = {
  category: CategoryDirectory;
};

const DirectoryItem = ({ category }: DirectoryItemProps) => {
  const { title, imageUrl, route } = category;
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
