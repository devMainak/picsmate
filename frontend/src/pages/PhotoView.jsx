import { useEffect } from "react";
import axios from "axios";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import SidebarLayout from "@/components/sidebar/SidebarLayout";

const PhotoView = () => {
  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:4000/user/profile", {
  //         withCredentials: true,
  //       });

  //       console.log(response.data);
  //     } catch (error) {}
  //   };

  //   fetchUserDetails()
  // });

  return (
    <div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Photos
      </h3>
    </div>
  );
};

export default PhotoView;
