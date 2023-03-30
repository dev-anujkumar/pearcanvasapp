import React from 'react'
/**Import Assets */
import tableIcon from "../../../src/images/ElementButtons/tableIcon.svg";
import blankTable from "../../../src/images/ElementButtons/combined-shape.svg";
/**Import Constants */
import { FIGURE_TABLE_TITLE, FIGURE_TABLE_BUTTON_TITLE } from './ElementFigure_Constants'

/**
 * This is Pure Component to render Table Asset of FigureImage Component
 */
const FigureTableAsset = (props) => {
    const { dataType, imageDimension } = props.figureTypeData
    return (
        <div className="figure-element-container interface-container">
            <div id="figure_add_div" className={`pearson-component image figureData ${props.model.figuredata.tableasHTML !== "" ? 'table-figure-data' : ""}`} data-type={dataType} >
                <div className="tableMediaWrapper">
                    <div className="tableIconWrapper">
                        <div className="table-icon-wrapper">
                            <img className='tableIcon' src={tableIcon} />
                            <span className='tableTitle'>{FIGURE_TABLE_TITLE}</span>
                        </div>
                    </div>
                    <div className="tableAssetWrapper">
                        {
                            props.model.figuretype === "tableasmarkup" && (props.model.figuredata.tableasHTML && (props.model.figuredata.tableasHTML !== "" || props.model.figuredata.tableasHTML !== undefined)) ?
                                <div className="table-asset-wrapper-with-asset" onClick={!hasReviewerRole() && ((e) => props.addFigureResource(e))}>
                                    <div id={`${props.index}-tableData`} className={imageDimension} dangerouslySetInnerHTML={{ __html: props.model.figuredata.tableasHTML }} ></div>
                                </div> :
                                <div className="table-asset-wrapper-without-asset">
                                    <img className="blankTable" src={blankTable} />
                                    <button className="table-asset-button" onClick={!hasReviewerRole() && ((e) => props.addFigureResource(e))}>
                                        <span className="table-asset-button-label">
                                            {FIGURE_TABLE_BUTTON_TITLE}
                                        </span>
                                    </button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FigureTableAsset