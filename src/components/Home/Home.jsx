import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
const Home = () => {
  const [randomMeal, setRandomMeal] = useState(null);

  useEffect(() => {
    const fetchRandomMeal = async () => {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php",
      );
      const data = await response.json();
      setRandomMeal(data.meals[0]);
    };
    let interval = setInterval(() => fetchRandomMeal(), 2800);
    return () => clearInterval(interval);
  }, []);
  if (!randomMeal) return;
  return (
    <div className="relative mt-4 h-[70vh]">
      <img
        src={randomMeal.strMealThumb}
        alt="randomMeal"
        className="h-full w-full rounded-md object-cover opacity-10 shadow-lg"
        style={{ transition: "opacity 1s ease-in-out" }}
      />

      <div className="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2">
        <input
          type="text"
          className="w-full rounded-md p-4 shadow-lg outline-none"
          placeholder="Search for a recipe..."
        />
        <SearchIcon className="absolute right-4 top-1/3 text-2xl text-gray-300" />
      </div>
    </div>
  );
};

export default Home;
