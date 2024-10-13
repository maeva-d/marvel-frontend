import "./nav-buttons.scss";
import { Link } from "react-router-dom";

const NavButtons = ({ link, children }) => {
  return (
    <Link to={link}>
      <button>{children}</button>
    </Link>
  );
};

export default NavButtons;
