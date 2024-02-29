import { Link } from "react-router-dom";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import NotFound from "../../assets/not-found.png";
import { getMealsByName } from "../../api/api";
import Comp from "./Comp";
const Search = () => {
  const [showSkeleton, setShowSekeleton] = useState(false);
  const handleSearch = async (e) => {
    setShowSekeleton(true);
    const query = e.target.value;
    const meals = await getMealsByName(query);
  };
  return (
    <div className="h-[90vh]">
      <div className=" fixed left-1/2 top-[5%] z-10 w-4/5 -translate-x-1/2 -translate-y-1/2 bg-white">
        <input
          type="text"
          className="w-full rounded-md p-4 shadow-lg outline-none"
          placeholder="Search for a recipe..."
          onChange={handleSearch}
        />
        <Link to="/">
          <CloseIcon className="absolute right-4 top-1/3 text-2xl text-gray-300" />
        </Link>
      </div>
      <div className="h-full w-full overflow-y-auto">
        <h1 className="ml-4 mt-4 font-bold">
          Showing results for {`"${"Dal"}"`}
        </h1>
        <div className=" grid h-full w-full grid-cols-1 gap-3  p-4 md:grid-cols-2 lg:grid-cols-5">
          {showSkeleton && <></>}
        </div>
      </div>
    </div>
  );
};

export default Search;
