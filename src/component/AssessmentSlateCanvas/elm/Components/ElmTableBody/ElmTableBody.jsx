/**
* Table Body Component of ELM Table
*/
import React from 'react';
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';
import { getFolderLabel } from '../../UtilityFunctions/ElmLearnosityUtility.js';
import { elmInteractiveIcon, singleAssessmentItemIcon, elmAssessmentItem } from '../../../../../images/ElementButtons/ElementButtons.jsx';
import { ELM_INT } from '../../../AssessmentSlateConstants.js';

const ElmTableBody = (props) => {

    const { tableValue, isActiveRow, openedFrom, elementType, handleClickAssessment, showNewValueList } = props;

    /*** @description - Function to set current item icon
    * @param itemType - type of item
    */
    const setElmIcon = (itemType) => {
        let elmIcon;
        switch (itemType) {
            case "interactive":
                elmIcon = elmInteractiveIcon;
                break;
            case "assessmentItem":
                elmIcon = singleAssessmentItemIcon;
                break;
            case "assessment":
            default:
                elmIcon = elmAssessmentItem;
                break;
        }
        return elmIcon;
    }

    /*** @description - Function to render Table Body structure
        * @param item - object that contains data of current table row
        * @param type - type of item
    */
    const setElmTableJsx = (item, index) => {
        let elmTableBody;
        let itemType = ["interactive", "assessment", "assessmentItem"];
        if ((itemType.indexOf(item.type) > -1) && item.urn.includes("work")) {
            elmTableBody = <tr key={index} className={`row-class ${isActiveRow === index ? 'select' : 'not-select'}`}>
                <td className='td-class elm-text-assesment' key={index} >
                    <div className="icon-div">
                        <input type="radio" className="radio-button" name="assessment-radio" value={item.urn} checked={isActiveRow === index} onClick={() => handleClickAssessment(index, item, item.type, openedFrom)} />
                        <span className="elmAssessmentItem-icon">{setElmIcon(item.type)}</span>
                    </div>
                    <span className="elm-data-span"><b className='elm-assessment-title'> {item.title ? item.title : item.urn}</b></span>
                </td>
                {(elementType == ELM_INT) && <td className='td-class interactive-type'><b className="elm-text-assesment">{item.interactiveType ? item.interactiveType.label : ""}</b></td>}
                <td className='td-class elm-urn'><b className="elm-text-assesment">{item.urn}</b></td>
            </tr>
        }
        else {
            elmTableBody = <tr key={index} className={`row-class ${isActiveRow === index ? 'select' : 'not-select'}`} onClick={(e) => { showNewValueList(e, item.urn) }}>
                <td className='td-class assessment-container' key={index} colSpan={(elementType == ELM_INT) ? "3" : "2"}>
                    <div className="desc-box">{getFolderLabel(item.label)} <span className="folder-icon"></span> </div>
                    <b className="elm-text-folder elm-assessment-title">{item.title}</b>
                </td>
            </tr>
        }

        return elmTableBody
    }

    return (
        <>
            <tbody>
                {tableValue.map((item, index) => {
                    return setElmTableJsx(item, index)
                })}
            </tbody>
        </>
    );
}
export default ElmTableBody;