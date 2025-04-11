import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAlbumAsync } from "./albumsSlice";
import { useNavigate } from "react-router-dom";

export function DeleteAlbumDialog({ album, onClose, open }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const controlledOpen = open !== undefined;
  const actualOpen = controlledOpen ? open : isOpen;

  const handleOpenChange = (val) => {
    if (controlledOpen) {
      if (!val && onClose) onClose();
    } else {
      setIsOpen(val);
    }
  };

  const handleAlbumDelete = async () => {
    if (onClose) onClose(); // close dialog first
    await dispatch(deleteAlbumAsync(album._id));
    navigate("/albums");
  };

  return (
    <AlertDialog open={actualOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {album.title}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete all photos in the album along with the
            album itself.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600" onClick={handleAlbumDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
