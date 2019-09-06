import React from 'react'
//import { getProjectUsers } from '../../actions/projectGetters'
//import { getAllUsers } from '../../actions/userGetters';
//const configModule = require('../../js/config_module.js');
import PropTypes from 'prop-types';
 class CurrentProjectUsers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.getUser = this.getUser.bind(this);
    }
    componentDidMount() {
        // let manifest_object = configModule.GET_MANIFEST_OBJECT();
        //let { ENTITY_URN } = manifest_object
        // this.refreshUsers(ENTITY_URN)
    }
        /**

/**
  * 
  *@discription - This function is to get the user of project
    @param {String} user - get user name
 
  */
    getUser(user, e) {
         const previousSelectedItems = document.getElementsByClassName("assign-user-list-items")
        for (let i = 0; i < previousSelectedItems.length; i++) {
            let className = previousSelectedItems[i]
            className.classList.remove("asignee-selected")
        }
        e.target.className = "assign-user-list-items asignee-selected" 
       this.props.newAssigneeUser(user)
    }
    render() {
        const { currentAssingnee,users } = this.props
        return (
            <ul className="assign-user-list-popup-container">
                {
                    users.map((item, i) => {
                        let fullName = item.userId
                        return (
                            <li className={`assign-user-list-items ${currentAssingnee == fullName ? "asignee-selected" : ""}`} key={i} onClick={(e) => this.getUser(fullName, e)}>{fullName}</li>
                        )
                    }
                    )
                }
            </ul>
        )
    }
}

CurrentProjectUsers.propTypes = {
    /** current assignee of the comment */
    currentAssingnee: PropTypes.string.isRequired,
      /** new  assignee of the comment */
    newAssigneeUser:PropTypes.func
}
export default CurrentProjectUsers;