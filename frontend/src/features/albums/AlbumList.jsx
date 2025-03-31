import AlbumLink from "./AlbumLink";

const AlbumList = ({ albums }) => {
  return (
    <div>
      {albums.length ? (
        <div className="grid grid-cols-6 gap-2">
          {albums.map((album) => (
            <AlbumLink album={album} />
          ))}
        </div>
      ) : (
        <div>No albums.</div>
      )}
    </div>
  );
};

export default AlbumList;
