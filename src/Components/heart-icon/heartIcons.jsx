import heart from "../../assets/heart-icon.png";
import "./heart-icons.scss";

const HeartIcon = ({ onClick }) => {
  return (
    <div className="heart-icon">
      <img src={heart} alt="heart-icon" onClick={onClick} />
    </div>
  );
};

export default HeartIcon;
