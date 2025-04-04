import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AlbumLink = ({ album }) => {
  const { images } = useSelector((state) => state.images);

  const albumImages = images.filter((image) => image.albumId._id === album._id);

  return (
    <div className="py-[5px]">
      <Link to={`/albums/${album._id}`} state={album}>
        <img
          src={
            albumImages.length > 0 ? albumImages[0].imageUrl : album.coverImage
          }
          className="w-230px h-48 rounded-md"
        />
        <p className="text-left max-w-200px">{album.title}</p>
      </Link>
    </div>
  );
};

export default AlbumLink;
