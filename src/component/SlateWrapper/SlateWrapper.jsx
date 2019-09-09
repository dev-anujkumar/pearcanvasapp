// IMPORT - Plugins //
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// IMPORT - Components //
import SlateHeader from '../CanvasSlateHeader';
import ElementContainer from '../ElementContainer';
import ElementSaprator from '../ElementSaprator';
import { LargeLoader, SmalllLoader } from './ContentLoader.jsx';
import { SlateFooter } from './SlateFooter.jsx';

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
                    let { type: _slateType, contents: _slateContent } = _slateObject;
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
                    let { id: _slateId, type: _slateType, contents: _slateContent } = _slateObject;
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

    /**
     * renderElement | renders single element according to its type
     */
    renderElement(_elements) {
        try {
            if (_elements !== null && _elements !== undefined) {
                return _elements.map((element,index) => {
                    return (
                        <React.Fragment>
                            <ElementContainer
                                element={element}
                                key={element.id}
                                index={index}
                                handleCommentspanel ={this.props.handleCommentspanel}
                                handleActiveElement={this.props.handleActiveElement}
                            />
                             <ElementSaprator
                                key={`elem-separtor-${element.id}`}
                                esProps = {[
                                    {
                                      buttonType : 'text-elem',
                                      buttonHandler : this.splithandlerfunction,
                                      tooltipText : 'Text',
                                      tooltipDirection : 'left'
                                    },
                                    {
                                      buttonType : 'image-elem',
                                      buttonHandler : this.splithandlerfunction,
                                      tooltipText : 'Image',
                                      tooltipDirection : 'left'
                                    },
                                    {
                                      buttonType : 'audio-elem',
                                      buttonHandler : this.splithandlerfunction,
                                      tooltipText : 'Audio/Video',
                                      tooltipDirection : 'left'
                                    },
                                    {
                                      buttonType : 'interactive-elem',
                                      buttonHandler : this.splithandlerfunction,
                                      tooltipText : 'Interactive',
                                      tooltipDirection : 'left'
                                    },
                                    {
                                      buttonType : 'assessment-elem',
                                      buttonHandler : this.splithandlerfunction,
                                      tooltipText : 'Assessment',
                                      tooltipDirection : 'left'
                                    },
                                    {
                                      buttonType : 'container-elem',
                                      buttonHandler : this.splithandlerfunction,
                                      tooltipText : 'Container',
                                      tooltipDirection : 'left'
                                    },
                                    {
                                      buttonType : 'worked-exp-elem',
                                      buttonHandler : this.splithandlerfunction,
                                      tooltipText : 'Worked Example',
                                      tooltipDirection : 'left'
                                    },
                                    {
                                      buttonType : 'opener-elem',
                                      buttonHandler : this.splithandlerfunction,
                                      tooltipText : 'Opener Element',
                                      tooltipDirection : 'left'
                                    }
                                  ]
                                }
                                elementType = {element.type}
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

    splithandlerfunction = () => {
        alert('Click handler function Called')
    }
}

SlateWrapper.propTypes = {
    /** slate data attached to store and contains complete slate object */
    slateData: PropTypes.object.isRequired
}

export default SlateWrapper;
