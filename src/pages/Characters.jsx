import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import handleFavorites from "../handleFavorites";
// styles
import "../common-elements.scss";
import "./characters-and-comics.scss";
// Components
import Loading from "../Components/Loading";
import NoResults from "../Components/NoResults";
import Pagination from "../Components/Pagination";
import HeartIcon from "../Components/heartIcons";

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
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [search, page]); // la requête se relancera à chaque changement de state de search et prendra en compte l'input

  return isLoading ? (
    <Loading />
  ) : (
    <main className="layout">
      <div className="container characters-and-comics">
        <input
          type="text"
          placeholder="Looking for a specific character?"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <h3>{`Results found : ${data.count}`}</h3>
        <h1>Characters</h1>
        {data.count > 0 && (
          <Pagination
            limit={data.limit}
            pageNumber={page}
            setPageNumber={setPage}
          ></Pagination>
        )}

        {data.count === 0 ? (
          <NoResults />
        ) : (
          <section>
            {data.results.map((character) => {
              return (
                <Link
                  to={`comics/${character._id}?apiKey=${
                    import.meta.env.VITE_API_KEY
                  }`}
                  key={character._id}
                >
                  <article key={character._id} className="cards pointer">
                    <div>
                      <HeartIcon
                        onClick={(event) => {
                          event.preventDefault();
                          handleFavorites(character);
                        }}
                      ></HeartIcon>
                      <img
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt={character.name}
                      />
                      <h2>{character.name}</h2>
                    </div>

                    {character.description !== "" && (
                      <p>{character.description}</p>
                    )}
                  </article>
                </Link>
              );
            })}
          </section>
        )}
        {data.count > 0 && (
          <Pagination
            limit={data.limit}
            pageNumber={page}
            setPageNumber={setPage}
          ></Pagination>
        )}
      </div>
    </main>
  );
};

export default Characters;
