import React from 'react'
import CurrentProjectUsers from './CurrentProjectUsers'
class UserAssignee extends React.Component {
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
export default UserAssignee;