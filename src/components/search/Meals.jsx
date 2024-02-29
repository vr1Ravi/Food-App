import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
const Meals = ({ img, name, id, tags = [] }) => {
  return (
    <Link
      to={`/recipe/${id}`}
      className="mx-auto h-fit w-full max-w-sm rounded-md border border-blue-300 p-4 shadow"
    >
      <div>
        <div className="rounded-ful m-auto h-20 w-20">
          <img src={img} alt={name} className="w-full rounded-full" />
        </div>
        <div className="flex-1 space-y-6 py-1">
          <div className="mt-2 h-2 w-full">
            <h2 className="text-center">{name}</h2>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              {tags.length === 0 ? (
                <>
                  <div className="rounded bg-slate-200">
                    <i className="text-center">--</i>
                  </div>
                </>
              ) : (
                tags.map((tag, index) => (
                  <div
                    key={tag}
                    className="overflow-hidden text-ellipsis whitespace-nowrap rounded bg-slate-200 px-2 "
                  >
                    <i className="text-center">{tag}</i>
                  </div>
                ))
              )}
            </div>
            {tags.length === 0 ? (
              <StarIcon className="text-orange-500" />
            ) : (
              tags.map((_, index) => (
                <StarIcon key={index} className="text-orange-500" />
              ))
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Meals;
