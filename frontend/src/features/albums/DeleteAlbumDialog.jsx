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
import { useDispatch } from "react-redux";
import { deleteAlbumAsync } from "./albumsSlice";
import { useNavigate } from "react-router-dom";

export function DeleteAlbumDialog({ album, onClose, open }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenChange = (val) => {
    if (!val && onClose) onClose();
  };

  const handleAlbumDelete = async () => {
    if (onClose) onClose(); // close dialog first
    await dispatch(deleteAlbumAsync(album._id));
    navigate("/albums");
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {album.title}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete all photos in the album along with the
            album itself.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-red-600 dark:text-red-600" onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 dark:bg-red-600 dark:text-white" onClick={handleAlbumDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
