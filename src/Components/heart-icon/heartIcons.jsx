import heart from "../../assets/heart-icon.png";
import "./heart-icons.scss";

const HeartIcon = ({ onClick }) => {
  return (
    <img
      className="heart-icon"
      // style={{ opacity: added }}
      src={heart}
      alt="heart-icon"
      onClick={onClick}
    />
  );
};

export default HeartIcon;
