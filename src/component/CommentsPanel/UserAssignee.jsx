import React from 'react'
import CurrentProjectUsers from './CurrentProjectUsers.jsx'
import PropTypes from 'prop-types';
class UserAssignee extends React.Component {

    /**
     *
     *@discription - This function is to return jsx of assigneeForm menu
     @param {Array} props - Array of   comments
    @return {String} - returns the jsx code of the assignee menu
    */

    assigneeForm = (props) => {
        const { users, show, mode} = props
        if (show) {
            return (
                <>
                        <span className="property-title">{props.name}</span>
                        <span className="property-value color-gray-71 changeAssignee">getUserName</span>
                        <CurrentProjectUsers mode={mode} users={users} currentAssingnee={props.comment.commentAssignee} newAssigneeUser={props.newAssigneeUser} />
                        <span className={`set-assignee-button ${(!props.isSelectAssignee ? 'disabled' : "")}`}
                            onClick={() => {
                                props.setMode('view')
                                props.updateAssignee('assignee')
                            }}>
                        </span>
                        <span className="reject-assignee-button" onClick={props.removeAssigneePopup}></span>

                </>
            );
        } else {
            return (
                <>
                    <span className="property-title">{props.name}</span>
                    <span className="property-value color-gray-71 defaultAssignee">{props.name === 'Assign by role' ? props.comment.role : props.comment.commentAssignee}</span>
                </>
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
    comment: PropTypes.object.isRequired,
    /** Give the mode of comment */
    mode: PropTypes.string.isRequired,
    /** Handler to Assign new user */
    newAssigneeUser: PropTypes.func,
    /** value to check assignee is selected or note */
    isSelectAssignee: PropTypes.bool,
    /** Handler to set new mode */
    setMode: PropTypes.func,
    /** Handler to update assignee */
    updateAssignee: PropTypes.func,
    /** Handler to remove assigne */
    removeAssigneePopup: PropTypes.func

}

export default UserAssignee;