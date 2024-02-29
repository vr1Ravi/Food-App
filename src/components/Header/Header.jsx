import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
const Header = () => {
  return (
    <div className=" flex h-[10vh] w-full items-center justify-between bg-white shadow-lg">
      <div className="w-1/3">
        <Link to={"/"}>
          {" "}
          <img src={logo} alt="Logo" className="w-20 cursor-pointer p-3" />
        </Link>
      </div>
      <div>
        <div>
          <Link to="/login" className="p-3">
            Login
          </Link>
          <Link to="/favorite" className="p-3">
            Favorite
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
