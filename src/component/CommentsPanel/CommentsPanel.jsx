import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'
import '../../styles/CommentsPanel/CommentsPanel.css';
import search from '../../images/CommentsPanel/search.svg'
import arrowDown from '../../images/CommentsPanel/arrow-down.svg'
import Comments from './Comments.jsx'
import PropTypes from 'prop-types';
import { utils } from '../../js/utils'
import { replyComment, resolveComment, toggleReply, toggleCommentsPanel, updateComment, getProjectUsers, updateAssignee, deleteComment } from './CommentsPanel_Action';

class CommentsPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filters: {
                text: '',
                sortBy: {
                    value: '-1',
                    label: 'Newest to Oldest'
                },
                assignee: {
                    value: 'all',
                    label: 'All'
                },
                status: {
                    value: 'all',
                    label: 'All'
                }
            },
            showSortByDropdown: false,
            showStatusDropdown: false
        }
    }
    componentDidMount() {
        window.addEventListener("click", (event) => {
            const isSortDropdown = event.target.closest('.sort-dropdown')
            const isStatusDropdown = event.target.closest('.status-dropdown')
            if (!(isSortDropdown || isStatusDropdown)) this.closeAllDropdown();
        });
    }

    componentWillUnmount() {
        window.removeEventListener("click", (event) => {
            const isSortDropdown = event.target.closest('.sort-dropdown')
            const isStatusDropdown = event.target.closest('.status-dropdown')
            if (!(isSortDropdown || isStatusDropdown)) this.closeAllDropdown();
        });
    }

    /**
     * 
     * @discription - This function is for close all dropdown
     */
    closeAllDropdown = () => {
        this.toggleStatusDropdown(false)
        this.toggleOrderByDropdown(false)
    }

   /**
   * 
   * @discription - This function is for search comments
   */
    handleSearchInput = (e) => {
        this.setState({
            filters: {
                ...this.state.filters,
                text: e.target.value
            }
        })
    }

    /**
     * 
     * @discription - This function is for sort the comments
    */
    setSort = ({ target }) => {
        this.setState({
            filters: {
                ...this.state.filters,
                sortBy: {
                    value: target.dataset.value,
                    label: target.textContent
                }
            },
            showSortByDropdown: false
        })

    }

    /**
     * 
     * @discription - This function is for set the status comments
     * @param {string} status - status of filter comment
     */
    setStatus = (status = 'all') => {

        this.setState({
            filters: {
                ...this.state.filters,
                status: {
                    value: status,
                    label: utils.toTitleCase(status)
                }
            },
            showStatusDropdown: false
        })
    }
    /**
    * 
    * @discription - This function is to toogle  the order dropdown
    * @param {string} show - value true or false to toggle dropdown
    */
    toggleOrderByDropdown = (show) => {
        if (show === undefined) show = !this.state.showSortByDropdown
        this.setState({
            showSortByDropdown: show,
            showStatusDropdown: false,
        })
    }
    /**
    * 
    * @discription - This function is to toogle  the status dropdown
    * @param {string} show - value true or false to toggle dropdown
    */

    toggleStatusDropdown = (show) => {
        if (show === undefined) show = !this.state.showStatusDropdown
        this.setState({
            showStatusDropdown: show,
            showSortByDropdown: false,
        })
    }
 /**
  * 
  * @discription - This function is to update comment of element
  * @param {string} commentUrn - commnet urn to be updated
  * @param {string} updatedComment - updated comment
  * @param {string} elementId - Elemenet id to de updated
  */
    updateElementComment = (commentUrn, updatedComment, elementId) => {
        this.props.updateComment(commentUrn, updatedComment, elementId);
    }


    /**
     * 
     * @discription - This function is to update comment of element
     * @param {string} commentUrn - commnet urn to be updated
     * @param {object} reply - value of reply and comment detail
     * @param {string} elementId - Elemenet id to de updated
     */
    updateReplyComment= (commentUrn, reply, elementId) =>{
        this.props.replyComment(commentUrn, reply, elementId)
    }


    /**
    * 
    * @discription - This function is to update comment of element
    * @param {string} commentUrn - commnet urn to be updated
    * @param {object} resolveString - status of comment to be change:resolve,open
    * @param {string} elementId - Elemenet id to de updated
    */


    updateResolveComment = (commentUrn, resolveString, elementId) => {
        this.props.resolveComment(commentUrn, resolveString, elementId)
    }


    /**
    * 
    * @discription - This function is to get user detail of project
    */
    getProjectUsers = () => {
        this.props.getProjectUsers();
    }

    /**
    * 
    * @discription - This function is to update the assignee of the comment.
    * @param {string} commentUrn - commnet urn to be updated
    * @param {object} newAssignee - New Assignee to be updated in comment
    * @param {string} elementId - Elemenet id to de updated
    */

    updateAssignee = (commentUrn, newAssignee, elementId) => {
        this.props.updateAssignee(commentUrn, newAssignee, elementId);
    }

    /**
    * 
    * @discription - This function is to delete the comment
    * @param {string} commentUrn - commnet urn to be updated
    * @param {string} elementId - Elemenet id to de updated
    */

    deleteComment = (commentUrn, elementId) => {
        this.props.deleteComment(commentUrn, elementId);
    }

    /**
    * 
    * @discription - This function is to render the jsx of comment 
    @param {Object} props - objct of comments
    @return {String} - returns the jsx code of the comment
    */
    renderComment = (comment) => {
        let { filters } = this.state;
        let finalFilteredComments = this.filterComments(comment, filters)
        if (finalFilteredComments && finalFilteredComments.length > 0) {
            let comments = finalFilteredComments.map((comment, index) => {
                return (<Comments comment={comment}
                    slateTitle={this.props.slateTitle}
                    key={index}
                    elementId={comment.commentOnEntity}
                    updateElementComment={this.updateElementComment}
                    updateReplyComment={this.updateReplyComment}
                    updateResolveComment={this.updateResolveComment}
                    deleteComment={this.deleteComment}
                    toggleReply={this.props.toggleReply}
                    updateAssignee={this.updateAssignee}
                    toggleReplyForm={this.props.toggleReplyForm}
                    users={this.props.users}
                    getProjectUsers={this.getProjectUsers}
                    permissions={this.props.permissions}
                />)
            })
            return comments;
        } else {
            return (
                <div className="no-comment-div">No comments found</div>
            )
        }
    }

   /**
   * 
   *@discription - This function is to filter the comments
   @param {Object} props - objct of comments
   @return {String} - returns the final filterd comment
   */
    filterComments = (comment, filters) => {
        let elementWiseComments = comment;
        let statusFilteredComments = [],
            chronoFilteredComments = [],
            finalFilteredComments
        switch (filters.sortBy.value) {
            case "1":       //Oldest to Newest
                chronoFilteredComments = elementWiseComments
                break;
            case "-1":      //Newest To Oldest
                chronoFilteredComments = _ && _.sortBy(elementWiseComments, [comment => moment(elementWiseComments.commentDateTime).unix()]).reverse()
                break;
        }
        switch (filters.status.value.toLowerCase()) {
            case "all":
                statusFilteredComments = chronoFilteredComments
                break;
            case "open":
                statusFilteredComments = chronoFilteredComments.filter(comment => comment.commentStatus.toLowerCase() == "open")
                break;
            case "resolved":
                statusFilteredComments = chronoFilteredComments.filter(comment => comment.commentStatus.toLowerCase() == "resolved")
                break;
        }
        finalFilteredComments = statusFilteredComments.filter(comment => comment.commentString.toLowerCase().includes(filters.text.toLowerCase()))
        return finalFilteredComments;
    }

    /**
     * Closses the comments panel
     */
    togglePanel = () => {
        const { toggleCommentsPanel } = this.props;
        toggleCommentsPanel(false)
    }

    componentDidUpdate(prevProps){
        if(prevProps.elmenIndex !== this.props.elmenIndex || prevProps.togglePanel !== this.props.togglePanel){
            const rejectAssigneeButton = document.getElementsByClassName('reject-assignee-button')
            if(rejectAssigneeButton.length){
                rejectAssigneeButton[0].click()
            }
        }
    }

    render() {
        const { permissions } = this.props;
        return (
            <div id="comments-panel" className={`comments-panel ${(this.props.togglePanel ? 'comments-panel-open' : "")}`}>
                <div className="root-width root-height">
                    <div className="panel-navigation">
                        <div className="panel-navigation__header">
                            <div className="panel-navigation__header-title">Comments</div>
                            <label onClick={this.togglePanel} className="modal__close_Panel"></label>
                            {permissions.includes('note_search_comment') && <SearchComponent handleSearchInput={this.handleSearchInput} filters={this.state.filters} />}
                            {permissions.includes('notes_access_manager') &&
                                <div className="add-structure">
                                    <div className="filter">
                                        <span> Sort by</span>
                                        <div className="dropdown sort-dropdown">
                                            <div className="dropdown__button"
                                                onClick={() => this.toggleOrderByDropdown()}>
                                                <div id="nav-context-selector" className="dropdown__title">
                                                    {this.state.filters.sortBy.label}
                                                </div>
                                                <img src={arrowDown} />
                                            </div>
                                            {this.state.showSortByDropdown &&
                                                <ul className="dropdown__content">
                                                    <li data-value="1" onClick={this.setSort}>Oldest to Newest</li>
                                                    <li data-value="-1" onClick={this.setSort}>Newest to Oldest</li>
                                                </ul>
                                            }
                                        </div>
                                    </div>
                                    <div className="filter">
                                        <span>Status</span>
                                        <div className="dropdown status-dropdown">
                                            <div className="dropdown__button"
                                                onClick={() => this.toggleStatusDropdown()}>
                                                <div id="nav-context-selector" className="dropdown__title">
                                                    {this.state.filters.status.label}
                                                </div>
                                                <img src={arrowDown} />
                                            </div>
                                            {this.state.showStatusDropdown &&
                                                <ul className="dropdown__content">
                                                    <li data-value="open" onClick={() => this.setStatus('all')}>All</li>
                                                    <li data-value="open" onClick={() => this.setStatus('open')}>Open</li>
                                                    <li data-value="resolved" onClick={() => this.setStatus('resolved')}>Resolved</li>
                                                </ul>
                                            }
                                        </div>
                                    </div>

                                </div>
                            }
                        </div>
                        <div id="panel-canvas" className="comments-canvas">
                            {this.renderComment(this.props.comments)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const SearchComponent = (props) => {
    return (
        <div className="search-container">
            <img src={search} />
            <div className="input-text">
                <label className="u-hidden" htmlFor="text-input"></label>
                <input type="text"
                    name="text-input"
                    className="txt-input"
                    onChange={props.handleSearchInput}
                    value={props.filters.text}
                />
            </div>
        </div>
    )

}

CommentsPanel.propTypes = {
    /** commet data attached to store and contains complete comments object */
    comments: PropTypes.array.isRequired
}

const mapDispatchToProps = (dispatch) => {
    return {
        replyComment: (commentUrn, reply, elementId) => {
            dispatch(replyComment(commentUrn, reply, elementId))
        },
        resolveComment: (commentUrn, resolveString, elementId) => {
            dispatch(resolveComment(commentUrn, resolveString, elementId))
        },
        toggleReply: (toggle) => {
            dispatch(toggleReply(toggle))
        },
        toggleCommentsPanel: (toggle) => {
            dispatch(toggleCommentsPanel(toggle))
        },
        updateComment: (commentUrn, updatedComment, elementId) => {
            dispatch(updateComment(commentUrn, updatedComment, elementId))
        },
        getProjectUsers: () => {
            dispatch(getProjectUsers())
        },
        updateAssignee: (commentUrn, newAssignee, elementId) => {
            dispatch(updateAssignee(commentUrn, newAssignee, elementId))
        },
        deleteComment: (commentUrn, elementId) => {
            dispatch(deleteComment(commentUrn, elementId))
        }
    }
}

const mapStateToProps = state => {
    return {
        elmenIndex: state.commentsPanelReducer.index,
        comments: state.commentsPanelReducer.comments,
        togglePanel: state.commentsPanelReducer.togglePanel,
        toggleReplyForm: state.commentsPanelReducer.toggleReplyForm,
        users: state.commentsPanelReducer.users,
        slateTitle: state.commentsPanelReducer.slateTitle,
        permissions : state.appStore.permissions
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsPanel);