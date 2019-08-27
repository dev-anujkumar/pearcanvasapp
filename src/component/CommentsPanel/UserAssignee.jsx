import React from 'react'
import CurrentProjectUsers from './CurrentProjectUsers'
import PropTypes from 'prop-types';
class UserAssignee extends React.Component {
    /**
  * 
  *@discription - This function is to return jsx of assigneeForm menu
    @param {Array} props - Array of   comments
  @return {String} - returns the jsx code of the assignee menu
  */
    assigneeForm = (props) => {
        if (this.props.mode === 'assign') {
            return (
                <div className="assignee-content">
                    <span className="property-title">Assignee</span>
                    <span className="property-value color-gray-71 changeAssignee">getUserName</span>
                    <CurrentProjectUsers currentAssingnee={props.comment.commentAssignee} newAssigneeUser={props.newAssigneeUser} />
                    <span className={`set-assignee-button ${(!props.isSelectAssignee ? 'disabled' : "")}`}
                        onClick={() => {
                            props.setMode('view')
                            props.updateAssignee('assignee')
                        }}>
                    </span>
                    <span className="reject-assignee-button" onClick={props.removeAssigneePopup}></span>
                </div>
            );
        } else {
            return (
                <div>
                    <span className="property-title">Assignee</span>
                    <span className="property-value color-gray-71 defaultAssignee">{props.comment.commentAssignee}</span>
                </div>
            )

        }
    }
    render() {
        return (
            <>
                {this.assigneeForm(this.props)}
            </>
        )
    }
}
UserAssignee.propTypes = {
    /** commet data attached to store and contains complete comment object */
    comment: PropTypes.object.isRequired
}
export default UserAssignee;