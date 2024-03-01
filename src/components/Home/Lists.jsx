import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EastIcon from "@mui/icons-material/East";

import { useRef } from "react";

const Lists = ({ list, title }) => {
  const divRef = useRef(null);

  const handleLeftScroll = () => {
    if (divRef.current) divRef.current.scrollLeft -= 600;
  };
  const handleRightScroll = () => {
    if (divRef.current) divRef.current.scrollLeft += 600;
  };
  return (
    <div className="relative">
      <KeyboardBackspaceIcon
        style={{ fontSize: "1rem", width: "3rem", height: "3rem" }}
        className="absolute left-4 top-1/2 z-10 cursor-pointer rounded-full bg-white text-gray-300 shadow-md"
        onClick={handleLeftScroll}
      />
      <EastIcon
        style={{ fontSize: "1rem", width: "3rem", height: "3rem" }}
        className="absolute right-4 top-1/2 z-10 cursor-pointer rounded-full bg-white text-gray-300 shadow-md "
        onClick={handleRightScroll}
      />
      <h1 className="whitespace-nowrap p-4 text-3xl font-bold">{title}</h1>
      <div
        className=" no-scrollbar   flex overflow-x-scroll scroll-smooth pl-8 "
        ref={divRef}
      >
        {list.map((item, _) => (
          <Link
            to={`/category?${item.type}=${item.title}`}
            key={item.title}
            style={{ backgroundImage: `url(${item.src})` }}
            className="m-2 flex h-[150px] w-[150px] flex-shrink-0 items-center justify-center rounded-full bg-slate-300 bg-cover opacity-80 shadow-lg hover:opacity-75"
          >
            <i className="overflow-hidden text-ellipsis whitespace-nowrap text-center text-xl font-semibold text-white">
              {item.title}
            </i>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Lists;
