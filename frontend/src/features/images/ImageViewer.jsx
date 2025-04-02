import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Trash, Info, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ImageViewer() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const image = location.state;

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  const handleClickOutside = (event) => {
    if (isSidebarOpen && !event.target.closest(".sidebar")) {
      setIsSidebarOpen(false);
    }
  };

  console.log(image);

  return (
    <div
      className="w-full h-screen flex relative bg-black"
      onClick={handleClickOutside}
    >
      {/* Image Container */}
      <div className="flex flex-grow justify-center items-center overflow-hidden">
        <img
          src={image.imageUrl}
          alt={image.name}
          className="max-w-full max-h-full object-contain w-auto h-auto"
        />

        {/* Action Buttons */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="text-white" />
          </Button>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="ghost" size="icon">
            <Heart className="text-red-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash className="text-gray-700" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Info className="text-blue-500" />
          </Button>
        </div>
      </div>

      {/* Sidebar for Metadata & Comments */}
      {isSidebarOpen && (
        <div className="w-80 bg-white p-4 overflow-y-auto shadow-lg h-full absolute right-0 top-0">
          <h2 className="text-lg font-semibold text-left">{image.name}</h2>
          <p className="text-left">
            <strong>Uploaded By:</strong> {image.albumId.owner.name}
          </p>
          <p className="text-left">
            <strong>Album:</strong> {image.albumId.title}
          </p>
          <p className="text-left">
            <strong>Date:</strong> {image.createdAt}
          </p>
          <p className="text-left">
            <strong>Size:</strong> {`${image.size} MB`}
          </p>
          <hr />
          <h3 className="mt-4 text-lg font-semibold">Comments</h3>
          <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
            {comments.map((c, index) => (
              <div key={index} className="p-2 bg-gray-100 rounded-md">
                {c}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button onClick={handleCommentSubmit}>Post</Button>
          </div>
        </div>
      )}
    </div>
  );
}
