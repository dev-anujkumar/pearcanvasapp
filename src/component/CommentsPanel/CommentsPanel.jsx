import React from 'react'
import { connect } from 'react-redux'
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
    render() {
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
                                       {/*  <svg className="dropdown__arrow">
                                            <use xlinkHref="#arrow-down"></use>
                                        </svg> */}
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
                    <Comments //comment = {comment}
                                           // slateTitle = {this.currentSlate}
                                           // key = {index} 
                                           // elementId = {comment.commentOnEntity}
                                           // updateElementComment = {this.updateElementComment}
                                           // updateElementCommentReply = {this.updateElementCommentReply}
                                           // deleteComment = {this.deleteComment}
                                           // changeStatus = {this.changeStatus}
                                            //updateAssignee = {this.updateAssignee}
                                    />
                      {/*   <div className="no-comment-div">No comments found</div>  */}  
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

export default CommentsPanel;