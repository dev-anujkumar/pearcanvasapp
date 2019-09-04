import React from 'react'
//import { searchUsers } from '../../actions/userGetters'
//import Utils from '../../js/utils'
import PropTypes from 'prop-types';
 class ReplyComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {},
            text: ""
        }
        this.updateCommentText = this.updateCommentText.bind(this);
        this.replyComment = this.replyComment.bind(this);
    }
componentDidUpdate(){
        
}
    /**
* 
*@discription - This function is to update the text of comment

*/
    updateCommentText(e) {
        this.setState({
            text: e.target.value,
        })
    }
    /**
* 
*@discription - This function is to reply comment

*/
    replyComment(e) {
        const {comment, elementId,toggleReplyForm} = this.props;
        const { text } = this.state;
        const date = new Date()
        const commentUrn = comment.commentUrn;
        const reply = {
            commentType: "commentReply",
            commentDateTime: date.toISOString(),
            commentCreator:  "c5test01",//auth.user.userId,
            commentString: text,
            commentOnEntity: elementId
        }
        this.props.updateReplyComment(commentUrn,reply,elementId);
        this.props.close();
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
            <div className="reply">
                <div className="selected-corner"></div>
                <h4>Reply #{index + 1}</h4>
                <div className="comment-header">
                    <div className="comment-info no-padding">
                        <div className="text-medium-semibold mt-4"> {reply.commentCreator} </div>
                        <div className="text-medium color-gray-71 mb-4">
                            { /* Utils.buildCommentDate(reply.createddate) */}
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
        
        if (props.showReplyForm) {
            return (
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
            )

        }
        else {
            return props.comment.replyComments && props.comment.replyComments.map((reply, index) => this.reply(index, reply))
        }
    }
    render() {
        const { reply } = this.props
        // const { userInfo }= this.state
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
