import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, uploadImageAsync } from "./imagesSlice";

export function UploadPictureDialog({ albumId }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [person, setPerson] = useState("");
  const [tags, setTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [localError, setLocalError] = useState(null); // Local error state

  const dispatch = useDispatch();
  const backendError = useSelector((state) => state.images.error); // Get error from Redux store

  useEffect(() => {
    if (isOpen) {
      dispatch(clearError()); // Clear error when the dialog opens
      setName("");
      setImage(null);
      setImagePreview("");
      setPerson("");
      setTags([]);
      setLocalError(null);
    }
  }, [isOpen, dispatch]);

  const handleFileChange = (e) => {
    const picture = e.target.files[0];
    if (picture) {
      setImage(picture);
      setImagePreview(URL.createObjectURL(picture));
    }
  };

  const handleTags = (e) => {
    const { value } = e.target;
    const newTags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    setTags(newTags);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setLocalError(null);
    dispatch(clearError());

    if (!image) {
      setLocalError("Please select an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append(
        "imageData",
        JSON.stringify({ name, albumId, person, tags })
      );
      formData.append("file", image);

      await dispatch(uploadImageAsync({ formData, albumId })).unwrap();
      setIsOpen(false);
    } catch (err) {
      console.log(backendError);
      setLocalError("Failed to upload image. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Upload Picture</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Picture</DialogTitle>
          <DialogDescription>
            Only .jpg, .jpeg, .png, .gif files are supported. Size limit 5MB.
          </DialogDescription>
        </DialogHeader>

        {/* Display Local or Backend Errors */}
        {localError && (
          <div className="bg-red-100 text-red-700 p-2 rounded-md">
            {localError}
          </div>
        )}
        {backendError && (
          <div className="bg-red-100 text-red-700 p-2 rounded-md">
            {backendError}
          </div>
        )}

        <form onSubmit={handleImageUpload}>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Picture Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter picture name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" onChange={handleFileChange} />
              {imagePreview && (
                <img
                  className="max-h-64 w-full rounded-md"
                  src={imagePreview}
                />
              )}
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="person">Tagged Person</Label>
              <Input
                type="text"
                id="person"
                placeholder="Name of the tagged person"
                value={person}
                onChange={(e) => setPerson(e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="tags">
                Tags <span>(Separate by ",")</span>
              </Label>
              <Input
                type="text"
                id="tags"
                placeholder="Add tags"
                onChange={handleTags}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Upload</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
