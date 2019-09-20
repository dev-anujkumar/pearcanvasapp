// IMPORT - Plugins //
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// IMPORT - Components //
import ElementContainer from '../ElementContainer';
import ElementSaprator from '../ElementSaprator';
//import { LargeLoader, SmalllLoader } from './ContentLoader.jsx';
import './../../styles/ElementAsideContainer/ElementAsideContainer.css';
import SectionSeperator from './SectionSeperator.jsx';
// IMPORT - Assets //

class ElementAsideContainer extends Component {
    constructor(props) {
        super(props);
        this.state= {
            sectionFocus:false,
            btnClassName:""

        }
    }
    componentDidMount(){
        this.aside.addEventListener("focus", this.props.handleFocus);
    }
    
    componentWillUnmount(){
       this.aside.removeEventListener("focus", this.props.handleFocus);
    }

    /*** renderSlate | renders slate editor area with all elements it contain*/
    renderContainer({ element: _containerData }) {
          try {
        if (_containerData !== null && _containerData !== undefined) {
            if (Object.values(_containerData).length > 0) {
                let { id: _containerId, type: _containerType, contents: _contents, elementdata: _elementData } = _containerData;
                let { title: _slateTitle, bodymatter: _bodyMatter } = _contents || _elementData;
                let parentEntityUrn = _containerData.contentUrn;
                return (
                    <div container-id={parentEntityUrn} container-type={_containerType}>
                        {
                            this.renderElement(_bodyMatter,parentEntityUrn)
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
         } catch (error) {
            // handle error
        } 
    }
    section(element) {
        let firstSection = true;
        let { id: _elementId, type: _elementType, contents: _containerContent, elementdata: _elementData } = element;
        let { bodymatter: _containerBodyMatter } = _containerContent || _elementData;
        let parentEntityUrn = element.contentUrn;
        if (firstSection) {
            return (
                <div container-id = {parentEntityUrn}>
                    <hr className="section-break" />
                    {this.renderElement(_containerBodyMatter,parentEntityUrn)}
                </div>
            )
        }
        else {

        }

    }
 
    sectionBreak(_element,index) {
        let { id: _elementId, type: _elementType, contents: _containerContent, elementdata: _elementData } = _element;
        let { bodymatter: _containerBodyMatter } = _containerContent || _elementData;
        let parentEntityUrn = element.contentUrn;
        const {elemBorderToggle,borderToggle} = this.props
        return (
            <div container-id = {parentEntityUrn}>

                <SectionSeperator 
                    elemBorderToggle = {elemBorderToggle}
                    borderToggle = {borderToggle}
                 />
                {this.renderElement(_containerBodyMatter,parentEntityUrn)}
             
            </div>
        )

    }

    /**
     * renderElement | renders single element according to its type
     */
    renderElement(_elements,parentEntityUrn) {
        let firstSection = true;
           try {
        if (_elements !== null && _elements !== undefined) {
            return _elements.map((element, index) => {
                if (element.type == "manifest" && firstSection) {
                    firstSection = false;
                    return this.section(element);
                } else if (element.type == "manifest" && !firstSection) {
                    return this.sectionBreak(element,index);
                }
                else {
                    return (
                        <React.Fragment>
                            {index === 0 && !this.props.element.subtype && <ElementSaprator
                                upperOne={true}
                                index={index}
                                key={`elem-separtor-${element.id}`}
                                esProps={this.props.elementSepratorProps(index,false,parentEntityUrn)}
                                elementType={this.props.element.type}
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
                                esProps={this.props.elementSepratorProps(index,false,parentEntityUrn)}
                                elementType={this.props.element.type}
                            />
                        </React.Fragment>
                    )
                }

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
        const { element } = this.props
        return (
           <div  className = "aside-container" tabIndex="0" onBlur = {this.props.handleBlur} ref={elem => this.aside = elem} >
                {element.subtype == "workedexample" ? <hr className={`aside-horizotal-break ${element.designtype == "workedexample2"? 'aside-horizotal-break-green':""}`} /> : ""}
                {this.renderContainer(this.props)}
                 {element.subtype == "workedexample" ?<hr className= {`aside-break-bottom ${element.designtype == "workedexample2"? 'aside-break-bottom-green':""}`}></hr>:""}
           </div>
        );
    }
}

ElementAsideContainer.propTypes = {
    /** slate data attached to store and contains complete slate object */
    element: PropTypes.object.isRequired
}

export default ElementAsideContainer;