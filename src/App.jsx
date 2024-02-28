import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/favorite" element={<div>Favorite</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
