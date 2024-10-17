import "./nav-modal.scss";
import { Link } from "react-router-dom";

const NavModal = ({ onClose }) => {
  return (
    <div className="nav-modal">
      <div>
        <svg
          onClick={onClose}
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            d="m6 6l12 12m0-12L6 18"
          />
        </svg>
        <Link to="/" className="links">
          <button className="buttons-in-modal">Characters</button>
        </Link>
        <Link to="/comics" className="links">
          <button className="buttons-in-modal">Comics</button>
        </Link>
        <Link to="/favorites" className="links">
          <button className="buttons-in-modal">Favorites</button>
        </Link>
      </div>
    </div>
  );
};

export default NavModal;
