import { useEffect, useMemo } from "react";
import AlbumList from "@/features/albums/AlbumList";
import { fetchAlbumsAsync } from "@/features/albums/albumsSlice";
import { CreateAlbumDialog } from "@/features/albums/CreateAlbumDialog";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";

const AlbumView = () => {
  const dispatch = useDispatch();

  const { user } = useAuth();

  useEffect(() => {
    dispatch(fetchAlbumsAsync(user));
  }, []);

  const { albums, loading, error } = useSelector((state) => state.albums);

  return (
    <div className="p-[10px]">
      <div className="flex justify-between">
        <div className="scroll-m-20 text-left text-2xl font-semibold tracking-tight pt-5">
          Albums
        </div>
        <div>
          <CreateAlbumDialog />
        </div>
      </div>
      <hr />
      <section className="py-[5px]">
        <AlbumList albums={albums} />
      </section>
    </div>
  );
};

export default AlbumView;
