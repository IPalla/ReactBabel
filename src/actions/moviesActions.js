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
    // TODO para cargar de ambas fuentes //
    /* Promise.all([fetch(TVShowsURL[endpoint](page, tvshow_id)) , fetch('http://localhost:3010/movies/')]).then(results => {
        const res1=results[0];
        const res2=results[1];
        return [res1.json(), res2.json()];
    }).then(results=>{
        console.log(results);}
    ); */
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

export function editTvshow(show){
    const url =  'http://localhost:3010/tv_shows/';
    return dispatch => {
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: "POST",
            body: JSON.stringify(show)
          })
        .catch(error => {
            alert('No se creo el comentario')
        })
    }
}

export function editMovie(movie){
    const url =  'http://localhost:3010/movies/';
    /* const movieO = {
        id : movie.id,
        title : movie.title,
        moveId : movie.moveId,
        backdrop_path : movie.backdrop_path,
        poster_path : movie.poster_path,
        overview:   movie.overview,
    } */

    return dispatch => {
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: "POST",
            body: JSON.stringify(movie)
          })
        .catch(error => {
            alert('No se creo el comentario')
        })
    }
}