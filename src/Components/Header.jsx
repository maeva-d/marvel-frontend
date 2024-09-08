// import ".App.css";
import "./header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header-component">
      <nav className="container">
        <img src="./src/assets/logo-marvel.png" alt="marvel-logo" />
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
