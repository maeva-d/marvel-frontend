import { useState } from "react";
import handleFavorites from "../handleFavorites";
// styles
import "../common-elements.scss";
import "./favorites.scss";
// Components
import Pagination from "../Components/Pagination";
import HeartIcon from "../Components/heartIcons";

const Favorites = () => {
  const [display, setDisplay] = useState("flex");
  const [page, setPage] = useState(1);

  // console.log(localStorage.length); // Ca existe ?!
  let arr = [];
  for (let i = 0; i < localStorage.length; i++) {
    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }

  // const handleFavorites = (fav) => {
  //   // Je veux récupérer une clé
  //   const itemToFind = JSON.parse(localStorage.getItem(fav._id));
  //   if (itemToFind === null) {
  //     // console.log("ajouté dans mon local storage ", itemToFind);
  //     localStorage.setItem(fav._id, JSON.stringify(fav));
  //     setDisplay("flex");
  //   } else {
  //     // console.log("supprimé du local storage ", fav._id);
  //     localStorage.removeItem(fav._id);
  //     setDisplay("none");
  //   }
  // };

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
            // console.log("fav elem", fav);
            return (
              <article className={`${display} favorite-card`} key={fav._id}>
                <div>
                  <span>{fav.name ? "(characters)" : "(comics)"}</span>
                  <HeartIcon
                    onClick={(event) => {
                      event.preventDefault();
                      handleFavorites(fav, display, setDisplay);
                    }}
                  ></HeartIcon>
                </div>
                <h2>{fav.name || fav.title}</h2>
                <img
                  src={`${fav.thumbnail.path}.${fav.thumbnail.extension}`}
                  alt={fav.name}
                />
              </article>
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
