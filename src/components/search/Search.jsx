import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import NotFound from "../../assets/not-found.png";
import Meals from "./Meals";
import MealsSkeleton from "./MealsSkeleton";
import { MealTags } from "../home/list";

import { useFetchMealsQuery } from "../../api/api";
const Search = () => {
  const [input, setInput] = useState(localStorage.getItem("search") || "");
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("search") || "",
  );
  const [loading, setLoading] = useState(false);
  const { isFetching, data: meals } = useFetchMealsQuery(searchQuery);
  useEffect(() => {
    const id = setTimeout(() => {
      setSearchQuery(input);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(id);
  }, [input]);

  const handleSearch = async (e) => {
    setLoading(true);
    setInput(e.target.value);
    localStorage.setItem("search", e.target.value);
  };
  return (
    <div className="h-[90vh]">
      <div className=" fixed left-1/2 top-[5%] z-10 w-4/5 -translate-x-1/2 -translate-y-1/2 bg-white">
        <input
          type="text"
          className="w-full rounded-md p-4 shadow-lg outline-none"
          placeholder="Search for a recipe..."
          onChange={handleSearch}
          value={input}
        />
        <Link to="/">
          <CloseIcon className="absolute right-4 top-1/3 text-2xl text-gray-300" />
        </Link>
      </div>
      <div className="h-full w-full overflow-y-auto">
        {input && (
          <h1 className="ml-4 mt-4 font-bold">
            Showing results for {`"${input}"`}
          </h1>
        )}
        <div className=" grid h-full w-full grid-cols-1 gap-3  p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {input && (loading || isFetching) ? (
            <>
              {[...Array(10)].map((_, index) => (
                <MealsSkeleton key={index} />
              ))}
            </>
          ) : input && !meals?.length ? (
            <div className=" absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
              <img
                className="h-[100px] w-[100px]"
                src={NotFound}
                alt="not-found"
              />
              <h1 className="text-2xl font-bold">
                Search for something else...
              </h1>
            </div>
          ) : (
            input &&
            meals?.map((meal, idx) => (
              <Meals
                key={meal.idMeal}
                img={meal.strMealThumb || ""}
                name={meal.strMeal}
                id={meal.idMeal}
                tags={
                  meal.strTags?.split(",").slice(0, 3) || idx % 2 === 0
                    ? [
                        MealTags[Math.floor(Math.random() * 18)],
                        MealTags[Math.floor(Math.random() * 18)],
                      ]
                    : [
                        MealTags[Math.floor(Math.random() * 18)],
                        MealTags[Math.floor(Math.random() * 18)],
                        MealTags[Math.floor(Math.random() * 18)],
                      ]
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
