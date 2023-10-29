import { useContext, useRef } from "react";
import MoviesContext from "../context/movies/context";

export default function Watch() {
  const dialogRef = useRef(null);
  const { Details, EndStream } = useContext(MoviesContext);
  const { play, info } = Details;

  const closeDialog = () => {
    dialogRef.current.close();
    EndStream();
  };

  return (
    <>
      {play && (
        <dialog open={play} id="watch-video" ref={dialogRef}>
          <button id="close-dialog" onClick={closeDialog}>
            x
          </button>
          <div style={{ width: "90%", height: "75%", boarderRadius: "8px" }}>
            <iframe
              src={info.iframeSrc}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              title={info.title}
            ></iframe>
          </div>
        </dialog>
      )}
    </>
  );
}
