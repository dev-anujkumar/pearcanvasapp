import React from 'react'
import UserAssignee from './UserAssignee.jsx';
import ReplyComment from './ReplyComment.jsx';
import navigationShowMore from '../../images/CommentsPanel/navigation-show-more.svg'
import PropTypes from 'prop-types';
import {utils} from '../../js/utils'
import config from '../../config/config.js'
class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newAssignee: this.props.comment.assignto,
            showActionsMenu: false,
            mode: 'view',
            updatedFields: {
                text: this.props.comment.commentString,
                status: this.props.comment.commentStatus
            },
            isSelectAssignee: false,
            showReplyForm: false
        }
    }
    componentDidMount() {
        window.addEventListener("click", (event) => {
            if (!event.target.closest('.comment-action-menu')) {
                this.toggleActionsMenu(false)
            }
        });
    }
    componentWillUnmount(){
        window.removeEventListener("click", (event) => {
            if (!event.target.closest('.comment-action-menu')) {
                this.toggleActionsMenu(false)
            }
        });
    }

    /**
    * 
    *@discription - This function is to toggle the Action menu
    @param {String} show - true false value to tgoggle the action menu
    */
    toggleActionsMenu= (show, e) =>{
        if(e)
            e.stopPropagation()

        if (show === undefined) show = !this.state.showActionsMenu
        this.setState({ showActionsMenu: show })
    }


   /**
   * 
   *@discription - This function is to update the comment
   @param {String} property - property to be updated in comment
   */
    updateComment =() =>{
        const { elementId, comment } = this.props
        let commentId = comment.commentUrn
        let updatedComment = {
            comment: this.state.updatedFields.text,
            commentCreator: comment.commentCreator,
            status: "Open"
        };

        // const updatedText = this.state.updatedFields.text
        this.props.updateElementComment(commentId, updatedComment, elementId)
    }

   /**
   * 
   *@discription - This function is to edit the comment
   */
    editComment =(e) =>{
        this.toggleActionsMenu(false)
        this.setMode('edit')
    }

    /**
     * 
     *@discription - This function is to set mode of the comment
    @param {String} mode - mode to be set to show comment like resolve,edit
    */
    setMode =(mode) =>{
        this.setState({ mode })
    }


   /**
   * 
   *@discription - This function is to assign new user
   @param {String} user - assign new user in the comment
   */
    newAssigneeUser =(user)=> {
        if (this.state.newAssignee != user) {
            this.setState({
                newAssignee: user,
                isSelectAssignee: true
            })
        }
    }

    /**
    * 
    *@discription - This function is to change the assignee
    */
    changeAssignee =()=> {
        this.toggleActionsMenu(false)
        this.setMode('assign')
        this.setState({
            isSelectAssignee: false
        })
        this.props.getProjectUsers();
    }

    /**
    * 
    *@discription - This function is to toggle replay form
    @param {String} show - true or false value to toggle form
    */
    toggleReplyForm = (show) =>{
        this.toggleActionsMenu(false)
        if (show === undefined) show = !this.state.showReplyForm
        this.props.toggleReply(true);
        this.setState({ showReplyForm: show })
    }

    /**
    * 
    *@discription - This function is to resolve comment
    */

    resolveComment =(e)=> {
        const { commentUrn } = this.props.comment
        const { elementId } = this.props
        this.toggleActionsMenu(false)
        this.props.updateResolveComment(commentUrn, "RESOLVED", elementId)
    }

  /**
  * 
  *@discription - This function is to update comment
  */
    updateCommentText=(e) =>{
        this.setState({
            updatedFields: {
                ...this.state.updatedFields,
                text: e.target.value
            }
        })
    }

    /**
     * 
     *@discription - This function is to delete comment
    */
    deleteComment=(e)=> {
        const { commentUrn } = this.props.comment
        const { elementId } = this.props
        this.toggleActionsMenu(false)
        this.props.deleteComment(commentUrn, elementId)
    }


    /**
    * 
    *@discription - This function is to return jsx of action menu
    @return {String} - returns the jsx code of the action menu
    */
    actionsMenu = () => {
        let deleteCommentPermission = false;
        const { comment ,permissions} = this.props
        if ((config.userId === comment.commentCreator && permissions.includes('notes_deleting')) ||
            (config.userId !== comment.commentCreator && permissions.includes('notes_delete_others_comment'))) {
            deleteCommentPermission = true;
        }

        return (
            <ul className="comment-action-menu action-menu">
                {permissions.includes('notes_relpying') && <li onClick={() => this.toggleReplyForm(true)}>Reply</li>}
                {permissions.includes('notes_resolving_closing') && <li onClick={this.resolveComment}>Resolve</li>}
                {config.userId === comment.commentCreator && permissions.includes('notes_deleting') && <li onClick={this.editComment}>Edit</li>}
                {permissions.includes('notes_assigning') && <li onClick={this.changeAssignee}>Change Assignee</li>}
                {deleteCommentPermission && <li onClick={this.deleteComment}>Delete</li>}
            </ul>
        )
    }

    /**
    * 
    *@discription - This function is to return jsx of edit menu
    @return {String} - returns the jsx code of the edit menu
    */
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
                            //this.clearEditionText()
                        }}>
                        Cancel
                            </button>
                    <button className="btn btn__initial"
                        onClick={() => {
                            this.setMode('view')
                            this.updateComment()
                        }}>
                        Save
                            </button>
                </div>
            </div>
        )

    }

    /**
    * 
    *@discription - This function is to remove the popup of assigne
    */
    removeAssigneePopup =() =>{
        this.setMode('view')
        this.setState({
            newAssignee: this.props.comment.assignto
        })
    }

    /**
    * 
    *@discription - This function is to update the assignee
    */
    updateAssignee = () => {
        const { commentUrn } = this.props.comment
        const { elementId } = this.props
        const { newAssignee } = this.state
        this.props.updateAssignee(commentUrn, newAssignee, elementId)
    }
    render() {
        const { comment, elementId, updateReplyComment, toggleReplyForm, users } = this.props
        let avatarObject = [];
        let avatar = '';
        avatarObject = comment?.commentCreator.split(',');
        let revAvatarObject = avatarObject.reverse();
        revAvatarObject.forEach(item => {
            avatar += (item.substr(0, 1)).toUpperCase();
        });
        return (
            <div className="comment-wrapper">
                <div className="comment">
                    <div className="selected-corner"></div>
                    <div className="comment-header">
                        <div className="avatar avatar--large">
                            <span className="profile-picture-placeholder green">
                                {avatar}
                          </span>
                        </div>
                        <div className="comment-info">
                            <div className="text-medium-semibold mt-4"> {comment.commentCreator}  </div>
                            <div className="text-medium color-gray-71 mb-4">
                                {utils.buildCommentDate(comment.commentDateTime)}
                            </div>
                        </div>
                        <span className="action-menu-btn icon icon--28 icon--28-square align-middle"
                            onClick={(e) => this.toggleActionsMenu(undefined, e)}
                        >
                            <img className="action-menu-img" src={navigationShowMore} />
                        </span>
                        {this.state.showActionsMenu && this.actionsMenu()}
                    </div>
                    <div className="comment-body">
                        {
                            this.state.mode == "edit" ? this.editForm() 
                            :
                            <div className="text-medium color-gray-71 mb-4">
                                <p className="hyphens">
                                    {comment.commentString}
                                </p>
                            </div>
                        }         
                        <div className="properties">
                            <div className="property">
                                <span className="property-title">Slate</span>
                                <span className="property-value">{config.staleTitle}</span>
                            </div>
                            <div className="property">
                                <UserAssignee
                                    mode={this.state.mode}
                                    comment={this.props.comment}
                                    newAssigneeUser={this.newAssigneeUser}
                                    isSelectAssignee={this.state.isSelectAssignee}
                                    setMode={this.setMode}
                                    updateAssignee={this.updateAssignee}
                                    removeAssigneePopup={this.removeAssigneePopup}
                                    users={users}
                                />

                            </div>
                            <div className="property">
                                <span className="property-title">Status</span>
                                <span className="property-value capitalize color-gray-71">{comment.commentStatus.toLowerCase()}</span>
                            </div>
                            <div className="property">
                                <span className="property-title">Replies</span>
                                <span className="property-value"> {comment.replyComments && comment.replyComments.length} </span>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="replies-wrapper">
                    <ReplyComment
                        close={this.toggleReplyForm}
                        comment={comment}
                        showReplyForm={this.state.showReplyForm}
                        updateReplyComment={updateReplyComment}
                        elementId={elementId}
                        toggleReplyForm={toggleReplyForm}
                    />
                </div>
            </div>
        );
    }
}
Comments.propTypes = {
    /** commet data attached to store and contains complete comment object */
    comment: PropTypes.object.isRequired
}

export default Comments;