import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { setFilter } from "./albumsSlice";

export function AlbumFilterSelect() {
  const dispatch = useDispatch();

  return (
    <Select onValueChange={(val) => dispatch(setFilter(val))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel></SelectLabel>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="own">My Albums</SelectItem>
          <SelectItem value="shared">Shared with me</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
