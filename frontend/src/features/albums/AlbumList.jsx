const AlbumList = ({ albums }) => {
  return (
    <div>
      {albums.length ? (
        <div className="grid grid-cols-4 gap-4">
          {albums.map((album) => {
            return (
              <div className="py-[5px]">
                <img src={album.coverImage} />
                <p className="text-left">{album.title}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>No albums.</div>
      )}
    </div>
  );
};

export default AlbumList;
