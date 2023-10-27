import React from 'react'
import PropTypes from 'prop-types';
import config from '../../config/config';
import sendBlack from '../../images/CommentsPanel/send-black.svg'
import CommentMention from '../CommentMention/CommentMention.jsx'

class ReplyComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {},
            text: ""
        }
    }

    /**
    *
    *@discription - This function displays the reply box in slate view
    */
    showReplyBox = (props) => {
        const commentCreatorName = config.fullName
        return (
            <div className="reply">
                <div>
                    <span className="Reply-Num">Reply #{props.comment.replyComments.length + 1}</span>
                    <span className="Username-Copy">{commentCreatorName}</span>
                </div>
                <div className="wrapper-reply">
               <CommentMention projectUsers={this.props.users} comment={this.state.text} handleCommentChange={this.updateCommentText}/>
                   <img src={sendBlack} className="unique" onClick={this.replyComment} />
                </div>
            </div>
        )
    }

    /**
    *
    *@discription - This function is to update the text of comment
    */
    updateCommentText = (e) => {
        this.setState({
            text: e
        })
    }

    /**
    *
    *@discription - This function is to reply comment
    */
    replyComment = (e) => {
        const { comment, elementId } = this.props;
        const { text } = this.state;
        const date = new Date()
        const commentUrn = comment.commentUrn;
        const reply = {
            commentType: "commentReply",
            commentDateTime: date.toISOString(),
            commentCreator: config.fullName,//auth.user.userId,
            commentString: text,
            commentOnEntity: elementId
        }
        this.setState({text:""})
        this.props.updateReplyComment(commentUrn, reply, elementId);
        this.props.close();
    }

    /**
    *
    *@discription - This function is to return jsx of reply menu
    @param {String} index - index of comments
    @param {Array} reply - Array of reply  comments
    @return {String} - returns the jsx code of the reply menu
    */
    reply = (index, reply, length) => {
        return (
            <div key={index} className="reply">
                <div className="selected-corner"></div>
                <h4>Reply #{length - index}</h4>
                <div className="comment-header">
                    <div className="comment-info no-padding">
                        <div className="text-medium-semibold mt-4"> {reply.commentCreator} </div>
                        <div className="text-medium color-gray-71 mb-4">
                        </div>
                    </div>
                </div>
                <div className="comment-body">
                    <div className="text-medium color-gray-71 mb-4">
                        <p className="hyphens">
                        {typeof reply.commentString === 'string' ? <CommentMention urn={reply.commentUrn} projectUsers={this.props.users} readOnly comment={reply.commentString} />: null }

                        </p>
                    </div>
                </div>
            </div>
        )
    }

    /**
    *
    *@discription - This function is to return jsx of reply form
    @param {Array} props - Array of reply  comments
    @return {String} - returns the jsx code of the reply form
    */

    replyCommentForm = (props) => {
        if (props.showReplyComments) {
            return (
                <>
                {this.showReplyBox(props)}
                {props.comment.replyComments.slice(0).reverse().map((reply, index) => this.reply(index, reply, props.comment.replyComments.length))}
                </>
            )

        }
        else {
            return (
                <>
                {this.showReplyBox(props)}
                </>
            )
        }
    }
    render() {
        return (
            <>
                {this.replyCommentForm(this.props)}
            </>
        )
    }

}

ReplyComment.propTypes = {
    /** commet data attached to store and contains complete comment object */
    comment: PropTypes.object.isRequired
}

export default ReplyComment;