import Header from "./components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Search from "./components/search/Search";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/favorite" element={<div>Favorite</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
