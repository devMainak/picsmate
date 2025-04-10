import { Link } from "react-router-dom";

const ImageLink = ({ image }) => {
  return (
    <div className="py-[5px]">
      <div>
        <Link to={`/photos/${image._id}`} state={image}>
          <img
            src={image.imageUrl}
            className="min-w-250px h-48 rounded-md rounded-md"
          />
        </Link>
      </div>
    </div>
  );
};

export default ImageLink;
