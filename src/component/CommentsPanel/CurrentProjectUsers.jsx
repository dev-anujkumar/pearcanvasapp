import React from 'react'
import PropTypes from 'prop-types';
import { ASIGNEE_SELECTED } from '../../constants/Element_Constants';
class CurrentProjectUsers extends React.Component {
    constructor(props) {
        super(props)
    }

    /**
     *
     *@discription - This function is to get the user of project
      @param {String} user - get user name
    */
    getUser = (user, e) => {
        const previousSelectedItems = document.getElementsByClassName("assign-user-list-items")
        for (let i = 0; i < previousSelectedItems.length; i++) {
            let className = previousSelectedItems[i]
            className.classList.remove(ASIGNEE_SELECTED)
        }
        e.target.className = "assign-user-list-items asignee-selected"
        this.props.newAssigneeUser(user)
    }

    render() {
        const { currentAssingnee, users, mode } = this.props

        if(mode == "assign") {
            return (
                <ul className="assign-user-list-popup-container">
                    {
                        users.map((item, i) => {
                                let fullName = item.lastName + ',' + item.firstName
                            return (
                                <li className={`assign-user-list-items ${currentAssingnee == fullName ? ASIGNEE_SELECTED : ""}`}
                                key={i} onClick={(e) => this.getUser(fullName, e)}>{fullName}</li>
                            )
                        }
                        )
                    }
                </ul>
            )
        } else {
            return (
                <ul className="assign-user-list-popup-container">
                    {
                        users.map((item, i) => {
                                let fullName = item.label
                            return (
                                <li className={`assign-user-list-items ${currentAssingnee == fullName ? ASIGNEE_SELECTED : ""}`}
                                key={i} onClick={(e) => this.getUser(fullName, e)}>{fullName}</li>
                            )
                        }
                        )
                    }
                </ul>
            )
        }
    }
}

CurrentProjectUsers.propTypes = {
    /** current assignee of the comment */
    currentAssingnee: PropTypes.string.isRequired,
    /** new  assignee of the comment */
    newAssigneeUser: PropTypes.func,
    /** users of project */
    users: PropTypes.array
}
export default CurrentProjectUsers;
