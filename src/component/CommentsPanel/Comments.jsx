import React from 'react'
import UserAssignee from './UserAssignee.jsx';
import ReplyComment from './ReplyComment.jsx';
import iconArrow from '../../images/CommentsPanel/icon-arrow.svg'
import navigationShowMore from '../../images/CommentsPanel/navigation-show-more.svg'
import PropTypes from 'prop-types';
import {utils} from '../../js/utils'
import config from '../../config/config.js'
import CommentMention from '../CommentMention/CommentMention.jsx';
class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newAssignee: this.props.comment.commentAssignee,
            newRole: this.props.comment.role,
            showActionsMenu: false,
            mode: 'view',
            updatedFields: {
                text: this.props.comment.commentString,
                status: this.props.comment.commentStatus
            },
            isSelectAssignee: false,
            isSelectRole: false,
            showReplyComments: false
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
    *@discription - This function is to toggle between expanded and collapsed state of replies
    */
    setReplyDropdownState = () => {
        this.setState({ showReplyComments: !this.state.showReplyComments });
    }

    /**
    *
    *@discription - This function is to show the comment in slateview
    */
    // printComment = () => {
    //     const { comment } = this.props;
    //     var string = comment.commentString;
    //     var x= string.match(/@(.*?)\)/g)
    //     var final ="";
    //     var prevIndex=0;
    //     for(var i=0;i<x.length;i++){
    //         var index = string.indexOf(x[i]);
    //         final+="<span style = 'color: #7a797a'>" + string.substring(prevIndex,index) + "</span>";
    //         final+="<span style = 'color: #015a70'>"+x[i]+"</span>";
    //         prevIndex = index + x[i].length;
    //     }
    //     final += "<span>" + string.substring(prevIndex) +  "</span>";
    //     return (
    //         <div dangerouslySetInnerHTML={{__html: final}}>
    //         </div>
    //     )
    // }

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
                // newAssignee: user,
                isSelectAssignee: true
            })
        }
    }

    newRoleUser =(user)=> {
        if (this.state.newRole != user) {
            this.setState({
                newRole: user,
                // newAssignee: user,
                isSelectRole: true
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

        // if user came from comments manager
        // than again initilizing the user list
        if(this.props.users.length === 0) {
            this.props.getProjectUsers();
        }
    }

    changeAssignByRole =()=> {
        this.toggleActionsMenu(false)
        this.setMode('role')
        this.setState({
            // isSelectAssignee: false
            isSelectRole: false
        })

        // if user came from comments manager
        // than again initilizing the user list
        if(this.props.users.length === 0) {
            this.props.getProjectUsers();
        }
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
                text: e
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
        const deletePermissionSameUser = (config.fullName === comment.commentCreator || config.userId === comment.commentCreator) && permissions.includes('notes_deleting')
        const deletePermissionDifferentUser = (config.fullName !== comment.commentCreator && config.userId !== comment.commentCreator) && permissions.includes('notes_delete_others_comment')
        if (deletePermissionSameUser || deletePermissionDifferentUser) {
            deleteCommentPermission = true;
        }

        return (
            <ul className="comment-action-menu action-menu">
                {permissions.includes('notes_resolving_closing') && <li onClick={this.resolveComment}>Resolve</li>}
                {(config.fullName === comment.commentCreator || config.userId === comment.commentCreator) && permissions.includes('notes_deleting') && <li onClick={this.editComment}>Edit</li>}
                {permissions.includes('notes_assigning') && <li onClick={this.changeAssignByRole}>Change Assigned Role</li>}
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
                <CommentMention
                urn={this.props.comment.commentUrn}
                projectUsers={this.props.users}
                comment={this.props.comment.commentString}
                handleCommentChange={this.updateCommentText}
                isEditMode={true}
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
    }

    removeRolePopup =() =>{
        this.setMode('view')
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

    updateRole = () => {
        const { commentUrn } = this.props.comment
        const { elementId } = this.props
        const { newRole } = this.state
        this.props.updateRole(commentUrn, newRole, elementId)
    }

    render() {
        const { comment, elementId, updateReplyComment, toggleReplyForm, users, roles } = this.props
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
                                    <CommentMention projectUsers={users} readOnly urn={this.props.comment.commentUrn} comment={this.props.comment.commentString}/>
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
                                    name="Assign by role"
                                    mode={this.state.mode}
                                    comment={this.props.comment}
                                    newAssigneeUser={this.newRoleUser}
                                    isSelectAssignee={this.state.isSelectRole}
                                    setMode={this.setMode}
                                    updateAssignee={this.updateRole}
                                    removeAssigneePopup={this.removeRolePopup}
                                    users={roles}
                                    show={this.state.mode == "role"}
                                />
                            </div>
                            <div className="property">
                                <UserAssignee
                                    name="Assign to"
                                    mode={this.state.mode}
                                    comment={this.props.comment}
                                    newAssigneeUser={this.newAssigneeUser}
                                    isSelectAssignee={this.state.isSelectAssignee}
                                    setMode={this.setMode}
                                    updateAssignee={this.updateAssignee}
                                    removeAssigneePopup={this.removeAssigneePopup}
                                    users={users}
                                    show={this.state.mode == "assign"}
                                />

                            </div>
                            <div className="property">
                                <span className="property-title">Status</span>
                                <span className="property-value capitalize color-gray-71">{comment.commentStatus.toLowerCase()}</span>
                            </div>
                            <div className="property">
                                <div className="property" onClick={this.setReplyDropdownState}>
                                    <div className="Replies">{comment.replyComments.length} Replies</div>
                                    <img className={`${this.state.showReplyComments ? "Path" : "Path collap" }`} src={iconArrow} />
                                </div>
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
                        showReplyComments={this.state.showReplyComments}
                        users={this.props.users}
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
