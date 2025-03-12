import { Link } from "react-router-dom";

const AlbumLink = ({ album }) => {
  return (
    <div className="py-[5px]">
      <Link>
        <img src={album.coverImage} />
        <p className="text-left">{album.title}</p>
      </Link>
    </div>
  );
};

export default AlbumLink;
