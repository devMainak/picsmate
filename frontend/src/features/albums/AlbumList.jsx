import AlbumLink from "./AlbumLink";

const AlbumList = ({ albums }) => {
  return (
    <div>
      {albums.length ? (
        <div className="grid grid-cols-4 gap-4">
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
