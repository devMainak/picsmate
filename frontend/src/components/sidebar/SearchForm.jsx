import { Search } from "lucide-react";

import { Label } from "../ui/label";
import { SidebarInput } from "../ui/sidebar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchImagesAsync,
  fetchImagesByTag,
  setSearchMode,
} from "@/features/images/imagesSlice";
import { useNavigate } from "react-router-dom";

export function SearchForm({ ...props }) {
  const [searchedTags, setSearchedTags] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchedTags) {
      dispatch(setSearchMode(false));
      dispatch(fetchImagesAsync());
    }
  }, [searchedTags]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tags = searchedTags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    dispatch(setSearchMode(true));
    dispatch(fetchImagesByTag({ albumId: "useralbums", tags }));
    navigate("/photos");
  };

  return (
    <form {...props} onSubmit={handleSubmit}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          placeholder='Search by tags ", "'
          className="h-8 pl-7 text-red-600"
          value={searchedTags}
          onChange={(e) => setSearchedTags(e.target.value)}
        />
        <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
      </div>
    </form>
  );
}
