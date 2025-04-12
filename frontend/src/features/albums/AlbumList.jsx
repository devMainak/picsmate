import AlbumLink from "./AlbumLink";

const AlbumList = ({ albums }) => {
  return (
    <div className="p-4">
      {albums.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {albums.map((album) => (
            <AlbumLink key={album._id} album={album} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12 text-lg">
          No albums found.
        </div>
      )}
    </div>
  );
};

export default AlbumList;
