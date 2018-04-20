import * as types from '../types/comments';

const URL_FILM_COMMENTS = 'http://localhost:3010/film_comments/?movieId=';
const URL_TVSHOWS_COMMENTS = 'http://localhost:3010/tvshows_comments/?tvshowId=';
const URL_FILM_COMMENTS_ADD = 'http://localhost:3010/film_comments/';
const URL_TVSHOWS_COMMENTS_ADD = 'http://localhost:3010/tvshows_comments/';

export function loadCommentsSuccess(comments){
    return { type: types.LOAD_COMMENTS_SUCCESS, comments }
}
export function createCommentSuccess(comment){
    return { type: types.CREATE_COMMENT_SUCCESS, comment }
}
export function updateCommentSuccess(comment){
    return { type: types.UPDATE_COMMENT_SUCCESS, comment }
}
export function deleteCommentSuccess(id){
    return { type: types.DELETE_COMMENT_SUCCESS, id }
}
export function loadCommentsFailure(){
    return { type: types.LOAD_COMMENTS_FAILURE }
}

export function deleteComment(id = 1, path){
    let url;
    (path === 'movies') ? url = URL_FILM_COMMENTS_ADD : url = URL_TVSHOWS_COMMENTS_ADD;
    return dispatch => {
        fetch(url+id, {
            method: "DELETE"
          })
        .then(response => dispatch(deleteCommentSuccess(id)))
        .catch(error => {
            dispatch(loadCommentsFailure())
            alert(error)
        })
    }
}

export function loadComments(id = 1, path){
    let url;
    (path === 'movies') ? url = URL_FILM_COMMENTS : url = URL_TVSHOWS_COMMENTS;
    
    return dispatch => {
        fetch(url+id)
        .then(response => response.json())
        .then(comments => dispatch(loadCommentsSuccess(comments)))
        .catch(error => {
            dispatch(loadCommentsFailure())
            alert(error)
        })
    }
}
export function updateComment(id, body, user, movieId, path){
    let url;
    (path === 'movies') ? url = URL_FILM_COMMENTS_ADD : url = URL_TVSHOWS_COMMENTS_ADD;
    
    const comment = {
        user: user,
        movieId:  movieId,
        body: body,
    };
    return dispatch => {
        fetch(url + id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: "PUT",
            body: JSON.stringify(comment)
          })
        .then(res=>res.json())
        .then(response => {
            dispatch(updateCommentSuccess(response));
        })
        .catch(error => {
            dispatch(loadCommentsFailure())
            alert('No se editó el comentario')
        })
    }
}
export function createComment(id=1, username, content, path){
    let url;
    (path === 'movies') ? url = URL_FILM_COMMENTS_ADD : url = URL_TVSHOWS_COMMENTS_ADD;
    const comment = {
        user: username,
        body: content,
        movieId: id
    };
    return dispatch => {
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: "POST",
            body: JSON.stringify(comment)
          })
        .then(res=>res.json())
        .then(response => {
            dispatch(createCommentSuccess(response));
        })
        .catch(error => {
            dispatch(loadCommentsFailure())
            alert('No se creo el comentario')
        })
    }
}