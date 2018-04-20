import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import movies from './moviesReducer'
import movie from './movieReducer'
import tvshow from './tvshowReducer'
import comments from './commentsReducer'

const rootReducer = combineReducers({
    movies, 
    movie,
    tvshow,
    comments,
    router: routerReducer
})

export default rootReducer