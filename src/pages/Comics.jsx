import "./common-rules.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import heart from "../assets/heart-icon.png";
// import { useDebounce } from "use-debounce";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  // const [value] = useDebounce(search, 1500);
  const [page, setPage] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    // / ! \ faire une variable denv plus tard !!!
    let url = `https://site--backend-marvel--rfd99txfpp4t.code.run/comics?apiKey=${
      import.meta.env.VITE_API_KEY
    }&page=${page}`;

    // Le filtre search s'appliquera uniquement si sa valeur est différente d'une string vide (si l'utilisateur rempli la barre de recherche).
    // Cela évite que rien ne s'affiche quand l'utilisateur ne fait pas de recherche !

    if (search !== "") {
      url += `&title=${search}`;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        // console.log(value);
        setData(response.data);
        console.log("comics page data =>", data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, page]); // la requête se relancera à chaque changement de state de search et prendra en compte l'input

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
    <p className="container">Loading...</p>
  ) : (
    <main className="common-rules">
      {/* <div className="container"> */}
      <input
        type="text"
        placeholder="Looking for a specific comic?"
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
      <h1>Comics</h1>
      <section>
        {data.results.map((comic) => {
          return (
            <article key={comic._id}>
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
      {/* </div> */}
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

export default Comics;
