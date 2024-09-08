import "./common-rules.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import heart from "../assets/heart-icon.png";

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
        setData(response.data);
        console.log(data);
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
    <p className="container">Loading...</p>
  ) : (
    <main className="common-rules">
      {/* <div className="container"> */}
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
          {data.comics.length >= 100 && (
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
      <h1>{`Here is a list of all the comics ${data.name} is featured in :`}</h1>
      <section>
        {data.comics.map((comic) => {
          return (
            <article key={comic._id}>
              <div>
                <img
                  src={heart}
                  alt="heart-icon"
                  className="heart-icon"
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
              {comic.description !== "" && <p>{comic.description}</p>}
            </article>
          );
        })}
      </section>
      {/* </div> */}
    </main>
  );
};

export default ComicsPerCharacter;
