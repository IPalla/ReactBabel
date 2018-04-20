import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as commentsActions from '../../actions/commentsActions'

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: this.props.path,
            defaultId: this.props.defaultId,
            comments: [],
            username: '', 
            content: '',
            update: 0,
            contentUpdate: '',
        }
    }
    deleteComment = (e) => {
        const { commentsActions, path } = this.props;
        const commentId = e.target.name;
        commentsActions.deleteComment(commentId, path);
    }
    sendComment = (e) => {
        const { username, content, defaultId, path } = this.state;
        const { commentsActions } = this.props;
        if (username.length <= 3 || content.length <= 10){
            alert('Min user length: 3 and min comment content: 10');
            return;
        }
        commentsActions.createComment(defaultId, username, content, path);
        this.setState({content: '', username: ''});
        localStorage.removeItem("username");
        localStorage.removeItem("content");
        
    }
    changeComment = (e) => {
        const commentContent = e.target.value;
        localStorage.setItem("content", commentContent);
        this.setState({content: commentContent})
    }
    changeUsername = (e) => {
        const commentUsername = e.target.value;
        localStorage.setItem("username", commentUsername);
        this.setState({username: commentUsername})
    }
    updateComment = (e, id=0, user='', movieId='') => {
        const { commentsActions } = this.props;
        const { contentUpdate, update, path } = this.state;
        if (id === -1) {
            const commentContent = e.target.value;
            this.setState({contentUpdate: commentContent});
            return;
        }
        if (id === -2){
            commentsActions.updateComment(update, contentUpdate, user, movieId, path);
            this.setState({update: 0});
            this.setState({contentUpdate: ''});
            return;
        }
        this.setState({update: id});
    }
    componentDidMount(){
        const { commentsActions, defaultId } = this.props;
        const { path } = this.state;
        commentsActions.loadComments(defaultId, path);
        
        this.setState({content: localStorage.content, username: localStorage.username})
        
    }
    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
        const {comments} = nextProps;
        this.setState({comments});
    }

    render() {
        const { comments, update } = this.state;
        return (
            <section className="container main movies">
                <header className="row">
                    <div className="col-12">
                            <div className="card">
                                <div className="card-header"><h2>Comments</h2></div>
                                <div className="card-body">
                                {comments.map((comment, i) => {
                                    if (update!==comment.id) {
                                    return (
                                    <h3 key={i}><button type="button" value={comment.id} className="btn btn-danger" name={comment.id} onClick={this.deleteComment} >-</button>  
                                        <b onClick={(e)=>this.updateComment(e, comment.id)}>  {comment.user}:</b> {comment.body}
                                    </h3> );
                                    }  else {
                                        return (
                                            <div key={i}>
                                                <h3><b onClick={(e)=>this.updateComment(e)}>  {comment.user}:</b></h3>
                                                <div  className="row">
                                                    <textarea className="col-10" rows="4" cols="50" onChange={(e)=>this.updateComment(e, -1)} value={this.state.contentUpdate}></textarea>
                                                    <button type="button" className="col-2 btn btn-success" onClick={(e)=>this.updateComment(e, -2 , comment.user, comment.movieId)} >SEND</button>
                                                </div>
                                            </div>
                                        );
                                    }  
                                })}
                                </div>
                                <div className="card-footer form-control">
                                    <label className="row">Comment:</label>
                                    <textarea className="row col-12" rows="4" cols="50" onChange={this.changeComment} value={this.state.content}></textarea>
                                    <div className="row"></div>
                                    <div className="row">
                                        <label className="col-3">Username:</label>
                                        <input className="col-5" type="text" onChange={this.changeUsername} value={this.state.username}></input>
                                        <div className="col-1"></div>
                                        <button type="button" className="col-2 btn btn-success" onClick={this.sendComment} >SEND</button>
                                    </div>
                                </div>
                            </div>
                    </div>
                </header>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        comments: state.comments
    }
}

function mapDispatchToProps(dispatch){
    return {
        commentsActions: bindActionCreators(commentsActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)

