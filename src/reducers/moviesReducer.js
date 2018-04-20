import * as types from '../types/movies'
import initialState from './initialState'

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
        case types.SEARCH_MOVIES_SUCCESS:
            return action.movies;
        case types.HIDE_MOVIES_SUCCESS:
            return state.filter( (item) => item.id !== action.id);
        default:
        return state
  }
}

