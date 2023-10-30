import { useContext } from "react";
import MoviesContext from "../context/movies/context";
import posterImg from "/assets/img/stream.jpg"

export default function Trending() {
  const context = useContext(MoviesContext),
    movies = context.Trending();
  // const Download = () => {
  //   console.log("download");
  // };
 
  return (
    <section id="trending" className="movies-slide">
      <br />
      <h1>Streaming Now</h1>
      <br />
      {movies.length ? (
        <section className="posters">
          {movies.map((m, i) => {
            return (
              <figure className="poster" key={i}onClick={() =>context.Watch(m)} onContextMenu={e => e.preventDefault()}>
                <div className="poster_shadow"></div>
                <span className="play_button">▶</span>
            
                {/* <div id="download-wrapper">
                  <button id="download" onClick={Download}>
                    download
                  </button>
                </div> */}

                <img src={posterImg} alt="movie poster" loading="lazy" />
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
