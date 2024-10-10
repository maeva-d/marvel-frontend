import "./header.scss";
import "../common-elements.scss";
import { Link } from "react-router-dom";
import marvel from "../assets/logo-marvel.png";

const Header = () => {
  return (
    <header className="header-component">
      <nav className="container">
        <img src={marvel} alt="marvel-logo" />
        <div>
          <Link to="/">
            <button>Characters</button>
          </Link>
          <Link to="/comics">
            <button>Comics</button>
          </Link>
          <Link to="/favorites">
            <button>Favorites</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
