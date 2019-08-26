import React from 'react'
//import { searchUsers } from '../../actions/userGetters'
//import Utils from '../../js/utils'

 class ReplyComment extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userInfo: {},
            text:""
        }
        this.updateCommentText = this.updateCommentText.bind(this);
    }
    updateCommentText (e) {
        this.setState({
            text: e.target.value,
        })
    }
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
    replyComment = (props) => {
        if( props.showReplyForm){
            return(
                <div className="reply">
                <div>
                    <textarea className="new-comment textarea-input"
                              value={this.state.text}
                              onChange={this.updateCommentText}
                              rows="7"/>
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
           return  props.comment.replyComments.map((reply, index) => this.reply(index,reply))
        }
    }
    render() {
        const { reply } = this.props
        // const { userInfo }= this.state
        return (
            <>
            {this.replyComment(this.props)}
        </>
        )
    }

}
export default ReplyComment;
