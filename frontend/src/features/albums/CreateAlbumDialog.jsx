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
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createAlbumAsync, updateAlbumAsync } from "./albumsSlice";

export function CreateAlbumDialog({ album, onClose, open }) {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const controlledOpen = open !== undefined;
  const [isOpen, setIsOpen] = useState(false);
  const actualOpen = controlledOpen ? open : isOpen;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Sync form fields when album or dialog open state changes
  useEffect(() => {
    if (actualOpen) {
      setTitle(album?.title || "");
      setDescription(album?.description || "");
    }
  }, [actualOpen, album]);

  const handleOpenChange = (val) => {
    if (controlledOpen) {
      if (!val && onClose) onClose();
    } else {
      setIsOpen(val);
    }
  };

  const handleAlbumAction = async (e) => {
    e.preventDefault();
    try {
      const payload = album
        ? { ...album, title, description }
        : {
            owner: user._id,
            title,
            ...(description && { description }),
          };

      const action = album ? updateAlbumAsync : createAlbumAsync;
      await dispatch(action(payload)).unwrap();

      // Reset form and close dialog
      setTitle("");
      setDescription("");
      controlledOpen ? onClose?.() : setIsOpen(false);
    } catch (error) {
      console.error("Album action failed:", error);
    }
  };

  return (
    <Dialog open={actualOpen} onOpenChange={handleOpenChange}>
      {!album && (
        <DialogTrigger asChild>
          <Button className="bg-red-600" onClick={() => setIsOpen(true)}>
            + Create Album
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{album ? "Update" : "Create"} Album</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAlbumAction}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter the album title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Write your album description."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={50}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="bg-red-600" type="submit">
              {album ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
