import { useReducer } from "react";
import MoviesContext from "./context";
import Reducer from "./reducer";
import { data } from "../../backend/database/movies/mData";
import PropTypes from 'prop-types';

export default function MoviesProvider({ children }) {
  const initialState = {
    streaming: data.latest,
    recommended: data.featured
  };

  const [state] = useReducer(Reducer, initialState);
  const { streaming, recommended } = state;
  const Trending = () => streaming;
  const Recommended = () => recommended;

  return (
    <MoviesContext.Provider
      value={{
        Trending,
        Recommended
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

MoviesProvider.propTypes = {
  children: PropTypes.node.isRequired
};