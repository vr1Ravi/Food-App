import { useSelector } from "react-redux";
import NotFound from "../../assets/not-found.png";
import Meals from "../search/Meals";

const Favorite = () => {
  const { favorites } = useSelector((state) => state.user);
  if (!favorites) {
    return;
  }
  return (
    <div>
      <h1 className="mt-4 text-center text-2xl font-bold text-black">
        Favorite Meals
      </h1>
      <div className=" grid h-full w-full grid-cols-1 gap-3  p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {favorites.length === 0 ? (
          <div className=" absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
            <img
              className="h-[100px] w-[100px]"
              src={NotFound}
              alt="not-found"
            />
            <h1 className="text-2xl font-bold">No Favorite yet...</h1>
          </div>
        ) : (
          favorites.map((meal) => (
            <Meals
              key={meal.id}
              img={meal.img || ""}
              name={meal.name}
              id={meal.id}
              tags={meal.tags}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Favorite;
