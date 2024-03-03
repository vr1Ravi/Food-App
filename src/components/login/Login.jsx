import Home from "../home/Home";
import Logo from "../../assets/logo.png";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, sendOtp } from "../../api/api";
import LoadingBtn from "./LoadingBtn";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const [otp, setOtp] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;

    setName(name);
    setEmail(email);
    const res = await sendOtp(email, name);
    setLoading(false);
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
      setShowOtpBox(true);
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

  const handleOtpSend = async (e) => {
    setLoading(true);
    const res = await login(dispatch, name, email, otp);
    setLoading(false);
    if (res !== null) {
      setShowOtpBox(true);
      navigate("/");
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

  const otpStyle = {
    width: "2rem",
    border: "1px solid gray",
    outline: "none",
    borderRadius: "5px",
  };

  return (
    <div>
      <div className="opacity-80">
        <Home />
      </div>

      <div className="absolute left-1/2 top-1/2   h-screen w-screen -translate-x-1/2 -translate-y-1/2 rounded-md bg-black opacity-50"></div>

      <div className="absolute left-1/2 top-1/2 z-20 flex h-[60vh] w-4/5 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-evenly rounded-md bg-white px-4 opacity-100 shadow-lg md:w-1/2">
        <CloseIcon
          onClick={() => {
            navigate("/");
          }}
          className=" absolute right-0 top-0 cursor-pointer text-xl text-black"
        />

        <div>
          <img src={Logo} alt="logo" className="mx-auto h-24 w-24" />
          <h1 className="text-center text-[1rem] text-gray-800 md:text-3xl">
            {showOtpBox ? "Enter Otp" : "Login or Signup"}
          </h1>
        </div>
        {showOtpBox ? (
          <div className="flex w-[90%] flex-col items-center justify-evenly *:mb-3">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              containerStyle="w-full md:w-[90%] flex justify-evenly"
              inputStyle={otpStyle}
              inputType="number"
            />

            {loading ? (
              <LoadingBtn />
            ) : (
              <button
                onClick={handleOtpSend}
                className="w-[50%] rounded-md bg-green-500 p-1 text-white md:p-3"
              >
                Continue
              </button>
            )}
          </div>
        ) : (
          <form
            onSubmit={handleFormSubmit}
            className="flex w-[90%] flex-col items-center justify-evenly *:mb-3"
          >
            <input
              required
              type="text"
              name="name"
              maxLength={10}
              className=" w-full rounded-md border   border-gray-300 p-3 outline-none md:w-4/5"
              placeholder="Enter nick name"
            />
            <input
              required
              type="email"
              name="email"
              className=" w-full rounded-md border   border-gray-300 p-3 outline-none md:w-4/5"
              placeholder="Enter email"
            />

            {loading ? (
              <LoadingBtn />
            ) : (
              <button
                type="submit"
                className="w-[50%] rounded-md bg-green-500 p-1 text-white md:p-3"
              >
                Continue
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
