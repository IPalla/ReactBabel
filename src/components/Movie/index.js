import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as moviesActions from '../../actions/moviesActions'

class Movie extends React.Component {
    constructor(props) {
        super(props) 

        const {poster_path, id, title, overview, path, original_name} = props;
        this.state = {
            poster_path: poster_path,
            id: id,
            title: title,
            overview: overview,
            path: path,
            original_name: original_name,
        }
    }

    
    componentDidMount(){
        
    }

    componentWillReceiveProps({poster_path, id, title, overview, path, original_name}){
        this.setState({
            poster_path: poster_path,
            id: id,
            title: title,
            overview: overview,
            path: path,
            original_name: original_name,
        });
    }

    dontShow = (e) => {
        const { id } = this.state;
        const { moviesActions } = this.props;
        e.preventDefault();
        moviesActions.hideMovie(id);
    }
    render(){
        const {poster_path, id, title, overview, path, original_name} = this.state;
        const isMovie = (path !== 'tv-shows' );
        return (
            <article 
                className="col-md-3 my-4 movie-item"
                style={{backgroundImage: `url(https://image.tmdb.org/t/p/w342/${poster_path})`}}
            >
                <div className="overlay">
                    <header className="w-100 pt-3 px-3">
                        <Link className="d-block" to={`/${path}/${id}`}>{(isMovie) ? title : original_name}</Link>
                        <a href='/' className="d-block" style={{fontSize: 10}} onClick = {this.dontShow}>Don't show me</a>
                    </header>
                    <p>{overview}</p>
                </div>
            </article>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Movie)