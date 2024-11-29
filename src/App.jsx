// yarn add axios react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components
import Header from "./Components/header/Header";
// pages
import Characters from "./pages/Characters";
import ComicsPerCharacter from "./pages/ComicsPerCharacter";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import CharacterOrComic from "./pages/CharacterOrComic";

const App = () => {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/comics/:characterId" element={<ComicsPerCharacter />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/character/:characterId" element={<CharacterOrComic />} />
        <Route path="/comic/:comicId" element={<CharacterOrComic />} />
      </Routes>
    </Router>
  );
};

export default App;
