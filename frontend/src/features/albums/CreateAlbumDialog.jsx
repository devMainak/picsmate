import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAlbumAsync, updateAlbumAsync } from "./albumsSlice";

export function CreateAlbumDialog({ album, onClose, open }) {
  const [title, setTitle] = useState(album ? album.title : "");
  const [description, setDescription] = useState(album?.description ?? "");

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useAuth();

  const controlledOpen = open !== undefined;
  const actualOpen = controlledOpen ? open : isOpen;

  const handleOpenChange = (val) => {
    if (controlledOpen) {
      if (!val && onClose) onClose(); // Only call onClose when the dialog is closed
    } else {
      setIsOpen(val);
    }
  };

  const handleAlbumAction = (e) => {
    e.preventDefault();

    const newAlbum = {
      owner: user._id,
      title,
      ...(description && { description }),
    };

    const updatedAlbum = {
      ...album,
      title,
      description,
    };

    try {
      if (!album) {
        dispatch(createAlbumAsync(newAlbum));
        if (controlledOpen) {
          onClose?.();
        } else {
          setIsOpen(false);
        }
        setTitle("");
        setDescription("");
      } else {
        dispatch(updateAlbumAsync(updatedAlbum));
        if (controlledOpen) {
          onClose?.();
        } else {
          setIsOpen(false);
        }
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Failed to create album:", error);
    }
  };

  return (
    <Dialog open={actualOpen} onOpenChange={handleOpenChange}>
      {!album && (
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>+ Create Album</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{album ? "Update" : "Create"} Album</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAlbumAction}>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter the album title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Write your album description."
                maxLength={50}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{album ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
