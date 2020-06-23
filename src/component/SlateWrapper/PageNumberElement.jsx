/**
 * Module - PageNumberElement
 * Description - this component is to show pagenumber up at element container
 */

// IMPORT - Plugins //
import React from 'react';
import { hasReviewerRole } from '../../constants/utility.js'
import { connect } from 'react-redux';
import { getPageNumber, pageData } from '../SlateWrapper/SlateWrapper_Actions';
import config from '../../config/config.js';


class PageNumberElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            loader: false,
        }
    }
    componentDidUpdate() {
        /* Page Number Functionality on hover */
        this.pagenumberData();
    }
     /* Page Number Functionality on hover */
    pagenumberData = () => {
        if (config.pageNumberInProcess && this.props.isPageNumberEnabled && this.props.isHovered === true &&
            (this.props.allElemPageData.length == 0 || this.props.allElemPageData.indexOf(this.props.element.id) == -1) &&
            this.props._slateType !== 'assessment' && config.isPopupSlate === false) {
            config.pageNumberInProcess = false;
            this.props.getPageNumber(this.props.element.id).then((response) => {
                if (response) {
                    this.setState({ inputValue: response.pageNumber })
                }
            })
        }
    }


    handleKeyUp = (e) => {
        let charCode = (e.which) ? e.which : e.keyCode;
        if (charCode === 13) {
            //Prevent Form behaviour on Enter key press
            e.preventDefault();
            return false;
        }
    }
    pageNoChangeHandler = (e) => {
        let data=  this.props.pageNumberData;
        /* To update the corresponding value */
        this.props.pageNumberData && this.props.pageNumberData.forEach((elements, index) => {
            if(elements.id.indexOf(this.props.element.id) !== -1){
                elements.pageNumber = e.target.value }
        });
        this.props.pageData(data)
        this.setState({ inputValue: e.target.value });
    }

    textBoxClicked = (e) => {
        e.currentTarget.parents('.pageNumberBox').classList.add('greenBorder');
        /*following will stop event propgation to upside in nested element*/
        e.stopPropagation();
    }

    updatePageNumber = (e, currOperation, changedInputValue) => {
        const {id} = this.props.element;
        const {asideData,parentUrn} = this.props
        e.currentTarget.parents('.pageNumberBox').classList.remove('greenBorder');
        let pageNumber = this.state.inputValue //e.currentTarget.value;
        this.props.updatePageNumber(pageNumber,id,asideData,parentUrn)
    }

    removePageNumber = (e) => {
        const { id } = this.props.element;
        const { asideData, parentUrn } = this.props;
        this.setState({ inputValue: "" });
        let pageNumber = "";
        this.props.updatePageNumber(pageNumber, id, asideData, parentUrn)
    }

    render() {
        let { element, isHovered, isPageNumberEnabled, activeElement, permissions, _slateType } = this.props;
        let loader = this.props.pageLoading;
        let content = null;
        let pageNumber;
        let elemid;
        //check the page number and show on the basis of data
        this.props.pageNumberData && this.props.pageNumberData.forEach((elements, index) => {
            if (elements.id.indexOf(element.id) !== -1) {
                elemid = elements.id
                pageNumber = elements.pageNumber
            }
        });
        if (loader)
            content = <div className='pageNumberBoxLoader'><div className='loadingpagenumber'></div></div>
        else {
            content = <div className={'pageNumberBox' + ((permissions.includes('edit_print_page_no') || permissions.includes('toggle_element_page_no')) ? '' : 'disableClass')} id={"pageNumberBox-" + element.id}>
                Page #
            <input className="textBox" readOnly={hasReviewerRole()} onBlur={(e) => { !hasReviewerRole() && this.updatePageNumber(e) }} onChange={this.pageNoChangeHandler} maxLength="8" value={pageNumber} onMouseLeave={(e) => { }} onMouseEnter={(e) => { }} type="text" onClick={this.textBoxClicked} onKeyPress={this.handleKeyUp} />
                {
                    (pageNumber && pageNumber !== '' && elemid && elemid === element.id) ?
                        <span className="closeBtn" onMouseDown={this.removePageNumber}>
                            <i className="fa fa-close" aria-hidden="true"></i>
                        </span> : ''
                }
            </div>
        }
        if (isPageNumberEnabled && activeElement && element.id === activeElement.elementId && _slateType !== 'assessment' && config.isPopupSlate === false) {
            return (
                <form id="pageNumberForm">
                    <div className={'pageNumberCover focusedNumberCover'}>
                        {content}
                    </div>
                </form>
            )
        }
        else if (isHovered && isPageNumberEnabled && _slateType !== 'assessment' && config.isPopupSlate === false) {
            if(this.props.pageNumberLoading) return <div className='pageNumberBoxLoader'><div className='loadingpagenumber'></div></div>
            else{
                return (
                    <div className='pageNumberCover hoverNumberCover'>
                        <div className={'pageNumberBox' + ((permissions.includes('edit_print_page_no') || permissions.includes('toggle_element_page_no')) ? '' : 'disableClass')} id={"pageNumberBox-" + element.id}>
                            Page #
                        <input className="textBox" defaultValue={pageNumber} type="text" />
                        </div>
                    </div>
                )
            }
            
        }
        else {
            return (
                null
            )
        }

    }
}

PageNumberElement.displayName = "PageNumberElement"
const mapActionToProps = {
    getPageNumber: getPageNumber,
    pageData
}
const mapStateToProps = state => {
    return {
        pageNumberData: state.appStore.pageNumberData,
        allElemPageData: state.appStore.allElemPageData,
        pageNumberLoading:state.appStore.pageNumberLoading
    };
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(PageNumberElement);