// IMPORT - Plugins //
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// IMPORT - Components //
import ElementContainer from '../ElementContainer/ElementContainer';

// IMPORT - Assets //
import '../../styles/SlateWrapper/style.css';

class SlateWrapper extends Component {
    constructor(props) {
        super(props);
    }

    renderSlate(_slateData) {
        let _slateObject = Object.values(_slateData)[0];
        let { id: _slateId, type: _slateType, contents: _slateContent } = _slateObject;
        let { title: _slateTitle, bodymatter: _slateBodyMatter } = _slateContent;
        return (
            <div className='slate-content' slate-id={_slateId} slate-type={_slateType}>
                {
                    this.renderElement(_slateBodyMatter)
                }
            </div>
        )
    }

    renderElement(_elements) {
        return _elements.map((element) => {
            return (
                <ElementContainer
                    element={element}
                    key={element.id}
                />
            )
        })
    }

    render() {
        return (
            this.renderSlate(this.props.slateData)
        );
    }
}

SlateWrapper.propTypes = {
    slateData: PropTypes.object.isRequired
}

export default SlateWrapper;