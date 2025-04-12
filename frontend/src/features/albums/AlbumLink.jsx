import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AlbumLink = ({ album }) => {
  const { images } = useSelector((state) => state.images);
  const albumImages = images.filter((img) => img.albumId._id === album._id);
  const coverImage =
    albumImages.length > 0 ? albumImages[0].imageUrl : album.coverImage;

  return (
    <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-zinc-900">
      <Link to={`/albums/${album._id}`} state={album}>
        <img
          src={coverImage}
          alt={album.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-2">
          <p className="text-sm font-medium text-black dark:text-white truncate">
            {album.title}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default AlbumLink;
