/**
*  Input Search Component
*/
import React, { useState } from 'react'
export const InputSearch = (props) => {
    const [searchValue, setSearchValue] = useState('');

    const { searchClass, searchId, maxInputLimit, placeholderText, searchValueHandler } = props;
    /*** @description - This function is to handle the value in searchbar input
         * @param event - event triggered
        */
    const handleChange = (event) => {
        let value = event.target.value;
        setSearchValue(value);
        searchValueHandler(value);
    }

    return (
        <input
            className={searchClass}
            id={searchId}
            type="text"
            maxlength = {maxInputLimit}
            value={searchValue}
            onChange={handleChange}
            placeholder={placeholderText}
        />
    );
}
