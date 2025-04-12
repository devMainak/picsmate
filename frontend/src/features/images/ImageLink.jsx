import { Link } from "react-router-dom";

const ImageLink = ({ image }) => {
  return (
    <div>
      <Link to={`/photos/${image._id}`} state={image}>
        <img
          src={image.imageUrl}
          alt="Image"
          className="w-full h-60 object-cover rounded-sm"
        />
      </Link>
    </div>
  );
};

export default ImageLink;
