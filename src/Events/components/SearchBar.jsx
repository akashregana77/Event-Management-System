import { Search } from "lucide-react";
import "./SearchBar.css";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-box">
      <Search size={18} />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search events..."
      />
    </div>
  );
}
