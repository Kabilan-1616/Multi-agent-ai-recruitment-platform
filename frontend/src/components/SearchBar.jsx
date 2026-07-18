import { Search } from "lucide-react";
import "../styles/toolbar.css";

export default function SearchBar({ value, onChange }) {
    return (
        <div className="search-bar">
            <Search />
            <input
                type="text"
                placeholder="Search by candidate name, email or skill..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
