import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CiSearch } from "react-icons/ci";

function SearchBar() {
  const [buttonVisible, setButtonVisible] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = e.target.search.value;

    await navigate({
      to: `/?search=${query.trim().toLowerCase()}`,
      replace: true,
    });
    window.location.reload();
  };
  const showButton = () => {
    setButtonVisible(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center text-xl">
      <input
        name="search"
        onBlur={() => setButtonVisible(false)}
        onFocus={showButton}
        className="text-white font-light  group placeholder:font-light placeholder:text-center bg-black focus:bg-black focus:text-white border-b-2"
        type="text"
        placeholder="Søk i Annonser"
      />
      <button
        className={`text-white px-2 transition-opacity duration-200 ${
          buttonVisible ? "opacity-1" : "opacity-0"
        }`}
        type="submit"
      >
        <CiSearch size={26} />
      </button>
    </form>
  );
}

export default SearchBar;
