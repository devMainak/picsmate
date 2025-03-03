import { useEffect } from "react";
import axios from "axios";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import SidebarLayout from "@/components/sidebar/SidebarLayout";

const Profile = () => {
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
      <SidebarLayout />
    </div>
  );
};

export default Profile;
