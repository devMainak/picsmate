import { useState } from "react";
import ImageViewer from "./ImageViewer";

const ImageLink = ({ image }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div className="py-[5px]">
      <div onClick={() => setIsDialogOpen(true)}>
        <img
          src={image.imageUrl}
          className="w-250px h-48 rounded-md rounded-md"
        />
      </div>
      {isDialogOpen && (
        <ImageViewer
          image={image}
          isOpen={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default ImageLink;
