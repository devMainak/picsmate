import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Trash, Info, X } from "lucide-react";
import { useState } from "react";

export default function ImageViewer({ image, isOpen, onClose }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full h-full flex p-0 relative">
        {/* Image Container */}
        <div className="flex flex-grow bg-black justify-center items-center relative overflow-hidden">
          <img
            src={image.url}
            alt={image.name}
            className="max-w-full max-h-full object-contain w-auto h-auto"
          />

          {/* Action Buttons */}
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
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="text-white" />
            </Button>
          </div>
        </div>

        {/* Sidebar for Metadata & Comments */}
        {isSidebarOpen && (
          <div className="w-80 bg-white p-4 overflow-y-auto shadow-lg h-full absolute right-0 top-0">
            <h2 className="text-lg font-semibold">Image Metadata</h2>
            <p>
              <strong>Name:</strong> {image.name}
            </p>
            <p>
              <strong>Uploaded By:</strong> {image.uploader}
            </p>
            <p>
              <strong>Date:</strong> {image.createdAt}
            </p>

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
      </DialogContent>
    </Dialog>
  );
}
