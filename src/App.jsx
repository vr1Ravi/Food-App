import Header from "./components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Search from "./components/search/Search";
import { useDispatch } from "react-redux";

import MealDetails from "./components/mealDetails/MealDetails";
import MealType from "./components/Category/MealType";
import Login from "./components/login/Login";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { loadUser } from "./api/api";

function App() {
  const dispatch = useDispatch();
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
          <Route path="/login" element={<Login />} />
          <Route path="/favorite" element={<div>Favorite</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
