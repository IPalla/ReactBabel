import * as types from '../types/tvshow'
import initialState from './initialState'

export default function tvshowReducer(state = initialState.tvshow, action){
    switch(action.type){
        case types.LOAD_TVSHOW_SUCCESS:
            return action.tvshow
        default:
            return state
  }
}
