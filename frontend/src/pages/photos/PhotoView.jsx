import { useEffect } from "react";
import axios from "axios";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import SidebarLayout from "@/components/sidebar/SidebarLayout";
import { useDispatch } from "react-redux";
import { fetchImagesAsync } from "@/features/images/imagesSlice";

const PhotoView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImagesAsync());
  }, []);


  return (
    <div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Photos
      </h3>
    </div>
  );
};

export default PhotoView;
