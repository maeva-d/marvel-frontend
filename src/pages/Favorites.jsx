import { useState } from "react";
// styles
import "./styles.scss";
import "./favorites.scss";
// pictures
import heart from "../assets/heart-icon.png";
// Components
import Pagination from "../Components/Pagination";

const Favorites = () => {
  const [display, setDisplay] = useState("flex");
  const [page, setPage] = useState(1);

  // console.log(localStorage.length); // Ca existe ?!
  let arr = [];
  for (let i = 0; i < localStorage.length; i++) {
    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }

  const handleFavorites = (fav) => {
    // Je veux récupérer une clé
    const itemToFind = JSON.parse(localStorage.getItem(fav._id));
    if (itemToFind === null) {
      // console.log("ajouté dans mon local storage ", itemToFind);
      localStorage.setItem(fav._id, JSON.stringify(fav));
      setDisplay("flex");
    } else {
      // console.log("supprimé du local storage ", fav._id);
      localStorage.removeItem(fav._id);
      setDisplay("none");
    }
  };

  return (
    <main className="fav-page">
      <div className="container">
        <nav>
          <h1>Your favorites</h1>
          {arr.length > 0 && (
            <Pagination
              limit={arr.length}
              pageNumber={page}
              setPageNumber={setPage}
            ></Pagination>
          )}
          <p>Favorites saved: {arr.length} </p>
        </nav>

        <menu>
          {arr.map((fav) => {
            // console.log("fav elem", fav);
            return (
              <section className={display} key={fav._id}>
                <div>
                  {fav.name ? (
                    <span>(characters)</span>
                  ) : (
                    <span>(comics) </span>
                  )}
                  <img
                    src={heart}
                    alt="heart-icon"
                    onClick={(event) => {
                      event.preventDefault();
                      handleFavorites(fav);
                    }}
                  />
                </div>
                {fav.name ? <h2>{fav.name}</h2> : <h2>{fav.title}</h2>}
                <img
                  src={`${fav.thumbnail.path}.${fav.thumbnail.extension}`}
                  alt={fav.name}
                />
              </section>
            );
          })}
        </menu>
        <nav>
          {arr.length >= 8 && (
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
