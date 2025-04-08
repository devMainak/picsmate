import { useLocation, useParams } from "react-router-dom";
import { UploadPictureDialog } from "@/features/images/UploadPictureDialog";
import { useSelector } from "react-redux";
import ImageList from "@/features/images/ImageList";
import ShareAlbumDialog from "@/features/albums/ShareAlbumDialog";

const AlbumDetails = () => {
  const location = useLocation();
  const album = location.state;

  const { images } = useSelector((state) => state.images);
  const { user } = useSelector((state) => state.auth);

  const isOwner = album.owner === user._id ? true : false;
  const albumImages = images.filter(
    (image) => image.albumId?._id === album._id || image.albumId === album._id
  );

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div>
          <h3 className="scroll-m-20 text-left text-2xl font-semibold tracking-tight">
            {album.title}
          </h3>
          <p className="text-left italic">
            {album.description ? album.description : ""}
          </p>
        </div>
        {isOwner && (
          <div className="flex gap-4">
            <div>
              <UploadPictureDialog albumId={album._id} />
            </div>
            <div>
              <ShareAlbumDialog albumId={album._id} />
            </div>
          </div>
        )}
      </div>
      <div>
        <ImageList images={albumImages} />
      </div>
    </div>
  );
};

export default AlbumDetails;
