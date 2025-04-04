import { useEffect } from "react";
import axios from "axios";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import SidebarLayout from "@/components/sidebar/SidebarLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchImagesAsync } from "@/features/images/imagesSlice";
import ImageList from "@/features/images/ImageList";
import { UploadPictureDialog } from "@/features/images/UploadPictureDialog";

const PhotoView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImagesAsync());
  }, []);

  const { images } = useSelector((state) => state.images);

  return (
    <div className="p-[10px]">
      <div className="flex justify-between">
        <div className="scroll-m-20 text-2xl text-left font-semibold tracking-tight">
          Photos
        </div>
        <div>
          <UploadPictureDialog />
        </div>
      </div>
      <div>
        <ImageList images={images} />
      </div>
    </div>
  );
};

export default PhotoView;
