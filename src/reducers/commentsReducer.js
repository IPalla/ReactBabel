import * as types from '../types/comments'
import initialState from './initialState'

export default function commentsReducer(state = initialState.comments, action){
    switch(action.type){
        case types.LOAD_COMMENTS_SUCCESS:
            return action.comments
        case types.CREATE_COMMENT_SUCCESS:
            return [...state, action.comment]
            
        case types.DELETE_COMMENT_SUCCESS:
            return state.filter(comment => {
                return comment.id != action.id
            });
            break;
        case types.UPDATE_COMMENT_SUCCESS:
            return [ ...state.filter(comment => {
                return comment.id != action.comment.id
            }), action.comment];
            break;
        default:
            return state
  }
}
