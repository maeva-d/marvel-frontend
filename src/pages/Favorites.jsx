import "./common-rules.scss";
import "./favorites.scss";
import heart from "../assets/heart-icon.png";
import { useState } from "react";

const Favorites = () => {
  const [display, setDisplay] = useState("flex");
  const [page, setPage] = useState(1);
  // console.log(localStorage.length); // Ca existe ?!
  let arr = [];

  for (let i = 0; i < localStorage.length; i++) {
    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }

  // console.log("arr", arr);

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
          <div>
            {page > 1 && (
              <button
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                🢔 {page - 1}
              </button>
            )}
            <span>PAGE {page}</span>
            {arr.length > 100 && (
              <button
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                {page + 1} 🢖
              </button>
            )}
          </div>
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
          <div>
            {page > 1 && (
              <button
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                🢔 {page - 1}
              </button>
            )}
            <span>PAGE {page}</span>
            {arr.length > 100 && (
              <button
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                {page + 1} 🢖
              </button>
            )}
          </div>
        </nav>
      </div>
    </main>
  );
};

export default Favorites;
