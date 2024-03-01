import Header from "./components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Search from "./components/search/Search";
import { Provider } from "react-redux";
import store from "./store";
import MealDetails from "./components/mealDetails/MealDetails";

import MealType from "./components/Category/MealType";
import Login from "./components/login/Login";

function App() {
  return (
    <div className=" no-scrollbar h-screen w-screen overflow-y-auto ">
      <BrowserRouter>
        <Header />
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/meal/:id" element={<MealDetails />} />
            <Route path="/category" element={<MealType />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favorite" element={<div>Favorite</div>} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
