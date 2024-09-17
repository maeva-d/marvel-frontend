import "./common-rules.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heart from "../assets/heart-icon.png";

// require("dotenv").config();

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  // const [added, setAdded] = useState([]);

  useEffect(() => {
    let url = `https://site--backend-marvel--rfd99txfpp4t.code.run/characters?apiKey=${
      import.meta.env.VITE_API_KEY
    }&page=${page}`;

    // Le filtre search s'appliquera uniquement si sa valeur est différente d'une string vide (si l'utilisateur rempli la barre de recherche).
    // Cela évite que rien ne s'affiche quand l'utilisateur ne fait pas de recherche !
    if (search !== "") {
      url += `&name=${search}`;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        console.log("characeters page data =>", data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [search, page]); // la requête se relancera à chaque changement de state de search et prendra en compte l'input

  const handleFavorites = (character) => {
    // Je veux récupérer une clé
    const itemToFind = JSON.parse(localStorage.getItem(character._id));
    if (itemToFind === null) {
      // console.log("ajouté dans mon local storage ", itemToFind);
      localStorage.setItem(character._id, JSON.stringify(character));
    } else {
      // console.log("supprimé du local storage ", character._id);
      localStorage.removeItem(character._id);
    }
  };

  return isLoading ? (
    <p className="container">Loading...</p>
  ) : (
    <main className="common-rules">
      {/* <div className="container"></div> */}
      <input
        type="text"
        placeholder="Looking for a specific character?"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <nav>
        <h3>{`Results found : ${data.count}`}</h3>
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
          {data.limit >= 100 && (
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

      <h1>Characters</h1>
      <section>
        {data.results.map((character) => {
          return (
            <Link
              to={`comics/${character._id}?apiKey=${
                import.meta.env.VITE_API_KEY
              }`}
              key={character._id}
            >
              <article key={character._id} className="pointer">
                <div>
                  <img
                    className="heart-icon"
                    // style={{ opacity: added }}
                    onClick={(event) => {
                      event.preventDefault();
                      handleFavorites(character);
                    }}
                    src={heart}
                    alt="heart-icon"
                  />
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                  />
                  <h2>{character.name}</h2>
                </div>

                {character.description !== "" && <p>{character.description}</p>}
              </article>
            </Link>
          );
        })}
      </section>
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
          {data.limit >= 100 && (
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
    </main>
  );
};

export default Characters;
