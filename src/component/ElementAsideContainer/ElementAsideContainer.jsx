// IMPORT - Plugins //
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// IMPORT - Components //
import ElementContainer from '../ElementContainer';
import ElementSaprator from '../ElementSaprator';
//import { LargeLoader, SmalllLoader } from './ContentLoader.jsx';

// IMPORT - Assets //

class ElementAsideContainer extends Component {
    constructor(props) {
        super(props);

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
            }
        ]

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
                   this.props.createElement("element-aside", Number(index + 1))
                break;
            case 'opener-elem':
                break;
            default:
        }
    }

    /*** renderSlate | renders slate editor area with all elements it contain*/
     renderContainer({ element: _slateData }) {
      //  try {
            if (_slateData !== null && _slateData !== undefined) {
                if (Object.values(_slateData).length > 0) {
                    let { id: _slateId, type: _slateType, contents: _slateContent, elementdata: _elementData } = _slateData;
                    let { title: _slateTitle, bodymatter: _slateBodyMatter } = _slateContent || _elementData ;
                    return (
                        <div slate-id={_slateId} slate-type={_slateType}>
                                {
                                    this.renderElement(_slateBodyMatter)
                                }
                        </div>
                    )
                }
                else {
                    return (
                        <React.Fragment>
                         {/*    <LargeLoader />
                            <LargeLoader />
                            <LargeLoader />
                            <LargeLoader /> */}
                            <div></div>
                        </React.Fragment>
                    )
                }
            }
            else {
                // handle error
            }
        /* } catch (error) {
            // handle error
        } */
    } 
    sectionBreak(element) {

        let { id: _elementId, type: _elementType, contents: _containerContent, elementdata: _elementData } = element;
        let { bodymatter: _containerBodyMatter } = _containerContent || _elementData ;
        return (
            <div>
            <hr style = {{"border" : "0.5px solid black","margin-top":"20px"}}/>
            {this.renderElement(_containerBodyMatter)}
           </div>
        )
    }

    /**
     * renderElement | renders single element according to its type
     */
     renderElement(_elements) {
    //    try {
            if (_elements !== null && _elements !== undefined) {
                return _elements.map((element, index) => {
                    if(element.type == "manifest"){
                     return  this.sectionBreak(element);
                    }
                    else{
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
                                   // handleCommentspanel={this.props.handleCommentspanel}
                                />
                                <ElementSaprator
                                    index={index}
                                    key={`elem-separtor-${element.id}`}
                                    esProps={this.elementSepratorProps(index)}
                                    elementType={element.type}
                                />
                            </React.Fragment>
                        )
                    }
           
                })
            }
            else {
                // handle error
            }
    //    } catch (error) {
            // handle error
      //  }
    } 

    /**
     * render | renders title and slate wrapper
     */
    render() {
        return (
           // <React.Fragment>
                <div>
                    
                       { this.renderContainer(this.props)}
                    
                </div>
            //</React.Fragment>
        );
    }

}

ElementAsideContainer.propTypes = {
    /** slate data attached to store and contains complete slate object */
    element: PropTypes.object.isRequired
}

/* const mapStateToProps = state => {
    return {

    };
}; */


/* export default connect(
    null,
    {
        createElement
    }
)(ElementAsideContainer);
 */
export default ElementAsideContainer;