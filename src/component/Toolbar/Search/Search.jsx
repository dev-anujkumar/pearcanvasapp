import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import { SELECTORS, PLACEHOLDER } from './../../../constants/Search_Constants.js';
import { searchEvent, getContainerData } from './Search_Action.js';

const SearchComponent = props => {
    const [searchTerm, handleChange] = useState(props.searchTerm || '');
    const [searchIndex, handleSearchIndex] = useState(searchEvent.index || 0);
    const [searchTotalCount, handleSearchTotalData] = useState(searchEvent.totalCount || 0);
    let searchRef = useRef();

    useEffect(() => {
        if(props.searchTerm !== '' && props.searchTerm !== searchTerm) {
            handleChange(props.searchTerm || '');
        }

        if(searchIndex !== searchEvent.index) {
            handleSearchIndex(searchEvent.index);
        }
        if(searchTotalCount !== searchEvent.totalCount) {
            handleSearchTotalData(searchEvent.totalCount);
        }
        
        document.addEventListener("mousedown", e => handleSearchBlur(e));
    });

    const handleSearchBlur = (evt) => {
        if(searchRef && !searchRef.contains(evt.target)) {
            console.log('focused:::',searchRef.current);
            handleClose(evt);
        }
    }

    const renderSelector = () => {
        return SELECTORS.map(item => <div key={item} className="selector">{item}</div>);
    }

    const handleSearchChange = e => {
        e.preventDefault();
        e.stopPropagation();
        let value = e.target.value;
        handleChange(value);
        props.getContainerData(value);  
    }

    const handleClose = e => {
        handleChange('');
        props.getContainerData('');
        props.onClose(e, false);
    }

    const handleNavigation = (e, navigation) => {
        e.stopPropagation();
        if(navigation === 'prev') {
            searchEvent.index = searchEvent.index == 1 ? searchEvent.totalCount : --searchEvent.index;
        } else if(navigation === 'next') {
            searchEvent.index = searchEvent.index == searchEvent.totalCount ? 1 : ++searchEvent.index;
        }
        handleSearchIndex(searchEvent.index);
        handleSearchTotalData(searchEvent.totalCount);
    }

    const setSearchRef = element => {
        searchRef = element;
    }
    
    return (
        <div ref={setSearchRef} className={`search-wrapper ${props.search ? 'active' : ''}`}>
            <div className="search-element">
                {renderSelector()}
                <div className="search-input">
                    <input type="text" placeholder={PLACEHOLDER} value={searchTerm} onChange={handleSearchChange} />
                    <div className="search-index">{`${searchIndex}/${searchTotalCount}`}</div>
                </div>
                <div className="actions">
                    <div className={`action-item ${searchEvent.totalCount > 1 ? '' : 'disabled'}`} onClick={e => handleNavigation(e, 'prev')}>{props.icons.searchUp}</div>
                    <div className={`action-item ${searchEvent.totalCount > 1 ? '' : 'disabled'}`} onClick={e => handleNavigation(e, 'next')}>{props.icons.searchDown}</div>
                    <div className="action-item" onClick={handleClose}>{props.icons.searchClose}</div>
                </div>
            </div>
        </div>
    );
}

export default connect(null, { getContainerData })(SearchComponent);