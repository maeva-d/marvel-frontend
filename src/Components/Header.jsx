import "./header.scss";
import "../common-elements.scss";
import { Link } from "react-router-dom";
import marvel from "../assets/logo-marvel.png";

const Header = () => {
  return (
    <header className="header-component">
      <nav className="container">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 6.001H21M3 12.001H21M3 18.001H21"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
