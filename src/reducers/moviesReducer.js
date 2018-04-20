import * as types from '../types/movies'
import initialState from './initialState'
import _ from 'lodash'
export default function moviesReducer(state = initialState.movies, action){
    switch(action.type){
        case types.LOAD_MOVIES_SUCCESS:
            if(action.page === 1) {
                return action.movies
            }
            else {
                return [
                    ...state,
                    ...action.movies,
                ]
            }
            break;
        case types.SEARCH_MOVIES_SUCCESS:
            return action.movies;
            break;
        case types.HIDE_MOVIES_SUCCESS:
            return state.filter( (item) => item.id !== action.id);
            break;
        default:
        return state
  }
}

