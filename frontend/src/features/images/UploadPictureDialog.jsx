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
import { ImagePlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, uploadImageAsync } from "./imagesSlice";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { fetchAlbumsAsync } from "../albums/albumsSlice";

export function UploadPictureDialog({ albumId }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [person, setPerson] = useState("");
  const [tags, setTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();
  const backendError = useSelector((state) => state.images.error);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      dispatch(clearError());
      setName("");
      setImage(null);
      setImagePreview("");
      setSelectedAlbum("");
      setPerson("");
      setTags([]);
      setLocalError(null);
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    dispatch(fetchAlbumsAsync());
  });

  const { albums } = useSelector((state) => state.albums);
  const userAlbums = albums.filter((album) => album.owner === user._id);

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
    setIsUploading(true);

    if (!image) {
      setLocalError("Please select an image.");
      setIsUploading(false);
      return;
    }

    if (location.pathname === "/photos" && !selectedAlbum) {
      setLocalError("Please select an album.");
      setIsUploading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append(
        "imageData",
        JSON.stringify({
          name,
          albumId: selectedAlbum ? selectedAlbum : albumId,
          person,
          tags,
        })
      );
      formData.append("file", image);

      await dispatch(uploadImageAsync({ formData, albumId })).unwrap();
      setIsOpen(false);
    } catch (err) {
      setLocalError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-12 h-12 p-3 bg-red-600 dark:bg-red-600 text-white hover:bg-red-700 hover:scale-105 transition-all duration-150"
          onClick={() => setIsOpen(true)}
        >
          <ImagePlus className="!text-[2rem] stroke-[2.5] dark:text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Picture</DialogTitle>
          <DialogDescription>
            Only .jpg, .jpeg, .png, .gif files are supported. Size limit 5MB.
          </DialogDescription>
        </DialogHeader>

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
            {location.pathname === "/photos" && (
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="album">Select Album</Label>
                <Select onValueChange={(value) => setSelectedAlbum(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Albums" />
                  </SelectTrigger>
                  <SelectContent>
                    {userAlbums.map((album) => (
                      <SelectItem value={album._id}>{album.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
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
            <Button
              className="bg-red-600 dark:bg-red-600 dark:text-white"
              type="submit"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
