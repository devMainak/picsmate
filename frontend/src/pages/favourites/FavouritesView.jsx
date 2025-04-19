import ImageList from "@/features/images/ImageList";
import { useAuth } from "@/hooks/useAuth";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const FavouritesView = () => {
  const { user } = useAuth();
  const { images } = useSelector((state) => state.images);
  const userImages = images.filter(
    (image) =>
      user._id === image.albumId.owner._id ||
      image.albumId.accessList.includes(user.email)
  );
  const favouriteImages = useMemo(
    () => userImages.filter((image) => image.isFavourite),
    [images]
  );
  return (
    <div className="p-[10px] px-[2rem]">
      <h3 className="scroll-m-20 text-left text-3xl font-semibold tracking-tight pb-[10px]">
        Favourite Photos
      </h3>
      <div>
        <ImageList images={favouriteImages} />
      </div>
    </div>
  );
};

export default FavouritesView;
