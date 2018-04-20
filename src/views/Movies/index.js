import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import Movie from '../../components/Movie'

import * as moviesActions from '../../actions/moviesActions'

class Movies extends React.Component {
    constructor(props) {
        super(props);
        let isDefault, path, nowViewing;
        // (this.props.path) ? path = this.props.path :  this.props.match.path.slice(1, this.props.match.path.length);
        path = 'movies';
        ( this.props.isDefault === undefined) ? isDefault = true : isDefault = this.props.isDefault;
        ( this.props.nowViewing === undefined) ? nowViewing = 'popular' : nowViewing = this.props.nowViewing;
        this.state = {
            movies: [],
            page: 1,
            loadingMovies: false,
            nowViewing: nowViewing,
            sortBy: 'title-asc',
            viewingThisYearOnly: false,
            path: path,
            isDefault: isDefault,
            defaultId: this.props.defaultId,
        }
    }

    
    componentDidMount(){
        const { nowViewing, page, endpoint } = this.state
        if (endpoint){
            this.loadAction(page, nowViewing);
        } else {
            this.loadAction(page, nowViewing);
        }
        window.addEventListener("scroll", this.infiniteScroller, false);
    }

    infiniteScroller =  e => {
        const { page, nowViewing } = this.state
        const scrollTop = window.scrollY
        const trackLength = document.querySelector('body').scrollHeight - window.innerHeight
        const pctScrolled = Math.floor(scrollTop/trackLength * 100)
        if(pctScrolled > 95 && !this.state.loadingMovies) {
            this.loadAction(page, nowViewing)
            this.setState({
                loadingMovies: true
            })
        }
    }
    loadAction = (page, nowViewing) => {
        const { moviesActions } = this.props
        const { path, defaultId } = this.state;
        if (path === 'movies'){
            moviesActions.loadMovies(page, nowViewing, defaultId)
        } else if (path === 'tv-shows'){
            moviesActions.loadTVShows(page, nowViewing, defaultId)
        }
        
    }
    componentWillUnmount() {
        // you need to unbind the same listener that was binded.
        window.removeEventListener('scroll', this.infiniteScroller, false);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.movies.length > this.state.movies.length) {
            this.setState({
                loadingMovies: false,
                page: this.state.page + 1,
                movies: nextProps.movies
            })
        }
        else {
            this.setState({
                movies: nextProps.movies,
                loadingMovies: false
            })
        }
    }

    onViewingChange = e => {
        const nowViewing = e.target.value
        this.loadAction(1, nowViewing)
        this.setState({
            page: 2,
            loadingMovies: true,
            nowViewing
        })
    }

    onSortChange = e => {
        this.setState({sortBy: e.target.value})
    }

    sortMovies = movies => {
        const { sortBy } = this.state
        const sorting = sortBy.split('-')

        return _.orderBy(movies, sorting[0], sorting[1])
    }

    onToggleViewingThisYearOnly = e => {
        this.setState({viewingThisYearOnly: !this.state.viewingThisYearOnly})
    }

    filterMovies = movies => {
        const { path } = this.state;
        if (path === 'movies'){
            return movies.filter(movie => {
                return movie.release_date.includes('2018')
            })
        } else if (path === 'tv-shows'){
            return movies.filter(movie => {
                return movie.first_air_date.includes('2018')
            })
        }
        
    }

    prepareMovies = movies => {
        const { viewingThisYearOnly } = this.state
        let filteredMovies = viewingThisYearOnly ? this.filterMovies(movies) : movies;
        return this.sortMovies(filteredMovies)
    }

    render() {
        const { movies, nowViewing, sortBy, viewingThisYearOnly, path, isDefault } = this.state;
        const pathO = { path: path };
        return (
            <section className="container main movies">
                <header className="row">
                    <div className="col-12">
                        {isDefault && <h1>{movies.length > 0 ? path : 'Loading...'}</h1>}
                        {!isDefault && <h1>{movies.length > 0 ? nowViewing : 'Loading...'}</h1>}
                    </div>
                </header>
                <aside className="row">
                    {isDefault && <div className="form-group" >
                        <label>Now viewing:</label>
                        <select className="form-control" onChange={this.onViewingChange} defaultValue={nowViewing}>
                            <option value="popular">Popular</option>
                            <option value="topRated">Top Rated</option>
                            <option value= {(path==='movies') ? 'upcoming' : 'airing' }>{(path==='movies') ? 'Upcoming' : 'Airing today'}</option>
                        </select>
                    </div> }
                    <div className="form-group">
                        <label>Sort by:</label>
                        <select className="form-control" onChange={this.onSortChange} defaultValue={sortBy}>
                            <option value={(path==='movies') ? 'title-asc' : 'original_name-asc' }>Title (Asc)</option>
                            <option value={(path==='movies') ? 'title-desc' : 'original_name-desc' }>Title (Desc)</option>
                            <option value="popularity-asc">Less Popular</option>
                            <option value="popularity-desc">More Popular</option>
                            <option value="vote_average-asc">Worst</option>
                            <option value="vote_average-desc">Best</option>
                            <option value={(path==='movies') ? 'release_date-asc' : 'first_air_date-asc' }>Oldest</option>
                            <option value={(path==='movies') ? 'release_date-desc' : 'first_air_date-desc' }>Newest</option>
                        </select>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" onChange={this.onToggleViewingThisYearOnly} type="checkbox" checked={viewingThisYearOnly} />
                            View this year only
                        </label>
                    </div>
                </aside>
                <div className="row movie-list-wrapper">
                    {this.prepareMovies(movies).map((movie, i) => {
                        return (
                            <Movie
                                key={i}
                                { ...movie}{...pathO} 
                            />
                        )
                    })}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        movies: state.movies
    }
}

function mapDispatchToProps(dispatch){
    return {
        moviesActions: bindActionCreators(moviesActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies)

