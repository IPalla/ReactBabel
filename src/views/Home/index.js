import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TVShow from '../../views/TVShow'

import * as moviesActions from '../../actions/moviesActions'

class Home extends React.Component {
    constructor(props) {
        super(props) 
        
        const random = Math.floor(Math.random() * (999 - 30)) + 30;
        this.state = {
            random: random,
        }
    }

    componentDidMount(){
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render () {
        const { random } = this.state;
        const randomO = {
            random: random,
            isMovie: true,
            defaultId: random,
        }
        return (
            <section className="container main home">
            <TVShow {...randomO} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)

