import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Trash, Info, ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addCommentAsync, addFavouriteImageAsync } from "./imagesSlice";

export default function ImageViewer() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const image = location.state;
  const { user } = useSelector((state) => state.auth);
  const { images } = useSelector((state) => state.images);
  const currentImage = useMemo(
    () => images.find((pic) => pic._id === image._id),
    [images, image._id]
  );

  const handleCommentSubmit = () => {
    if (comment) {
      const newComment = {
        owner: {
          name: user.name,
          profilePic: user.profilePicture,
        },
        comment,
      };
      dispatch(
        addCommentAsync({
          albumId: currentImage.albumId._id,
          comment: newComment,
          imageId: currentImage._id,
        })
      );
      setComment("");
    }
  };

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

  return (
    <div
      className="w-full h-screen flex relative bg-black"
      onClick={handleClickOutside}
    >
      {/* currentImage Container */}
      <div className="flex flex-grow justify-center items-center overflow-hidden">
        <img
          src={currentImage.imageUrl}
          alt={currentImage.name}
          className="max-w-full max-h-full object-contain w-auto h-auto"
        />

        {/* Action Buttons */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="text-white" />
          </Button>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="ghost" size="icon" onClick={handleAddFavouriteImage}>
            <Heart
              className={
                currentImage.isFavourite === true
                  ? "text-red-700 fill-red-700"
                  : "text-red-700"
              }
            />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash className="text-gray-700" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Info className="text-blue-700" />
          </Button>
        </div>
      </div>

      {/* Sidebar for Metadata & Comments */}
      {isSidebarOpen && (
        <div className="w-80 bg-white p-4 overflow-y-auto shadow-lg h-full absolute right-0 top-0">
          <h2 className="text-lg font-semibold text-left">
            {currentImage.name}
          </h2>
          <p className="text-left">
            <strong>Uploaded By:</strong> {currentImage.albumId.owner.name}
          </p>
          <p className="text-left">
            <strong>Album:</strong> {currentImage.albumId.title}
          </p>
          <p className="text-left">
            <strong>Date:</strong> {currentImage.createdAt}
          </p>
          <p className="text-left">
            <strong>Size:</strong> {`${currentImage.size} MB`}
          </p>
          <hr />
          <h3 className="mt-4 text-lg font-semibold">Comments</h3>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="comment-input"
            />

            <Button onClick={handleCommentSubmit} className="post-btn">
              Post
            </Button>
          </div>
          <div className="space-y-2 my-4 max-h-100 overflow-y-auto">
            {currentImage.comments &&
              currentImage.comments.map((c, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-100 rounded-md flex items-start gap-2"
                >
                  <img
                    src={c.owner.profilePic}
                    alt={c.owner.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{c.owner.name}</p>
                    <p className="text-gray-700">{c.comment}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
