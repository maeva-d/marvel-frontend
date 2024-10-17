import "./no-results.scss";
import angryHulk from "../../assets/hulk-unsplash.jpg";

const NoResults = () => {
  return (
    <div className="no-results">
      <p>No results were found :/</p>
      <img alt="angry-hulk" src={angryHulk} />
    </div>
  );
};

export default NoResults;
