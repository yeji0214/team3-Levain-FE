import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Password from "./pages/Password";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import LetterCreate from "./pages/LetterCreate";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/password" element={<Password />} />
        <Route path="/main" element={<Main />} />
        <Route path="/letter/my" element={<MyPage />} />
        <Route path="/letter/create" element={<LetterCreate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
