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
    createElement ,createVideoElement
    , createFigureElement
} from './SlateWrapper_Actions';
import ListComponent from '../ListComponent'; // In Testing Phase
// IMPORT - Assets //
import '../../styles/SlateWrapper/style.css';

class SlateWrapper extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount(){
        if(document.getElementById("cypress-0")){
            document.getElementById("cypress-0").focus();
        }
    }

    /**
     * renderSlateHeader | renders slate title area with its slate type and title
     */
    renderSlateHeader({ slateData: _slateData }) {
        try {
            if (_slateData !== null && _slateData !== undefined) {
                if (Object.values(_slateData).length > 0) {
                    let _slateObject = Object.values(_slateData)[0];
                   // let _finalSlateObject = Object.values(_slateObject)[0];
                    let { type: _slateType, contents: _slateContent } = _slateObject;
                    let { title: _slateTitle } = _slateContent;
                    return (
                        <SlateHeader disabled={this.props.disabled} onNavigate={this.props.navigate} slateType={_slateType} slateTitle={_slateTitle} />
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
                    // let _finalSlateObject = Object.values(_slateObject)[0];
                    let { id: _slateId, type: _slateType, contents: _slateContent } = _slateObject;
                    let { title: _slateTitle, bodymatter: _slateBodyMatter } = _slateContent;
                    return (
                        <div className='slate-content' slate-id={_slateId} slate-type={_slateType}>
                            <div className='element-list'>
                                {
                                    // this.renderElement(_slateBodyMatter, _slateType)
                                }
                                <ListComponent />
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
                            <LargeLoader />
                            <LargeLoader />
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

    splithandlerfunction = (type, index, firstOne) => {
        let indexToinsert
        // Detects element insertion from the topmost element separator
        if(firstOne){
            indexToinsert = Number(index)
        } else {
            indexToinsert = Number(index + 1)
        }
        switch (type) {
            case 'text-elem':
                this.props.createElement("element-authoredtext", indexToinsert)
                break;
            case 'image-elem':
                var eleFigure = {
                    "type": "figure",
                    "figuretype": "image",
                    "subtype": "image50Text",
                    "alignment": "half-text",
                }
                this.props.createFigureElement(eleFigure, Number(index + 1))
                break;
            case 'audio-elem':
                var elevideo = {
                    "type": "figure",
                    "figuretype": "video",
                    "subtype": "figureVideo",
                    "alignment": "full"
                }
                this.props.createVideoElement(elevideo, Number(index + 1))
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

    elementSepratorProps = (index, firstOne) => {
        return [
            {
                buttonType: 'text-elem',
                buttonHandler: () => this.splithandlerfunction('text-elem', index, firstOne),
                tooltipText: 'Text',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'image-elem',
                buttonHandler: () => this.splithandlerfunction('image-elem', index, firstOne),
                tooltipText: 'Image',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'audio-elem',
                buttonHandler: () => this.splithandlerfunction('audio-elem', index, firstOne),
                tooltipText: 'Audio/Video',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'interactive-elem',
                buttonHandler: () => this.splithandlerfunction('interactive-elem', index, firstOne),
                tooltipText: 'Interactive',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'assessment-elem',
                buttonHandler: () => this.splithandlerfunction('assessment-elem', index, firstOne),
                tooltipText: 'Assessment',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'container-elem',
                buttonHandler: () => this.splithandlerfunction('container-elem', index, firstOne),
                tooltipText: 'Container',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'worked-exp-elem',
                buttonHandler: () => this.splithandlerfunction('worked-exp-elem', index, firstOne),
                tooltipText: 'Worked Example',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'opener-elem',
                buttonHandler: () => this.splithandlerfunction('opener-elem', index, firstOne),
                tooltipText: 'Opener Element',
                tooltipDirection: 'left'
            }
        ]

    }

    /**
     * renderElement | renders single element according to its type
     */
    renderElement(_elements, _slateType) {
        try {
            if (_elements !== null && _elements !== undefined) {
                return _elements.map((element, index) => {
                    return (
                        <React.Fragment key={element.id}>
                            {
                            index === 0 ? 
                            <ElementSaprator
                                firstOne={index === 0}
                                index={index}
                                esProps={this.elementSepratorProps(index, true)}
                                elementType={element.type}
                            />
                            : null
                             }
                            <ElementContainer
                                element={element}
                                index={index}
                                labelText={this.props.tags[element.id]}
                                handleCommentspanel={this.props.handleCommentspanel}
                            />
                            <ElementSaprator
                                index={index}
                                esProps={this.elementSepratorProps(index)}
                                elementType={element.type}
                                slateType = {_slateType}
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
            console.error(error);
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
SlateWrapper.displayName = "SlateWrapper"

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
        createElement,
        createVideoElement,
        createFigureElement
    }
)(SlateWrapper);
