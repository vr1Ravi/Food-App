import React, { useEffect, useState } from "react";
import { addOrRemoveFav, useFetchMealByIdQuery } from "../../api/api";
import { useParams } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
const MealDetails = () => {
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const { isFetching, data: meal } = useFetchMealByIdQuery(id);
  const { user } = useSelector((state) => state.user);
  const { favorites } = useSelector((state) => state.user.user);
  const [liked, setLiked] = useState(
    favorites ? favorites?.find((fav) => fav.id === id) : false,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (meal) {
      const ingredients = Object.keys(meal).filter(
        (key) =>
          key.includes("strIngredient") &&
          meal[key] !== "" &&
          meal[key] !== null,
      );

      setIngredients(ingredients);
    }
  }, [meal]);
  const handleLikedUnlikedClick = async () => {
    setLiked(!liked);
    const res = await addOrRemoveFav(dispatch, {
      id: id,
      img: meal.strMealThumb,
      name: meal.strMeal,
    });
    if (res !== null) {
      toast.success(res, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("Server Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="relative grid h-[80vh] grid-rows-2  place-items-center pt-4 md:grid-cols-2 md:grid-rows-1">
        <div className="absolute right-5 top-8  text-red-600">
          {user && liked ? (
            <FavoriteIcon
              style={{ fontSize: "2rem" }}
              className="cursor-pointer text-2xl "
              onClick={handleLikedUnlikedClick}
            />
          ) : (
            <FavoriteBorderIcon
              style={{ fontSize: "2rem" }}
              className="cursor-pointer text-2xl "
              onClick={handleLikedUnlikedClick}
            />
          )}
        </div>
        <div className="animate-puls  h-full ">
          <div className="h-80 w-80 rounded-full bg-slate-200">
            {meal?.strMealThumb && (
              <>
                <img
                  src={meal.strMealThumb}
                  alt="meal-img"
                  className="h-full w-full rounded-full object-cover"
                />
                <h1 className="mt-2 text-center font-semibold">
                  {meal.strMeal}
                </h1>
              </>
            )}
          </div>
        </div>
        <div className="animate-puls mt-12 flex h-full w-full flex-col items-start justify-start pt-8">
          {isFetching ? (
            <>
              <div className="mb-4 h-4 w-1/2 bg-slate-200"></div>
              <div className="grid w-4/5 grid-cols-2">
                <div className="mb-4 h-4 w-1/4 bg-slate-200"></div>
                <div className="mb-4 h-4 w-3/4 bg-slate-200"></div>
                <div className="mb-4 h-4 w-1/5 bg-slate-200"></div>
                <div className="mb-4 h-4 w-1/2 bg-slate-200"></div>
                <div className="mb-4 h-4 w-1/4 bg-slate-200"></div>
                <div className="mb-4 h-4 w-1/3 bg-slate-200"></div>
              </div>
            </>
          ) : meal ? (
            <>
              <h1 className=" mb-2 font-mono text-xl font-bold">Ingredients</h1>
              <div className="grid grid-cols-2 gap-2">
                {ingredients.map((ingredient, idx) => (
                  <div
                    key={ingredient}
                    className="mb-2 flex w-full items-center"
                  >
                    <span>
                      <FiberManualRecordIcon className="text-orange-500" />
                    </span>
                    <span className="mr-2 font-semibold">
                      {meal[`strMeasure${idx + 1}`]},
                    </span>{" "}
                    <p> {meal[ingredient]}</p>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className="animate-puls  ">
        {meal?.strInstructions ? (
          <>
            <h1 className="mb-4 text-center text-2xl font-extrabold text-orange-500">
              INSTRUCTIONS
            </h1>
          </>
        ) : (
          <div className="mx-auto h-8  w-1/4 bg-slate-200"></div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-1 px-3">
        {meal?.strInstructions.split(".").map(
          (instruction, idx) =>
            instruction && (
              <div key={idx} className="flex  items-start">
                <p className="">
                  <FiberManualRecordIcon className="text-orange-500" />
                </p>
                <p className="pl-2" key={instruction}>
                  {instruction.includes("STEP")
                    ? instruction.substring(6)
                    : instruction}
                </p>
              </div>
            ),
        )}
      </div>
    </>
  );
};

export default MealDetails;
