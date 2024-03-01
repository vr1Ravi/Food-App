import Home from "../home/Home";
import Logo from "../../assets/logo.png";
import { signInWithPhoneNumber } from "firebase/auth";
const Login = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const number = formData.get("number");
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
            className="w-4/5 rounded-md border border-gray-300 p-3 outline-none"
            placeholder="Enter name"
          />
          <input
            required
            type="number"
            name="number"
            style={{ appearance: "textfield" }}
            className="w-4/5  rounded-md border border-gray-300 p-3 outline-none"
            placeholder="Enter mobile number"
          />
          <button
            type="submit"
            className="w-[50%] rounded-md bg-green-500 p-3 text-white"
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
