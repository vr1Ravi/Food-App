import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Search from "./components/search/Search";
import { useDispatch, useSelector } from "react-redux";
import MealDetails from "./components/mealDetails/MealDetails";
import MealType from "./components/Category/MealType";
import Login from "./components/login/Login";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { loadUser } from "./api/api";
import GlobalCatch from "./components/GlobalCatch/GlobalCatch";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    loadUser(dispatch);
  }, []);
  return (
    <div className=" no-scrollbar h-screen w-screen overflow-y-auto ">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/meal/:id" element={<MealDetails />} />
          <Route path="/category" element={<MealType />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          <Route path="*" element={<GlobalCatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
