// import { useDebounce } from "use-debounce";
import axios from "axios";
import { useState, useEffect } from "react";
// import { ReactSearchAutocomplete } from "react-search-autocomplete";
import handleFavorites from "../handleFavorites";
// styles
import "../common-elements.scss";
import "./characters-and-comics.scss";
// Components
import Loading from "../Components/loading/Loading";
import NoResults from "../Components/no-results/NoResults";
import Pagination from "../Components/pagination/Pagination";
import HeartIcon from "../Components/heart-icon/heartIcons";

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
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, page]); // la requête se relancera à chaque changement de state de search qu'elle prendra en compte

  // const searchItem = [{id: }]

  // for (let i = 0; i < data.results[i]._id; i++) {
  //   const searchItem = [{id : data.results[i]._id}, {name : data.results[i].title}];
  // }

  // const handleResearch = (str, results) => {

  // }

  return isLoading ? (
    <Loading />
  ) : (
    <main className="layout">
      <div className="container characters-and-comics">
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
            {data.results.map((comic) => {
              return (
                <article key={comic._id} className="cards">
                  <div>
                    <HeartIcon
                      onClick={(event) => {
                        event.preventDefault();
                        handleFavorites(comic);
                      }}
                    ></HeartIcon>
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
      </div>
      {data.count > 0 && (
        <Pagination
          limit={data.limit}
          pageNumber={page}
          setPageNumber={setPage}
        ></Pagination>
      )}
    </main>
  );
};

export default Comics;
