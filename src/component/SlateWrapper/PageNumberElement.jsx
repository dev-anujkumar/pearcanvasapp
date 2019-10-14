/**
 * Module - PageNumberElement
 * Description - this component is to show pagenumber up at element container
 * Developer - Abhay Singh
 * Last modified - 10-09-2019
 */

// IMPORT - Plugins //
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PageNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
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
        // ******************************************************************************
        // if(this.props.slateLockInfo.status){
        //     this.slateLockAlert(this.props.slateLockInfo.userInfo);
        //     return false;
        // }
        // else{
        //     $(e.currentTarget).parents('.pageNumberBox').addClass('greenBorder');
        // }
        // ******************************************************************************
        e.currentTarget.parents('.pageNumberBox').classList.add('greenBorder');
        /*following will stop event propgation to upside in nested element*/
        e.stopPropagation();
    }

    updatePageNumber = (e, currOperation, changedInputValue) => {
        console.log('loader', this.state.loader)
        this.setState({ loader: true });
        e.currentTarget.parents('.pageNumberBox').classList.remove('greenBorder');

        setTimeout(() => {
            this.setState({ loader: false });
        }, 1000);
    }

    render() {
        let { element, isHovered, isPageNumberEnabled, activeElement } = this.props;
        let loader = this.state.loader;
        let content = null;
        if (loader)
            content = <div className='pageNumberBoxLoader'><div className='loaderPage'></div></div>
        else {
            content = <div className='pageNumberBox' id={"pageNumberBox-" + element.id}>
                Page #
            <input className="textBox" readOnly={false} onBlur={(e) => { this.updatePageNumber(e) }} onChange={this.pageNoChangeHandler} maxLength="8" value={this.state.inputValue} onMouseLeave={(e) => { }} onMouseEnter={(e) => { }} type="text" onClick={this.textBoxClicked} onKeyPress={this.handleKeyUp} />
                {
                    (this.state.inputValue !== '') ?
                        <span className="closeBtn" onMouseDown={(e) => { }}>
                            <i className="fa fa-close" aria-hidden="true"></i>
                        </span> : ''
                }
            </div>
        }
        if (isPageNumberEnabled && activeElement && element.id === activeElement.elementId) {
            return (
                <form id="pageNumberForm">
                    <div className={'pageNumberCover focusedNumberCover'}>
                        {content}
                    </div>
                </form>
            )
        }
        else if (isHovered && isPageNumberEnabled) {
            return (
                <div className='pageNumberCover hoverNumberCover'>
                    <div className='pageNumberBox' id={"pageNumberBox-" + element.id}>
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

PageNumber.displayName = "PageNumberElement"

export default PageNumber;