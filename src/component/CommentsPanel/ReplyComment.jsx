import React from 'react'
import PropTypes from 'prop-types';
import config from '../../config/config';

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
    *@discription - This function is to update the text of comment
    */
    updateCommentText = (e) => {
        this.setState({
            text: e.target.value,
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
    }

    /**
    * 
    *@discription - This function is to return jsx of reply menu
    @param {String} index - index of comments
    @param {Array} reply - Array of reply  comments
    @return {String} - returns the jsx code of the reply menu
    */
    reply = (index, reply) => {
        return (
            <div key={index} className="reply">
                <div className="selected-corner"></div>
                <h4>Reply #{index + 1}</h4>
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
                            {reply.commentString ? reply.commentString : ''}
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
        if (props.showReplyForm && props.toggleReplyForm) {
            return (
                <>
                <div className="reply">
                    <div>
                        <textarea className="new-comment textarea-input"
                            value={this.state.text}
                            onChange={this.updateCommentText}
                            rows="7" />
                    </div>
                    <div className="buttons-wrapper">
                        <button className="btn btn__initial"
                            onClick={() => props.close()}>
                            Cancel
                    </button>
                        <button className="btn btn__initial"
                            onClick={this.replyComment}>
                            Reply
                    </button>
                    </div>
                </div>

                {props.comment.replyComments && props.comment.replyComments.map((reply, index) => this.reply(index, reply))}
            </>
            )

        }
        else {
            return props.comment.replyComments && props.comment.replyComments.map((reply, index) => this.reply(index, reply))
        }
    }
    render() {
        // const { reply } = this.props
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
