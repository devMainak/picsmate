import { MoreHorizontal, Pencil, Trash, Share2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ImageList from "@/features/images/ImageList";
import { UploadPictureDialog } from "@/features/images/UploadPictureDialog";
// import { UploadPictureDialog } from "@/features/images/UploadPictureDialog";
// import ShareAlbumDialog from "@/features/albums/ShareAlbumDialog";
// import UpdateAlbumDialog from "@/features/albums/UpdateAlbumDialog";

const AlbumDetails = () => {
  const { state: album } = useLocation();
  const { images } = useSelector((state) => state.images);
  const { user } = useSelector((state) => state.auth);

  const isOwner = album.owner === user._id;
  const albumImages = images.filter(
    (img) => img.albumId?._id === album._id || img.albumId === album._id
  );

  const [showUpdate, setShowUpdate] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col">
          <h3 className="text-3xl font-semibold tracking-tight text-left">
            {album.title}
          </h3>
          {album.description && (
            <p className="text-sm text-muted-foreground italic text-left">
              {album.description}
            </p>
          )}
        </div>

        {isOwner && (
          <div className="flex gap-3 items-center">
            {/* Upload Icon Button */}
            <UploadPictureDialog albumId={album._id} />

            {/* Three Dot Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="w-12 h-12 p-3 text-red-600 hover:text-red-700 hover:scale-105 transition-all duration-150"
                  title="Actions"
                >
                  <MoreVertical  className="w-6 h-6 stroke-[2.5]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="shadow-lg rounded-lg">
                <DropdownMenuItem
                  onClick={() => setShowUpdate(true)}
                  className="gap-2 hover:bg-red-50 transition-all"
                >
                  <Pencil className="w-4 h-4 text-red-500" />
                  Update
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowDelete(true)}
                  className="gap-2 hover:bg-red-50 transition-all"
                >
                  <Trash className="w-4 h-4 text-red-500" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowShare(true)}
                  className="gap-2 hover:bg-red-50 transition-all"
                >
                  <Share2 className="w-4 h-4 text-red-500" />
                  Share
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <div>
        {albumImages.length > 0 ? (
          <ImageList images={albumImages} />
        ) : (
          <div className="text-center text-gray-500 py-10 italic">
            No images in this album yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumDetails;
