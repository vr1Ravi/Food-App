import Header from "./components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Search from "./components/search/Search";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<div>Login</div>} />
            <Route path="/favorite" element={<div>Favorite</div>} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
