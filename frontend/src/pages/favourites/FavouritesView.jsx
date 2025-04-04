import ImageList from "@/features/images/ImageList";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const FavouritesView = () => {
  const { images } = useSelector((state) => state.images);
  const favouriteImages = useMemo(
    () => images.filter((image) => image.isFavourite),
    [images]
  );
  return (
    <div className="p-[15px]">
      <h3 className="scroll-m-20 text-left text-2xl font-semibold tracking-tight pt-5">
        Favourite Photos
      </h3>
      <div>
        <ImageList images={favouriteImages} />
      </div>
    </div>
  );
};

export default FavouritesView;
