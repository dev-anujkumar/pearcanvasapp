/**
 * Module - PageNumberElement
 * Description - this component is to show pagenumber up at element container
 */

// IMPORT - Plugins //
import React from 'react';
import { hasReviewerRole } from '../../constants/utility.js'

class PageNumberElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: this.props.element.pageNumberRef && this.props.element.pageNumberRef.pageNumber,
            loader: false
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
        if (loader)
            content = <div className='pageNumberBoxLoader'><div className='loaderPage'></div></div>
        else {
            content = <div className={'pageNumberBox' + ((permissions.includes('edit_print_page_no') || permissions.includes('toggle_element_page_no')) ? '' : 'disableClass')} id={"pageNumberBox-" + element.id}>
                Page #
            <input className="textBox" readOnly={hasReviewerRole()} onBlur={(e) => { !hasReviewerRole() && this.updatePageNumber(e) }} onChange={this.pageNoChangeHandler} maxLength="8" value={this.state.inputValue} onMouseLeave={(e) => { }} onMouseEnter={(e) => { }} type="text" onClick={this.textBoxClicked} onKeyPress={this.handleKeyUp} />
                {
                    (this.state.inputValue && this.state.inputValue !== '') ?
                        <span className="closeBtn" onMouseDown={this.removePageNumber}>
                            <i className="fa fa-close" aria-hidden="true"></i>
                        </span> : ''
                }
            </div>
        }
        if (isPageNumberEnabled && activeElement && element.id === activeElement.elementId && _slateType !== 'assessment') {
            return (
                <form id="pageNumberForm">
                    <div className={'pageNumberCover focusedNumberCover'}>
                        {content}
                    </div>
                </form>
            )
        }
        else if (isHovered && isPageNumberEnabled && _slateType !== 'assessment') {
            return (
                <div className='pageNumberCover hoverNumberCover'>
                    <div className={'pageNumberBox' + ((permissions.includes('edit_print_page_no') || permissions.includes('toggle_element_page_no')) ? '' : 'disableClass')} id={"pageNumberBox-" + element.id}>
                        Page #
                    <input className="textBox" defaultValue={this.state.inputValue} type="text" />
                    </div>
                </div>
            )
        }
        else {
            return (
                null
            )
        }

    }
}

PageNumberElement.displayName = "PageNumberElement"
export default PageNumberElement;