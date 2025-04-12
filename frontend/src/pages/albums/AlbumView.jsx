import { useEffect, useState } from "react";
import AlbumList from "@/features/albums/AlbumList";
import { fetchAlbumsAsync } from "@/features/albums/albumsSlice";
import { CreateAlbumDialog } from "@/features/albums/CreateAlbumDialog";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { AlbumFilterSelect } from "@/features/albums/AlbumFilterSelect";

const AlbumView = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { albums, filter, loading } = useSelector((state) => state.albums);

  const [showAlbums, setShowAlbums] = useState(albums || []);

  const handleAlbumFilter = () => {
    if (!albums) return;

    if (filter !== "all") {
      if (filter === "own") {
        const userAlbums = albums.filter((album) => album.owner === user._id);
        setShowAlbums(userAlbums);
        return;
      } else {
        const sharedAlbums = albums.filter((album) => album.owner !== user._id);
        setShowAlbums(sharedAlbums);
        return;
      }
    }
    setShowAlbums(albums);
  };

  useEffect(() => {
    dispatch(fetchAlbumsAsync(user));
  }, [dispatch, user]);

  useEffect(() => {
    handleAlbumFilter();
  }, [filter, albums]);

  return (
    <div className="p-[10px] px-[2rem]">
      <div className="flex justify-between pb-[10px]">
        <div className="flex gap-3">
          <div className="scroll-m-20 text-left text-3xl font-semibold tracking-tight">
            Albums
          </div>
          <div>
            <AlbumFilterSelect />
          </div>
        </div>
        <div>
          <CreateAlbumDialog />
        </div>
      </div>
      <hr />
      <section className="py-[5px]">
        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-200 border-t-red-600"></div>
          </div>
        ) : (
          <AlbumList albums={showAlbums} />
        )}
      </section>
    </div>
  );
};

export default AlbumView;
