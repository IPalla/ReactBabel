import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as tvshowActions from '../../actions/tvshowActions';
import * as movieActions from '../../actions/movieActions';
import * as moviesActions from '../../actions/moviesActions';
import Movies from '../../views/Movies';
import TVShows from '../../views/TVShows';
import Comments from '../../views/Comments';

class TVShow extends React.Component {
    constructor(props) {
        super(props);
        let path;
        if (this.props.random) {
            path = 'movies';
        } else {
            path = props.location.pathname.split('/')[1];
        }
        this.state = {
            movie: {},
            tvshow: {},
            path: path,
            random: this.props.random,
            endpoint: undefined,
            editing: false,
            title: '',
            overview: '',
        };
    }

    componentDidMount(){
        const { random, path} = this.state;
        const { tvshowActions, movieActions, match } = this.props
        if (random){
            movieActions.loadMovie(random)
        } else {
            if (path === 'movies'){
                movieActions.loadMovie(match.params.id);
            } else{
                tvshowActions.loadTVShow(match.params.id);
            }
        }
    }

    componentWillReceiveProps({tvshow, movie}) {
        this.setState({tvshow});
        this.setState({movie});
        if (tvshow){
            this.setState({title: tvshow.original_name})
            this.setState({overview: tvshow.overview})
        } else {
            this.setState({title: movie.title})
            this.setState({overview: movie.overview})
        }
    }

    similar = (e) => {
        this.setState({endpoint: 'similar'});
    }
    recommended = (e) => {
        this.setState({endpoint: 'recommended'});
    }
    comments = (e) => {
        this.setState({endpoint: 'comments'});
    }
    edit = (e) => {
        const {editing} = this.state;
        this.setState({editing: !editing});
    }
    editSave = (e) => {
        const {editing, overview, title, path} = this.state;
        const { moviesActions } = this.props;
        this.setState({editing: !editing});
        if (path === 'movies'){
            let { movie } = this.state;
            movie.title = title;
            movie.overview = overview;
            moviesActions.editMovie(movie);
        } else {
            let { tvshow } = this.state;
            tvshow.original_name = title;
            tvshow.overview = overview;
            moviesActions.editTvshow(tvshow);
        }
    }
    titleChange = (e) => {
        this.setState({title: e.target.value})
    }
    overviewChange = (e) => {
        this.setState({overview: e.target.value})
    }
    render() {
        const { tvshow, path, movie, endpoint, editing } = this.state;
        const overview_edit = this.state.overview;
        const title_edit = this.state.title;
        let title, id, backdrop_path, poster_path, overview;
        if ( path === 'tv-shows'){
            title = tvshow.original_name;
            id = tvshow.id;
            backdrop_path = tvshow.backdrop_path;
            poster_path = tvshow.poster_path;
            overview = tvshow.overview;

        } else {
            title = movie.title;
            id = movie.id;
            backdrop_path = movie.backdrop_path;
            poster_path = movie.poster_path;
            overview = movie.overview;
        }
        const propsO = {
            isDefault: false,
            nowViewing: endpoint,
            defaultId: id,
            path: path,
        }
            return (
                <div className="container">
                <section className="movie  main" style={{backgroundImage:  id ? `url(https://image.tmdb.org/t/p/w342/${ backdrop_path})` : ''}}>
                    <div className="overlay"></div>
                    <header className="row">
                        <div className="col-12">
                            <h1 style={{color: 'white'}}>{ id ?  title : 'Loading...'}</h1>
                        </div>
                    </header>
                    <article className="row movie-item">
                        <footer className="col-md-4 offset-md-1 my-4 movie-poster" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w342/${ poster_path})`}}>
    
                        </footer>
                        <div className="col-md-6 my-4">
                            {!editing && <div>
                                <header className="w-100">
                                    <h1>{title}</h1>
                                </header>
                                <p className="d-block">{ overview}</p>
                            </div>}
                            {editing && <div className="col-md-6 my-4">
                                <header className="w-100">
                                    <label style={{color: "white"}}>New title: </label>
                                    <input type="text"  onChange={this.titleChange} value={title_edit}></input>
                                </header>
                                <label style={{color: "white"}}>New overview: </label>
                                <textarea rows="4" cols="50" onChange={this.overviewChange} value={overview_edit}></textarea>
                            </div>}
                            <button type="button" name={path} className="btn btn-info" onClick={this.similar}>Similar</button>
                            <button type="button" name={path} className="btn btn-info" onClick={this.recommended}>Recommended</button>
                            <button type="button" name={path} className="btn btn-info" onClick={this.comments}>Comments</button>
                            { editing && <button type="button" name={path} className="btn btn-info" onClick={this.editSave}>Save</button>}
                            { !editing && <button type="button" name={path} className="btn btn-info" onClick={this.edit}>Edit</button>}
                        </div>
                    </article> 
                </section>    
                {endpoint === 'similar' && path === 'movies' && <Movies {...propsO} />}
                {endpoint === 'recommended' &&  path === 'movies' && <Movies {...propsO}/>}
                {endpoint === 'similar' && path === 'tv-shows' && <TVShows {...propsO} />}
                {endpoint === 'recommended' &&  path === 'tv-shows' && <TVShows {...propsO}/>}
                {endpoint === 'comments' && <Comments {...propsO}/>}
                </div>
            );
    }
}

function mapStateToProps(state, ownProps){
    return {
        tvshow: state.tvshow,
        movie: state.movie
    };
}

function mapDispatchToProps(dispatch){
    return {
        tvshowActions: bindActionCreators(tvshowActions, dispatch),
        movieActions: bindActionCreators(movieActions, dispatch),
        moviesActions: bindActionCreators(moviesActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TVShow)

