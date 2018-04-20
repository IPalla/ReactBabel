import * as types from '../types/tvshow'
import { moviesURL } from '../utils'

export function loadTVShowSuccess(tvshow){
    return { type: types.LOAD_TVSHOW_SUCCESS, tvshow }
}

export function loadTVShowFailure(){
    return { type: types.LOAD_TVSHOW_FAILURE }
}

export function loadTVShow(id){
    return dispatch => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        .then(response => response.json())
        .then(movie => dispatch(loadTVShowSuccess(movie)))
        .catch(error => {
            dispatch(loadTVShowFailure())
            alert('We could not load the page at this time.')
        })
    }
}






