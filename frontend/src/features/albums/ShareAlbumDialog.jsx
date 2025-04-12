import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { clearAlbumError, shareAlbumAsync } from "./albumsSlice";

const ShareAlbumDialog = ({ albumId, onClose, open }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState(null);

  const dispatch = useDispatch();
  const backendError = useSelector((state) => state.albums.error);

  const controlled = open !== undefined;
  const dialogOpen = controlled ? open : isOpen;

  useEffect(() => {
    if (dialogOpen) {
      dispatch(clearAlbumError());
      setEmail("");
      setLocalError(null);
    }
  }, [dialogOpen, dispatch]);

  const handleOpenChange = (val) => {
    if (controlled) {
      if (!val && onClose) onClose();
    } else {
      setIsOpen(val);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setLocalError("Enter an email!");
      return;
    }

    try {
      await dispatch(shareAlbumAsync({ albumId, email })).unwrap();

      if (controlled) {
        onClose?.();
      } else {
        setIsOpen(false);
      }
    } catch {
      setLocalError("Failed to share album.");
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Album</DialogTitle>
        </DialogHeader>

        {(localError || backendError) && (
          <div className="bg-red-100 text-red-700 p-2 rounded-md">
            {localError || backendError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Add Email to Share</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter a valid email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="bg-red-600 dark:bg-red-600 dark:text-white" type="submit">
              Share
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ShareAlbumDialog;
