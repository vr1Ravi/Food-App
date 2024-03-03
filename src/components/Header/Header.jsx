import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser } from "../../api/api";
import { useState } from "react";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    setLoading(true);
    const res = await logoutUser(dispatch);
    if (res) {
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
    }
    setLoading(false);
  };
  return (
    <div className=" flex h-[10vh] w-full items-center justify-between bg-white shadow-lg">
      <div>
        <Link to={"/"}>
          <img src={logo} alt="Logo" className="w-20 cursor-pointer p-3" />
        </Link>
      </div>
      {user && (
        <h1 className="text-center text-[12px] md:text-xl">
          Welcom <span className="font-bold">{user.name}</span>, Happy Cooking{" "}
        </h1>
      )}
      <div>
        <div className="flex ">
          {user ? (
            <button
              className="p-3 text-[12px]  font-bold  md:text-[16px]"
              onClick={handleLogOut}
            >
              {loading ? (
                <svg
                  className=" m-auto h-5 w-5 animate-spin text-center text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Logout"
              )}
            </button>
          ) : (
            <Link
              to="/login"
              className="p-3 text-[12px]  font-bold  md:text-[16px]"
            >
              Login
            </Link>
          )}

          {user && (
            <Link
              to="/favorite"
              className={`p-3 ${!user && "hidden"} text-[12px] font-bold md:text-[16px]`}
            >
              Favorites
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
