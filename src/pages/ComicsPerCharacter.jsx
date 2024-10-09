import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// styles
import "../common-elements.scss";
import "./characters-and-comics.scss";
// Components
import Loading from "../Components/Loading";
import Pagination from "../Components/Pagination";
import HeartIcon from "../Components/heartIcons";

const ComicsPerCharacter = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  // NE PAS OUBLIER CA :
  const { characterId } = useParams();

  useEffect(() => {
    let url = `https://site--backend-marvel--rfd99txfpp4t.code.run/comics/${characterId}?apiKey=${
      import.meta.env.VITE_API_KEY
    }&page=${page}`;

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [characterId, page]);

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
    <Loading />
  ) : (
    <main className="layout">
      <div className="container characters-and-comics">
        <h3>{`Results found : ${data.comics.length}`}</h3>
        <h1>{`Here is a list of all the comics ${data.name} is featured in :`}</h1>
        <Pagination
          limit={data.comics.length}
          pageNumber={page}
          setPageNumber={setPage}
        ></Pagination>

        <section>
          {data.comics.map((comic) => {
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
                {comic.description !== "" && <p>{comic.description}</p>}
              </article>
            );
          })}
        </section>
      </div>
      <Pagination
        limit={data.comics.length}
        pageNumber={page}
        setPageNumber={setPage}
      ></Pagination>
    </main>
  );
};

export default ComicsPerCharacter;
