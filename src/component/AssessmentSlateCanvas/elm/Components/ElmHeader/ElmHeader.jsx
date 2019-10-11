import React, { Component } from 'react';
import styles from './ElmHeaderStyle';

class ElmHeader extends Component {
    render() {
        const { title } = this.props.elmHeaderProps;

        return (
            <div style={styles.headerBlock}>
                <h4 style={styles.headerTitle}>
                    {title}
                </h4>
                <button style={{float: 'right',marginTop: '14px',marginRight: '15px'}} onClick={this.props.elmHeaderProps.closeElmWindow}>
                    <svg version="1.1" id="Capa_1" x="0px" y="0px" width="10px" height="10px" viewBox="0 0 357 357" xmlSpace="preserve">
                        <g>
                            <g id="close">
                                <polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 
                                    214.2,178.5"/>
                            </g>
                        </g>
                    </svg>
                </button> 
            </div>
        );
    }
}

export default ElmHeader;