import React from 'react'
//import CommnetsForm from './CommentsForm.jsx'
import UserAssignee from './UserAssignee';
import ReplyComment from './ReplyComment';
import { connect } from 'react-redux'
import navigationShowMore from '../../images/CommentsPanel/navigation-show-more.svg'
import CurrentProjectUsers from './CurrentProjectUsers'
class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newAssignee: this.props.comment.assignto,
            showActionsMenu: false,
            mode: 'assign',
            isSelectAssignee: false,
            showReplyForm: false
        }
        this.toggleActionsMenu = this.toggleActionsMenu.bind(this);
        this.editComment = this.editComment.bind(this);
        this.setMode = this.setMode.bind(this);
        this.newAssigneeUser = this.newAssigneeUser.bind(this);
        this.changeAssignee = this.changeAssignee.bind(this);
        this.removeAssigneePopup = this.removeAssigneePopup.bind(this);
    }
    componentDidMount() {
        console.log("commentsssssssssssssssssss")
    }
    toggleActionsMenu(show) {
        if (show === undefined) show = !this.state.showActionsMenu
        this.setState({ showActionsMenu: show })
    }
    editComment(e) {
        this.toggleActionsMenu(false)
        this.setMode('edit')
    }
    setMode(mode) {
        this.setState({ mode })
    }
    newAssigneeUser(user) {
        if (this.state.newAssignee != user) {
            this.setState({
                newAssignee: user,
                isSelectAssignee: true
            })
        }
    }
    changeAssignee() {
        this.toggleActionsMenu(false)
        this.setMode('assign')
        this.setState({
            isSelectAssignee: false
        })
    }
    toggleReplyForm (show) {
        this.toggleActionsMenu(false)
        if (show === undefined) show = !this.state.showReplyForm
        this.setState({showReplyForm: show})
    }

    actionsMenu = () => {
        return (
            <ul className="comment-action-menu action-menu">
                <li onClick={() => this.toggleReplyForm(true)}>Reply</li>
                <li onClick={this.resolveComment}>Resolve</li>
                <li onClick={this.editComment}>Edit</li>
                <li onClick={this.changeAssignee}>Change Assignee</li>
                <li onClick={this.deleteComment}>Delete</li>
            </ul>
        )
    }
    editForm = () => {
        return (

            <div>
                <textarea rows="10"
                    className="new-comment textarea-input"
                    defaultValue={this.props.comment.commentString}
                    onChange={this.updateCommentText}
                />
                <div className="buttons-wrapper">
                    <button className="btn btn__initial"
                        onClick={() => {
                            this.setMode('view')
                            this.clearEditionText()
                        }}>
                        Cancel
                            </button>
                    <button className="btn btn__initial"
                        onClick={() => {
                            this.setMode('view')
                            this.updateComment('text')
                        }}>
                        Save
                            </button>
                </div>
            </div>
        )

    }
    onChange() {

    }
    onClick() {

    }
    removeAssigneePopup(){
        this.setMode('view')
        this.setState({
          newAssignee:this.props.comment.assignto
        })
      }
    updateAssignee(){
        const { commentUrn } = this.props.comment
        const { elementId } = this.props
        const { newAssignee } = this.state
        /* const updatedFields = {
            'assignto': this.state.newAssignee
        } */
        this.props.updateAssignee(commentUrn, newAssignee, elementId)
  
      }
    render() {
        console.log(this.props);
        const { comment, elementId } = this.props
        return (
            <div className="comment-wrapper">
                <div className="comment">
                    <div className="selected-corner"></div>
                    <div className="comment-header">
                        <div className="avatar avatar--large">
                            <span className="profile-picture-placeholder green">
                                C
                    </span>
                        </div>
                        <div className="comment-info">
                            <div className="text-medium-semibold mt-4"> {comment.commentCreator}  </div>
                            <div className="text-medium color-gray-71 mb-4">
                                {/* {Utils.buildCommentDate(comment.commentDateTime)}     */}
                                Jul. 23, 2019 @03:53 PM
                        </div>
                        </div>
                        <span className="action-menu-btn icon icon--28 icon--28-square align-middle"
                            onClick={() => this.toggleActionsMenu()}
                        >
                            <img src={navigationShowMore} />
                        </span>
                        {this.state.showActionsMenu && this.actionsMenu()}
                    </div>
                    <div className="comment-body">
                        <div className="text-medium color-gray-71 mb-4">

                            <p className="hyphens">
                                {comment.commentString}
                            </p>

                            {this.state.mode == "edit" && this.editForm()}
                            {/*   <CommnetsForm onChange = {this.onChange} onClick= {this.onClick} /> */}
                        </div>
                        <div className="properties">
                            <div className="property">
                                <span className="property-title">Slate</span>
                                <span className="property-value">Glossary Slate{this.props.slateTitle}</span>
                            </div>
                            <div className="property">
                                {/*  {
                                  this.state.mode === 'assign'?
                                  (<div className="assignee-content">
                                      <span className="property-title">Assignee</span>
                                      <span className="property-value color-gray-71 changeAssignee">{getUserName}</span>
                                      {
                                        this.state.isSelectAssignee?(<span className="set-assignee-button" onClick={() => {
                                              this.setMode('view')
                                              this.updateAssignee('assignee')
                                          }}></span>):(<span className="set-assignee-button_disabled"></span>)
                                      }

                                      <span className="reject-assignee-button" onClick={this.removeAssigneePopup}></span>
                                    </div>
                                  ):(
                                   <div> <span className="property-title">Assignee</span><span className="property-value color-gray-71 defaultAssignee">{comment.commentAssignee}</span></div>
                                  )
                                } */}
                               {/*  {this.assigneeForm(this.props)} */}
                               <UserAssignee 
                               mode = {this.state.mode} 
                               comment = {this.props.comment}  
                               newAssigneeUser = {this.newAssigneeUser}
                               isSelectAssignee = {this.state.isSelectAssignee}
                               setMode = {this.setMode}
                               updateAssignee = {this.updateAssignee}
                               removeAssigneePopup = {this.removeAssigneePopup}
                               

                             />

                            </div>
                            <div className="property">
                                <span className="property-title">Status</span>
                                <span className="property-value capitalize color-gray-71">{comment.commentStatus.toLowerCase()}</span>
                            </div>
                            <div className="property">
                                <span className="property-title">Replies</span>
                                <span className="property-value"> replies.length </span>
                            </div>
                        
                           
                        </div>
                    </div>
                </div>
                {/*    <div className="replies-wrapper">
                    {this.state.showReplyForm &&
                        <CommnetsForm close={() => this.toggleReplyForm(false)}
                            commentId={comment.commentUrn}
                            updateElementCommentReply={this.props.updateElementCommentReply}
                            elementId={this.props.elementId} />
                    }
                    {replies}

                </div> */}
                  <div className="replies-wrapper">
                <ReplyComment  comment = {this.props.comment}  showReplyForm = {this.state.showReplyForm} />
            </div>
            </div>
        );
    }
}

export default Comment;