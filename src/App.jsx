import { Routes, Route, Navigate } from "react-router-dom";
import After_Home from "./pages/After_Home";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Calendar from "./pages/Calendar";
import Signup from "./pages/Signup";
import TasteTest from "./pages/TasteTest";
import Testresult from "./pages/Testresult";
import OAuthKakaoCallback from "./pages/OAuthKakaoCallback";
import Mypage from "./pages/Mypage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/after_home" element={<After_Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/map" element={<Map />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/tastetest" element={<TasteTest />} />
      <Route path="/testresult" element={<Testresult />} />
      <Route path="/oauth/kakao/callback" element={<OAuthKakaoCallback />} />
    </Routes>
  );
}

export default App;
