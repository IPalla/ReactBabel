import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import logo from '../../images/logo.svg'
import * as moviesActions from '../../actions/moviesActions'

class Header extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            numberOfMovies: props.numberOfMovies,
            searchString: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            numberOfMovies: nextProps.numberOfMovies
        })
    }
    search = (e) => {
        const searchString = e.target.value;
        const { moviesActions } = this.props;
        let path = window.location.pathname.split('/')[1];
        if (!path){
            path='movies';
        }
        this.setState({searchString: searchString});
        if (searchString !== ''){
            moviesActions.search(searchString);
        } else {
            if (path === 'movies'){
                moviesActions.loadMovies()
            } else if (path === 'tv-shows'){
                moviesActions.loadTVShows()
            }
        }
    }
    render() {
        const { searchString } = this.state
        return (
            <div className="row">
            <header className="main-nav d-flex col-12" style={{flexDirection: 'column'}}>
            <div className="logo-wrapper d-flex">
                <Link to={`/`}> <img src={logo} alt="TMDB"/> </Link>
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to={`/tv-shows`}>TV Shows</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={`/movies`}>Movies</Link>
                            </li>
                            <input type="text" placeholder="Search.." onChange={this.search} value={searchString}></input>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        numberOfMovies: state.movies.length,
        movies: state.movies
    }
}

function mapDispatchToProps(dispatch){
    return {
        moviesActions: bindActionCreators(moviesActions, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)