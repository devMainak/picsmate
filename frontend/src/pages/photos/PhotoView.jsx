import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImagesAsync } from "@/features/images/imagesSlice";
import ImageList from "@/features/images/ImageList";
import { UploadPictureDialog } from "@/features/images/UploadPictureDialog";
import { fetchAlbumsAsync } from "@/features/albums/albumsSlice";
import { useAuth } from "@/hooks/useAuth";

const PhotoView = () => {
  const dispatch = useDispatch();
  const { searchMode } = useSelector((state) => state.images);

  useEffect(() => {
    if (!searchMode) {
      dispatch(fetchImagesAsync());
    }
    dispatch(fetchAlbumsAsync());
  }, [dispatch]);

  const { images } = useSelector((state) => state.images);
  const { user } = useAuth();

  const userImages = images.filter(
    (image) =>
      user._id === image.albumId.owner._id ||
      image.albumId.accessList.includes(user.email)
  );

  return (
    <div className="p-[10px] px-[2rem]">
      <div className="flex justify-between pb-[10px]">
        <div className="scroll-m-20 text-3xl text-left font-semibold tracking-tight">
          Photos
        </div>
        <div>
          <UploadPictureDialog />
        </div>
      </div>
      <div>
        <ImageList images={userImages} />
      </div>
    </div>
  );
};

export default PhotoView;
