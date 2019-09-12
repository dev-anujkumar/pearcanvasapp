// IMPORT - Plugins //
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// IMPORT - Components //
import SlateHeader from '../CanvasSlateHeader';
import ElementContainer from '../ElementContainer';
import ElementSaprator from '../ElementSaprator';
import { LargeLoader, SmalllLoader } from './ContentLoader.jsx';
import { SlateFooter } from './SlateFooter.jsx';
import {
    createElement
} from './SlateWrapper_Actions';
// IMPORT - Assets //
import '../../styles/SlateWrapper/style.css';

class SlateWrapper extends Component {
    constructor(props) {
        super(props);

    }

    /**
     * renderSlateHeader | renders slate title area with its slate type and title
     */
    renderSlateHeader({ slateData: _slateData }) {
        try {
            if (_slateData !== null && _slateData !== undefined) {
                if (Object.values(_slateData).length > 0) {
                    let _slateObject = Object.values(_slateData)[0];
                    let _finalSlateObject = Object.values(_slateObject)[0];
                    let { type: _slateType, contents: _slateContent } = _finalSlateObject;
                    let { title: _slateTitle } = _slateContent;
                    return (
                        <SlateHeader onNavigate={this.props.navigate} slateType={_slateType} slateTitle={_slateTitle} />
                    )
                }
                else {
                    return (
                        <SmalllLoader />
                    )
                }
            }
            else {
                // handle error
            }
        } catch (error) {
            // handle error
        }
    }

    /*** renderSlate | renders slate editor area with all elements it contain*/
    renderSlate({ slateData: _slateData }) {
        try {
            if (_slateData !== null && _slateData !== undefined) {
                if (Object.values(_slateData).length > 0) {
                    let _slateObject = Object.values(_slateData)[0];
                    let _finalSlateObject = Object.values(_slateObject)[0];
                    let { id: _slateId, type: _slateType, contents: _slateContent } = _finalSlateObject;
                    let { title: _slateTitle, bodymatter: _slateBodyMatter } = _slateContent;
                    return (
                        <div className='slate-content' slate-id={_slateId} slate-type={_slateType}>
                            <div className='element-list'>
                                {
                                    this.renderElement(_slateBodyMatter)
                                }
                            </div>
                            <SlateFooter />
                        </div>
                    )
                }
                else {
                    return (
                        <React.Fragment>
                            <LargeLoader />
                            <LargeLoader />
                            <LargeLoader />
                            <LargeLoader />
                        </React.Fragment>
                    )
                }
            }
            else {
                // handle error
            }
        } catch (error) {
            // handle error
        }
    }

    splithandlerfunction = (type, index) => {
        switch (type) {
            case 'text-elem':
                this.props.createElement("element-authoredtext", Number(index + 1))
                break;
            case 'image-elem':
                break;
            case 'audio-elem':
                break;
            case 'interactive-elem':
                break;
            case 'assessment-elem':
                break;
            case 'container-elem':
                break;
            case 'worked-exp-elem':
                break;
            case 'opener-elem':
                break;
            default:
        }
    }

    elementSepratorProps = (index) => {
        return [
            {
                buttonType: 'text-elem',
                buttonHandler: () => this.splithandlerfunction('text-elem', index),
                tooltipText: 'Text',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'image-elem',
                buttonHandler: () => this.splithandlerfunction('image-elem', index),
                tooltipText: 'Image',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'audio-elem',
                buttonHandler: () => this.splithandlerfunction('audio-elem', index),
                tooltipText: 'Audio/Video',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'interactive-elem',
                buttonHandler: () => this.splithandlerfunction('interactive-elem', index),
                tooltipText: 'Interactive',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'assessment-elem',
                buttonHandler: () => this.splithandlerfunction('assessment-elem', index),
                tooltipText: 'Assessment',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'container-elem',
                buttonHandler: () => this.splithandlerfunction('container-elem', index),
                tooltipText: 'Container',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'worked-exp-elem',
                buttonHandler: () => this.splithandlerfunction('worked-exp-elem', index),
                tooltipText: 'Worked Example',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'opener-elem',
                buttonHandler: () => this.splithandlerfunction('opener-elem', index),
                tooltipText: 'Opener Element',
                tooltipDirection: 'left'
            }
        ]

    }

    /**
     * renderElement | renders single element according to its type
     */
    renderElement(_elements) {
        try {
            if (_elements !== null && _elements !== undefined) {
                return _elements.map((element, index) => {
                    return (
                        <React.Fragment>
                            {index === 0 && <ElementSaprator
                                upperOne={true}
                                index={index}
                                key={`elem-separtor-${element.id}`}
                                esProps={this.elementSepratorProps(index)}
                                elementType={element.type}
                            />
                            }
                            <ElementContainer
                                element={element}
                                key={element.id}
                                index={index}
                                labelText={this.props.tags[element.id]}
                                handleCommentspanel={this.props.handleCommentspanel}
                            />
                            <ElementSaprator
                                index={index}
                                key={`elem-separtor-${element.id}`}
                                esProps={this.elementSepratorProps(index)}
                                elementType={element.type}
                            />
                        </React.Fragment>
                    )
                })
            }
            else {
                // handle error
            }
        } catch (error) {
            // handle error
        }
    }

    /**
     * render | renders title and slate wrapper
     */
    render() {
        return (
            <React.Fragment>
                <div className='title-head-wrapper'>
                    {
                        this.renderSlateHeader(this.props)
                    }
                </div>
                <div className='slate-wrapper'>
                    {
                        this.renderSlate(this.props)
                    }
                </div>
            </React.Fragment>
        );
    }

}

SlateWrapper.propTypes = {
    /** slate data attached to store and contains complete slate object */
    slateData: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {

    };
};


export default connect(
    mapStateToProps,
    {
        createElement
    }
)(SlateWrapper);
