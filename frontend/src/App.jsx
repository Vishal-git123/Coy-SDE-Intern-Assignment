import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Discover from "./Pages/Discover";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
