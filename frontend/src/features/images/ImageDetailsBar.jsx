import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CommentList from "./CommentList";
import { addCommentAsync } from "./imagesSlice";
import { useDispatch } from "react-redux";

const ImageDetailsBar = ({ image, user }) => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

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
          albumId: image.albumId._id,
          comment: newComment,
          imageId: image._id,
        })
      );
      setComment("");
    }
  };

  return (
    <div className="w-80 bg-white text-black dark:bg-black dark:text-white p-4 overflow-y-auto shadow-lg h-full absolute right-0 top-0">
      <section className="text-left">
        <h2 className="text-lg font-semibold">{image.name}</h2>
        <p>
          <strong>Uploaded By:</strong> {image.albumId.owner.name}
        </p>
        <p>
          <strong>Album:</strong> {image.albumId.title}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(image.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Size:</strong> {`${image.size} MB`}
        </p>
        {image.tags.length !== 0 && (
          <p>
            <strong>Tags:</strong> {image.tags.join(", ")}
          </p>
        )}
      </section>
      <hr className="my-2 border-gray-400 dark:border-gray-600" />
      <h3 className="mt-4 text-lg font-semibold">Comments</h3>

      <div className="flex gap-2 mt-2">
        <Input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="comment-input bg-white text-black dark:bg-black dark:text-white"
        />

        <Button
          onClick={handleCommentSubmit}
          className="post-btn bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:text-white"
        >
          Post
        </Button>
      </div>
      <CommentList comments={image.comments} />
    </div>
  );
};

export default ImageDetailsBar;
