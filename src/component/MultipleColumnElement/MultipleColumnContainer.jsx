/** Libraries */
import React, { PureComponent } from 'react'
import MultiColumnContainerContext from '../ElementContainer/MultiColumnContext';

class MultipleColumnContainer extends PureComponent {
    render() {
        const { context } = this;
        return (
            <div className = "multi-column-container">
                Please select a column to start editing
            </div>
        )
    }
}

MultipleColumnContainer.contextType = MultiColumnContainerContext;
export default MultipleColumnContainer;