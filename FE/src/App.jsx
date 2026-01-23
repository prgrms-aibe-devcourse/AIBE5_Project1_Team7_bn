import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Calendar from "./pages/Calendar";
import Signup from "./pages/Signup";
import Map1 from "./pages/Map1";
import Map2 from "./pages/Map2";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/map" element={<Map />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/map1" element={<Map1 />} />
      <Route path="/map2" element={<Map2 />} />
    </Routes>
  );
}

export default App;
