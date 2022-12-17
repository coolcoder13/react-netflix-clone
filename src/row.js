import React, { useCallback, useEffect, useState } from "react";
import instance from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./row.css";

const base_url_img = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      console.log(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  const handleClick = useCallback(
    (movie) => {
      if (trailerUrl) {
        setTrailerUrl("");
      } else {
        movieTrailer(movie?.name || "")
          .then((url) => {
            if (!url) alert("Some error");
            const urlParam = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParam.get("v"));
          })
          .catch((error) => console.log(error));
      }
    },
    [trailerUrl]
  );

  const opts = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };
  return (
    <div className="row">
      <div className="row__posters">
        {movies.map((movie, ix) => {
          return (
            <img
              key={ix}
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
              src={`${base_url_img}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
