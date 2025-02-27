import axios from "axios";
import "./characters-and-comics.scss";
import "../common-elements.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../Components/loading/Loading.jsx";
import HeartIcon from "../Components/heart-icon/heartIcons.jsx";
import handleFavorites from "../handleFavorites.js";

const CharacterOrComic = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { characterId, comicId } = useParams();

  const characterOrComicEdnpoint = () => {
    if (characterId) {
      return "character";
    } else if (comicId) {
      return "comic";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--rfd99txfpp4t.code.run/${characterOrComicEdnpoint()}/${
            characterId ?? comicId
          }`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [characterId, comicId]);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="characters-and-comics container">
      <h1>Everything about :</h1>
      <article className="cards">
        <div>
          <HeartIcon
            onClick={(event) => {
              event.preventDefault();
              handleFavorites(data);
            }}
          ></HeartIcon>
          <img
            src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
            alt={data.name ?? data.title}
          />
          <h2>{data.name ?? data.title}</h2>
        </div>

        {data.description && <p>{data.description}</p>}
      </article>
    </section>
  );
};

export default CharacterOrComic;
