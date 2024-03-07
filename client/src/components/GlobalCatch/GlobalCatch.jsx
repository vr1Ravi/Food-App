import React from "react";
import { useNavigate } from "react-router-dom";

const GlobalCatch = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <p className="">
        Bad request. Click{" "}
        <span
          onClick={() => navigate("/")}
          className=" cursor-pointer font-bold underline"
        >
          here
        </span>{" "}
        to go back Home
      </p>
    </div>
  );
};

export default GlobalCatch;
