import { useReducer } from "react";
import MoviesContext from "./context";
import Reducer from "./reducer";
import { data } from "../../backend/database/movies/mData";
import PropTypes from "prop-types";

export default function MoviesProvider({ children }) {
  const initialState = {
    streaming: data.latest,
    recommended: data.featured,
    watch: false
  };

  const [state] = useReducer(Reducer, initialState);
  const { streaming, recommended } = state;

  //----------- state methods ----------------

  const Trending = () => streaming;
  const Recommended = () => recommended;
  const Watch = (movie) => {
    console.log("watching: ", movie.title);
  };
  // ------------- state method --------------

  return (
    <MoviesContext.Provider
      value={{
        Trending,
        Recommended,
        Watch
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

MoviesProvider.propTypes = {
  children: PropTypes.node.isRequired
};
