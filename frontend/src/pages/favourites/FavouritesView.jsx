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
