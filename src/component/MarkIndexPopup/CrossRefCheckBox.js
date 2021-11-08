import React from 'react'

export const CrossRefCheckbox = (props) => {
    const { selectedData, dropDownList } = props;
    if (dropDownList.length > 0) {
        return (
            <div className="cross-ref-dropdown">
                {
                    dropDownList.map((item, index) => {
                        return (
                            <div className="checkbox-input" key={index} >
                                <input type="checkbox"
                                    name={item}
                                    value={item}
                                    defaultChecked={selectedData.includes(item)}
                                    onChange={() => props.handleSelectedCheckboxValue(item)}
                                />
                                <span>
                                    {item}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        )
    } else {
        return null;
    }
}
