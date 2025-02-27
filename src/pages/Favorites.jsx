import { useState } from "react";
import { Link } from "react-router-dom";
import handleFavorites from "../handleFavorites";
// styles
import "../common-elements.scss";
import "./favorites.scss";
// Components
import Pagination from "../Components/pagination/Pagination";
import HeartIcon from "../Components/heart-icon/heartIcons";

const Favorites = () => {
  const [display, setDisplay] = useState("flex");
  const [page, setPage] = useState(1);

  // console.log(localStorage.length); // Ca existe ?!
  let arr = [];
  for (let i = 0; i < localStorage.length; i++) {
    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }

  return (
    <main className="layout">
      <div className="container favorites">
        <div>
          <h1>Your favorites</h1>
          <p>Favorites saved: {arr.length} </p>
        </div>
        <nav>
          {arr.length > 0 && (
            <Pagination
              limit={arr.length}
              pageNumber={page}
              setPageNumber={setPage}
            ></Pagination>
          )}
        </nav>

        <menu>
          {arr.map((fav) => {
            return (
              <Link
                to={fav.name ? `/character/${fav._id}` : `/comic/${fav._id}`}
                key={fav._id}
                className={`${display} favorite-card`}
              >
                <article>
                  <div>
                    <span>{fav.name ? "(characters)" : "(comics)"}</span>
                    <HeartIcon
                      onClick={(event) => {
                        event.preventDefault();
                        handleFavorites(fav, display, setDisplay);
                      }}
                    ></HeartIcon>
                  </div>
                  <h2>{fav.name ?? fav.title}</h2>
                  <img
                    src={`${fav.thumbnail.path}.${fav.thumbnail.extension}`}
                    alt={fav.name}
                  />
                </article>
              </Link>
            );
          })}
        </menu>
        <nav>
          {arr.length >= 10 && (
            <Pagination
              limit={arr.length}
              pageNumber={page}
              setPageNumber={setPage}
            ></Pagination>
          )}
        </nav>
      </div>
    </main>
  );
};

export default Favorites;
