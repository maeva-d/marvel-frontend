import "../../common-elements.scss";
import "./header.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import NavModal from "../navigation/NavModal";
import marvel from "../../assets/logo-marvel.png";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "scroll";
      };
    }
  }, [showModal]);

  const modalRoot = document.getElementById("modal");

  return (
    <header className="header-component">
      <nav className="container">
        <svg
          onClick={() => setShowModal(true)}
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
          <Link to="/" className="links">
            <button className="buttons-in-header">Characters</button>
          </Link>
          <Link to="/comics" className="links">
            <button className="buttons-in-header">Comics</button>
          </Link>
          <Link to="/favorites" className="links">
            <button className="buttons-in-header">Favorites</button>
          </Link>
        </div>
        {showModal &&
          createPortal(
            <NavModal onClose={() => setShowModal(false)} />,
            modalRoot
          )}
      </nav>
    </header>
  );
};

export default Header;
