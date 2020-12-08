import {VIDEO} from './types'

export default (state, action) => {
    switch(action.type){
        case VIDEO:
            return {
                ...state,
                video: action.payload
            }
        default:
            return state;
    }
}