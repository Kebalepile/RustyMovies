import { useContext } from "react";
import MoviesContext from "../context/movies/context";

export default function Recommend() {
  const context = useContext(MoviesContext),
    movies = context.Recommended();
  const Download = () => {
    console.log("download");
  };
  return (
    <section id="recommended" className="movies-slide">
      <br />
      <h1>Recommended </h1>
      <br />
      {movies.length ? (
        <section className="poster">
          {movies.map((m, i) => {
            return (
              <figure className="poster" key={i}>
                <div className="poster_shadow"></div>
                <span className="play_button">▶</span>

                <div id="download-wrapper">
                  <button id="download" onClick={Download}>
                    download
                  </button>
                </div>

                <img src={m.poster} alt="movie poster" loading="lazy" />
                <figcaption>{m.title}</figcaption>
              </figure>
            );
          })}
        </section>
      ) : (
        <section className="temp-posters trending">
          <article className="temp-poster"></article>
          <article className="temp-poster"></article>
          <article className="temp-poster"></article>
          <article className="temp-poster"></article>
          <article className="temp-poster"></article>
          <article className="temp-poster"></article>
        </section>
      )}
    </section>
  );
}
