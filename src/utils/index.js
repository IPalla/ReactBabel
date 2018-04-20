export const moviesURL = {
    upcoming: page => {
        return `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    topRated: page => {
        return `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    popular: page => {
        return `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    similar: (page, movie_id) => {
        return `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    recommended: (page, movie_id) => {
        return `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    search: (query) => {
        return `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=1`
    }
}
export const TVShowsURL = {
    topRated: page => {
        return `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    airing: page => {
        return `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    popular: page => {
        return `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    similar: (page, tvshow_id) => {
        return `https://api.themoviedb.org/3/tv/${tvshow_id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    recommended: (page, tvshow_id) => {
        return `https://api.themoviedb.org/3/tv/${tvshow_id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    search: (query) => {
        return `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=1`
    }
}
