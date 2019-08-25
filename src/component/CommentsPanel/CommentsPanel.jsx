import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import '../../styles/CommentsPanel/CommentsPanel.css';
import search from '../../images/CommentsPanel/search.svg'
import arrowDown from '../../images/CommentsPanel/arrow-down.svg'
import Comments from './Comments'
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
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.setSort = this.setSort.bind(this);
        this.setStatus = this.setStatus.bind(this);
    }
    handleSearchInput(e) {
        console.log("value", e.target.value)
    }
    setSort(e) {
        console.log("value", e.target.value)
        this.setState({
            showSortByDropdown: false
        })
    }
    setStatus(e) {
        console.log("value", e.target.value)
        this.setState({
            showStatusDropdown: false
        })
    }
    toggleOrderByDropdown(show){
        if (show === undefined) show = !this.state.showSortByDropdown
        this.setState({
            showSortByDropdown: show,
            showStatusDropdown: false,
        })
    }  
    toggleStatusDropdown(show) {
        if (show === undefined) show = !this.state.showStatusDropdown
        this.setState({
            showStatusDropdown: show,
            showSortByDropdown: false,
        })
    }  

    renderComment = (props) => {
        console.log("commnets=====>",props)
        
       let finalFilteredComments  = this.filterComments(props)
       console.log("final comment====>",finalFilteredComments)
        if(finalFilteredComments && finalFilteredComments.length > 0){
            let comments = finalFilteredComments.map((comment, index) => {
                console.log("11111111",comment)
                return (<Comments comment = {comment}
                                //slateTitle = {this.currentSlate}
                                key = {index} 
                                elementId = {comment.commentOnEntity}
                              //  updateElementComment = {this.updateElementComment}
                               // updateElementCommentReply = {this.updateElementCommentReply}
                                //deleteComment = {this.deleteComment}
                                //changeStatus = {this.changeStatus}
                                //updateAssignee = {this.updateAssignee}
                        />)
        })
    return comments;
    }else {
        return (
            <div className="no-comment-div">No comments found</div>
        )
    }
    }
    filterComments = (props) => {
        console.log("filter======>",props)
        let { id } = this.props
        let { filters } = this.state
        let  elementWiseComments  = props.comments
        let statusFilteredComments = [],
            chronoFilteredComments = [],
            finalFilteredComments
            console.log("filters.sortBy.value",filters.sortBy.value)
            console.log("filters.status.value",filters.status.value)
            console.log("elementWiseComments",elementWiseComments)
        switch(filters.sortBy.value){
            case "1":       //Oldest to Newest
                chronoFilteredComments = elementWiseComments
                break;
            case "-1":      //Newest To Oldest
                chronoFilteredComments = _.sortBy(elementWiseComments, [comment => moment(elementWiseComments.commentDateTime).unix()]).reverse()
                break;
        }
        console.log("chronoFilteredComments",chronoFilteredComments)
        switch(filters.status.value.toLowerCase()){
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
        console.log("statusFilteredComments",statusFilteredComments)
        finalFilteredComments = statusFilteredComments.filter(comment => comment.commentString.toLowerCase().includes(filters.text.toLowerCase()))
        console.log("finalFilteredComments",finalFilteredComments)
    return finalFilteredComments;
    }

    render() {
        console.log(this.props)
        return (
            <div className="root-width root-height">
                <div className="panel-navigation">
                    <div className="panel-navigation__header">
                        <div className="panel-navigation__header-title">Comments</div>
                        <SearchComponent handleSearchInput={this.handleSearchInput} filters={this.state.filters} />
                        <div className="add-structure">

                            <div className="filter">
                                <span> Sort by</span>
                                <div className="dropdown sort-dropdown">
                                    <div className="dropdown__button"
                                        onClick={() => this.toggleOrderByDropdown()}>
                                        <div id="nav-context-selector" className="dropdown__title">
                                            {this.state.filters.sortBy.label}
                                        </div>
                                         <img src = {arrowDown} />
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
                                        {/* <svg className="dropdown__arrow">
                                            <use xlinkHref="#arrow-down"></use>
                                        </svg> */}
                                        <img src = {arrowDown} />
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
                    </div>
                    <div id="panel-canvas" className="comments-canvas">
                      {this.renderComment(this.props)} 
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
                //value={props.filters.text}
                />
            </div>
        </div>
    )

}
const mapStateToProps = (state) => {
    return { comments: state.commentsPanelReducer };
  };
export default CommentsPanel;