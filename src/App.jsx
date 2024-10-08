// import "./App.scss";
// yarn add axios react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./Components/Header";

// pages
import Characters from "./pages/Characters";
import ComicsPerCharacter from "./pages/ComicsPerCharacter";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";

const App = () => {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/comics/:characterId" element={<ComicsPerCharacter />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default App;
