import "./loading.scss";
import hulkWalking from "../assets/hulk-walking.gif";

const Loading = () => {
  return (
    <div className="container loading">
      <img alt="hulk-walking" src={hulkWalking} />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
