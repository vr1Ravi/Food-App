import { useLocation } from "react-router-dom";
import Meals from "../search/Meals";
import MealsSkeleton from "../search/MealsSkeleton";
import { useFetchMealByTypeQuery } from "../../api/api";
import { MealTags } from "../Home/list";
const MealType = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const a = searchParams.get("a");
  const c = searchParams.get("c");
  const { isFetching, data: meals } = useFetchMealByTypeQuery({
    type: a ? "a" : "c",
    value: a || c,
  });
  return (
    <div className="h-full w-full overflow-y-auto">
      <h1 className="p-4 text-3xl font-bold">{a ? "Area" : "Category"}</h1>
      <div className=" grid h-full w-full grid-cols-1 gap-3  p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {isFetching ? (
          <>
            {[...Array(10)].map((_, index) => (
              <MealsSkeleton key={index} />
            ))}
          </>
        ) : (
          meals?.map((meal, idx) => (
            <Meals
              key={meal.idMeal}
              img={meal.strMealThumb || ""}
              name={meal.strMeal}
              id={meal.idMeal}
              tags={
                idx % 2 === 0
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
              stars={Array(
                Math.floor(
                  meal.idMeal
                    .split("")
                    .map((val) => val - "0")
                    .reduce((acc, val) => acc + val, 0) / 5,
                ),
              ).fill(0)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MealType;
