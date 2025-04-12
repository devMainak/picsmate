import { Button } from "@/components/ui/button";
import { Heart, Trash, Info, ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addFavouriteImageAsync, deleteImageAsync } from "./imagesSlice";
import { useAuth } from "@/hooks/useAuth";
import ImageDetailsBar from "./ImageDetailsBar";

export default function ImageViewer() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const image = location.state;
  const { user } = useAuth();
  const { images } = useSelector((state) => state.images);
  const currentImage = useMemo(
    () => images.find((pic) => pic._id === image._id),
    [images, image._id]
  );

  const isOwner = currentImage.albumId.owner._id === user._id;

  const handleClickOutside = (event) => {
    if (
      isSidebarOpen &&
      !event.target.closest(".sidebar") &&
      !event.target.closest(".comment-input") &&
      !event.target.closest(".post-btn")
    ) {
      setIsSidebarOpen(false);
    }
  };

  const handleAddFavouriteImage = () => {
    dispatch(
      addFavouriteImageAsync({
        imageId: currentImage._id,
        albumId: currentImage.albumId._id,
      })
    );
  };

  const handleImageDelete = () => {
    dispatch(
      deleteImageAsync({
        imageId: currentImage._id,
        albumId: currentImage.albumId._id,
      })
    );
    navigate(-1);
  };

  return (
    <div
      className="w-full h-screen flex relative bg-zinc-800"
      onClick={handleClickOutside}
    >
      <div className="flex flex-grow justify-center items-center overflow-hidden">
        <img
          src={currentImage.imageUrl}
          alt={currentImage.name}
          className="max-w-full max-h-full object-contain w-auto h-auto"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="text-white" />
          </Button>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {isOwner && (
            <div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleAddFavouriteImage}
              >
                <Heart
                  className={
                    currentImage.isFavourite === true
                      ? "text-red-700 fill-red-700"
                      : "text-red-700"
                  }
                />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleImageDelete}>
                <Trash className="text-yellow-700" />
              </Button>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Info className="text-blue-700" />
          </Button>
        </div>
      </div>
      {isSidebarOpen && <ImageDetailsBar image={currentImage} user={user} />}
    </div>
  );
}
