import React from 'react'
//import { getProjectUsers } from '../../actions/projectGetters'
//import { getAllUsers } from '../../actions/userGetters';
//const configModule = require('../../js/config_module.js');
export default class CurrentProjectUsers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            usersByProject: [{
                "userId": "blueprint-admin",
                "email": "blueprint-admin.@pedev.com",
                "isMember": true,
                "isAdmin": false,
                "roleId": "001ssarole",
                "eTag": "2019-07-29T09:40:40.714Z"
            }, {
                "userId": "c2test25",
                "email": "C2test25@PEDEV.COM",
                "isMember": true,
                "isAdmin": false,
                "roleId": "manager",
                "eTag": "2019-07-09T13:10:58.432Z"
            }, {
                "userId": "c5test04",
                "email": "c5test04@pedev.com",
                "isMember": true,
                "isAdmin": false,
                "roleId": "manager",
                "eTag": "2019-07-16T16:49:53.037Z"
            }, {
                "userId": "c5test09",
                "email": "C5test09@PEDEV.COM",
                "isMember": true,
                "isAdmin": false,
                "roleId": "dqgbxpdc",
                "eTag": "2019-07-29T09:40:40.714Z"
            }]
        }
        this.refreshUsers = this.refreshUsers.bind(this);
        this.getUser = this.getUser.bind(this);
    }
    componentDidMount() {
        // let manifest_object = configModule.GET_MANIFEST_OBJECT();
        //let { ENTITY_URN } = manifest_object
        // this.refreshUsers(ENTITY_URN)
    }
    refreshUsers(ENTITY_URN) {
        Promise.all([
            getProjectUsers(ENTITY_URN)
        ]).then(response => {
            const users = response[0].data
            let filteredUsers = users.filter(user => user.isMember === true)
            this.setState({
                usersByProject: filteredUsers || [],
            })
        })
    }
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
        const { currentAssingnee } = this.props
        return (
            <ul className="assign-user-list-popup-container">
                {
                    this.state.usersByProject.map((item, i) => {
                        var fullName = item.userId
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
