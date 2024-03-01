import React, { useEffect, useState } from "react";
import { useFetchMealByIdQuery } from "../../api/api";
import { useParams } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
const MealDetails = () => {
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  console.log(ingredients);
  const { isFetching, data: meal } = useFetchMealByIdQuery(id);
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
  console.log(meal);
  return (
    <>
      <div className="grid h-[80vh] grid-rows-2 place-items-center  pt-4 md:grid-cols-2 md:grid-rows-1">
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
          (instruction) =>
            instruction && (
              <div className="flex  items-start">
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
