// import { useDebounce } from "use-debounce";
import axios from "axios";
import { useState, useEffect } from "react";
// styles
import "./characters-and-comics.scss";
import "../common-rules.scss";
// pictures
import heart from "../assets/heart-icon.png";
import hulkWalking from "../assets/hulk-walking.gif";
import angryHulk from "../assets/hulk-unsplash.jpg";
// Components
import Pagination from "../Components/Pagination";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  // const [added, setAdded] = useState(false);
  // const [value] = useDebounce(search, 1500);

  useEffect(() => {
    let url = `https://site--backend-marvel--rfd99txfpp4t.code.run/comics?apiKey=${
      import.meta.env.VITE_API_KEY
    }&page=${page}`;

    // Le filtre search s'appliquera uniquement si sa valeur est différente d'une string vide (si l'utilisateur remplit la barre de recherche).
    // Cela évite que rien ne s'affiche quand l'utilisateur ne fait pas de recherche !
    if (search !== "") {
      url += `&title=${search}`;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        // console.log("comics page data =>", data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, page]); // la requête se relancera à chaque changement de state de search qu'elle prendra en compte

  const handleFavorites = (comic) => {
    // Je veux récupérer une clé
    const itemToFind = JSON.parse(localStorage.getItem(comic._id));
    if (itemToFind === null) {
      // console.log("ajouté dans mon local storage ", itemToFind);
      localStorage.setItem(comic._id, JSON.stringify(comic));
    } else {
      // console.log("supprimé du local storage ", comic._id);
      localStorage.removeItem(comic._id);
    }
  };

  return isLoading ? (
    <div className="container loading">
      <img alt="hulk-walking" src={hulkWalking} />
      <p>Loading...</p>
    </div>
  ) : (
    <main className="characters-and-comics">
      {/* <div className="container"> */}
      <input
        type="text"
        placeholder="Looking for a specific comic?"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <h3>{`Results found : ${data.count}`}</h3>
      <h1>Comics</h1>
      <Pagination
        limit={data.limit}
        // count={data.count}
        pageNumber={page}
        setPageNumber={setPage}
      ></Pagination>

      {/* Content displayed : => */}
      {data.count === 0 ? (
        <div className="no-results">
          <p>No results were found :/</p>
          <img alt="angry-hulk" src={angryHulk} />
        </div>
      ) : (
        <section>
          {data.results.map((comic) => {
            return (
              <article key={comic._id} className="cards">
                <div>
                  <img
                    className="heart-icon"
                    src={heart}
                    alt="heart-icon"
                    onClick={(event) => {
                      event.preventDefault();
                      handleFavorites(comic);
                    }}
                  />
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                  <h2>{comic.title}</h2>
                </div>
                {comic.description && <p>{comic.description}</p>}
              </article>
            );
          })}
        </section>
      )}
      {/* </div> */}
      {/* S'il n'y a aucun résultat, pas besoin de mettre une autre pagination en bas de la page */}
      {data.count > 0 && (
        <Pagination
          limit={data.limit}
          // count={data.count}
          pageNumber={page}
          setPageNumber={setPage}
        ></Pagination>
      )}
    </main>
  );
};

export default Comics;
