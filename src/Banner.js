import React, { useEffect, useState } from "react";
import requests from "./requests";
import instance from "./axios";
import "./Banner.css";
const Banner = () => {
  const [movie, setMovie] = useState();

  useEffect(() => {
    async function fetchData() {
        const request = await instance.get(requests.fetchNetflixOriginals);
        let random = Math.floor(Math.random() * request.data.results.length);
        console.log(request, random);
        setMovie(request.data.results[random]);
        return request;
    }

    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <div className="banner__description">
          {truncate(movie?.overview, 150)}
        </div>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
};

export default Banner;
