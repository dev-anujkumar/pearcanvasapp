import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import '../../styles/Tooltip/Tooltip.css'

/**
 * Tooltip component
 */
export default function Tooltip(props) {
    const {direction, tooltipText, children} = props
    const [directionState, setDirectionState] = useState('')

    useEffect(() => {
        setDirectionState(direction)
    }, {})

    return(
        <>
            <div className="tooltip">
                {children}
                <span className={`tooltiptext tooltip-${directionState}`}>{tooltipText}</span>
            </div>
        </>
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