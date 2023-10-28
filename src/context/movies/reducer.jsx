import { STREAMING, RECOMMENDED } from "../types";

export default function Reducer(state, action) {
  switch (action.type) {
    case STREAMING:
    case RECOMMENDED:
      return { ...state, ...action.payload };
      
    default:
      return state;
  }
}
