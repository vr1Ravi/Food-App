import Home from "../home/Home";
import Logo from "../../assets/logo.png";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const number = e.target.number.value;
  };
  return (
    <>
      <div className="opacity-80">
        <Home />
      </div>

      <div className="absolute left-1/2 top-1/2   h-screen w-screen -translate-x-1/2 -translate-y-1/2 rounded-md bg-black opacity-50"></div>
      <div className="absolute left-1/2 top-1/2 z-20 flex h-[60vh] w-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-evenly rounded-md bg-white px-4 opacity-100 shadow-lg">
        <div>
          <img src={Logo} alt="logo" className="mx-auto h-24 w-24" />
          <h1 className="text-center text-3xl text-gray-800">
            Login or Signup
          </h1>
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="flex w-[90%] flex-col items-center justify-evenly *:mb-3"
        >
          <input
            required
            type="text"
            name="name"
            maxLength={10}
            className="w-4/5 rounded-md border border-gray-300 p-3 outline-none"
            placeholder="Enter nick name"
          />
          <input
            required
            type="number"
            name="number"
            pattern="[0-9]{4}"
            style={{ appearance: "textfield" }}
            className="w-4/5  rounded-md border border-gray-300 p-3 outline-none"
            placeholder="Enter 4 digit code"
          />

          {loading ? (
            <button
              type="button"
              className="w-[50%] rounded-md bg-green-500 p-3 text-white"
              disabled
            >
              <svg
                class=" m-auto h-5 w-5 animate-spin text-center text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              className="w-[50%] rounded-md bg-green-500 p-3 text-white"
            >
              Continue
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
