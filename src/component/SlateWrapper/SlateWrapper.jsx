// IMPORT - Plugins //
import React, { Component } from 'react';

// IMPORT - Components //
import ElementContainer from '../ElementContainer/ElementContainer';

// IMPORT - Assets //
import '../../styles/SlateWrapper/style.css';

class SlateWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = [
            {
                type: 'element-authoredtext',
                id: '2132-werwer-3423f-234234'
            }
        ]
    }

    render() {
        return (
            <div className='slate-content'>
                <ElementContainer element={this.state[0]} />
            </div>
        );
    }
}
export default SlateWrapper;