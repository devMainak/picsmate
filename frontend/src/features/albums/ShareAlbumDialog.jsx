import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { clearAlbumError, shareAlbumAsync } from "./albumsSlice";

const ShareAlbumDialog = ({ albumId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState(null);

  const dispatch = useDispatch();
  const backendError = useSelector((state) => state.albums.error);

  useEffect(() => {
    if (isOpen) {
      dispatch(clearAlbumError());
      setEmail("");
      setLocalError(null);
    }
  }, [isOpen, dispatch]);

  const handleAlbumShare = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        setLocalError("Enter an email!");
        return;
      }
      await dispatch(shareAlbumAsync({ albumId, email })).unwrap();
      setIsOpen(false);
    } catch (err) {
      setLocalError("Failed to share album.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Album</DialogTitle>
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
        <form onSubmit={handleAlbumShare}>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title">Add Email to Share</Label>
              <Input
                type="email"
                id="title"
                placeholder="Enter a valid email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Share</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ShareAlbumDialog;
