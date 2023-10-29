import { STREAMING, RECOMMENDED, ENDSTREAM, PLAY } from "../types";

export default function Reducer(state, action) {
  switch (action.type) {
    case ENDSTREAM:
    case PLAY:
      return { ...state, mediaDetails: action.payload };

    case STREAMING:
    case RECOMMENDED:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
