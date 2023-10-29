import { useReducer } from "react";
import MoviesContext from "./context";
import Reducer from "./reducer";
import { data } from "../../backend/database/movies/mData";
import PropTypes from "prop-types";
import { PLAY, ENDSTREAM } from "../types";

export default function MoviesProvider({ children }) {
  const initialState = {
    streaming: data.latest,
    recommended: data.featured,
    mediaDetails: {
      play: false,
      info: null
    }
  };

  const [state, dispatch] = useReducer(Reducer, initialState);
  const { streaming, recommended, mediaDetails } = state;

  //----------- state methods ----------------

  const Trending = () => streaming;
  const Recommended = () => recommended;
  const Watch = (movie) => {
    console.log("watching: ", movie.title);
    dispatch({
      type: PLAY,
      payload: {
        play: true,
        info: movie
      }
    });
  };
  const EndStream = () => {
    dispatch({
      type: ENDSTREAM,
      payload: {
        play: false,
        info: null
      }
    });
  };
  // ------------- state method --------------

  return (
    <MoviesContext.Provider
      value={{
        Trending,
        Recommended,
        EndStream,
        Watch,
        Details: mediaDetails
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

MoviesProvider.propTypes = {
  children: PropTypes.node.isRequired
};
