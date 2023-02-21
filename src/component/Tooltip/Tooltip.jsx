/**
 * Tooltip component
 */
import React from 'react'
import PropTypes from 'prop-types'

import '../../styles/Tooltip/Tooltip.css'
import InputCounter from './InputCounter.jsx'

const showTooltip = ['block-text-button','interactive-elem-button','container-elem-button',' multi-column-group']
export default function Tooltip(props) {
    /**
     * Hooks declearation
     */
    const {direction, tooltipText, children, showClass, showDetails,calledFrom,counter,setElementCount,elementType} = props
    console.log('elementType',elementType)
    return(
        <div className="tooltip">
            {children}
            <span className={`${(showClass == true || showDetails == true)? 'hide': `tooltiptext tooltip-${direction}`}`}>{tooltipText}
            {/* {calledFrom === 'elem-sep' && <input id={`counter-${elementType}`} type='number' min='1' max='5' defaultValue={1} onChange={(e) => setElementCount({[elementType]:e.target.value})} style={{width:'30px'}}/>} */}
            {calledFrom === 'elem-sep' && !showTooltip.includes(elementType) &&  <InputCounter elementType={elementType} setElementCount={setElementCount}/>}
            </span>
        </div>
    )
}

/**
 * Tooltip default props
 */
Tooltip.defaultProps = {
    direction : 'left',
    tooltipText : 'tooltip'
}

/**
 * Tooltip Props
 */
Tooltip.propTypes = {
    direction : PropTypes.string.isRequired,
    tooltipText : PropTypes.string.isRequired
}