import * as types from '../types/movies'
import { moviesURL } from '../utils'
import { TVShowsURL } from '../utils'

export function loadMoviesSuccess(movies, page){
    return { type: types.LOAD_MOVIES_SUCCESS, movies, page }
}
export function loadMoviesFailure(){
    return { type: types.LOAD_MOVIES_FAILURE }
}
export function hideMovieSuccess(id){
    return { type: types.HIDE_MOVIES_SUCCESS, id }
}
export function searchMovieSuccess(movies) {
    return { type: types.SEARCH_MOVIES_SUCCESS, movies }
}

export function loadMovies(page = 1,endpoint = 'popular', movie_id=0){
    return dispatch => {
        fetch(moviesURL[endpoint](page, movie_id))
        .then(response => response.json())
        .then(json => json.results)
        .then(movies => dispatch(loadMoviesSuccess(movies, page)))
        .catch(error => {
            dispatch(loadMoviesFailure())
            alert('We could not load the page at this time.')
        })
    }
}


export function loadTVShows(page = 1, endpoint = 'popular', tvshow_id=0){
    return dispatch => {
        fetch(TVShowsURL[endpoint](page, tvshow_id))
        .then(response => response.json())
        .then(json => json.results)
        .then(movies => dispatch(loadMoviesSuccess(movies, page)))
        .catch(error => {
            dispatch(loadMoviesFailure())
            alert('We could not load the page at this time.')
        })
    }
}
export function hideMovie(id){
    return dispatch => {
        dispatch(hideMovieSuccess(id));
    }
}
export function search(searchString){
    return dispatch => {
        fetch(moviesURL['search'](searchString))
        .then(response => response.json())
        .then(json => json.results)
        .then(movies => dispatch(searchMovieSuccess(movies)))
        .catch(error => {
            dispatch(loadMoviesFailure())
            alert('We could not load the page at this time.')
        })
    }
    /* return dispatch => {
        dispatch(searchMovieSuccess(searchString));
    } */
}
    