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
        this.asideRef = React.createRef();
    }
    componentDidMount(){
        this.asideRef.current.addEventListener("focus", this.props.handleFocus);
    }

    componentWillUnmount(){
        this.asideRef.current.removeEventListener("focus", this.props.handleFocus);
    }

       /**
    * 
    * @discription - renderSlate | renders slate editor area with all elements it contain
    * @param {string} element -object of element
    */ 
   
   renderContainer({ element: _containerData }) {
    try {
        if (_containerData !== null && _containerData !== undefined) {
            if (Object.values(_containerData).length > 0) {
                let { id: _containerId, type: _containerType, contents: _contents, elementdata: _elementData } = _containerData,
                 { title: _slateTitle, bodymatter: _bodyMatter } = _contents || _elementData,
                 { index } = this.props,
                    parentEntityUrn = _containerData.contentUrn,
                    filterElement = _bodyMatter.filter( (ele) => ele.type == "manifest"),
                    elementLength = _bodyMatter.length - filterElement.length
                return (
                    <div className="container-aside" data-id={_containerId} container-type={_containerType}>
                        {
                            this.renderElement(_bodyMatter, parentEntityUrn, index,elementLength)
                        }
                    </div>
                )
            }
        }
    } catch (error) {
        // handle error
    }
}
        /**
    * 
    * @discription - This function is section break
    * @param {string} element -object of element
    */
   section(element, index) {

    let { id: _elementId, type: _elementType, contents: _containerContent, elementdata: _elementData } = element;
    let { bodymatter: _containerBodyMatter } = _containerContent || _elementData;
    let parentEntityUrn = element.contentUrn;

    let parentIndex = `${this.props.index}-${index}`
    let elementLength = _containerBodyMatter.length
    return (
        <div key = {index} className="section" data-id={_elementId} >
            <hr className="work-section-break" />
            {this.renderElement(_containerBodyMatter, parentEntityUrn, parentIndex,elementLength)}
        </div>
    )
}

      /**
    * 
    * @discription - This function is section break
    * @param {string} _elements -object of element
    */
 
   sectionBreak(_element, index) {
    let { id: _elementId, type: _elementType, contents: _containerContent, elementdata: _elementData } = _element;
    let { bodymatter: _containerBodyMatter } = _containerContent || _elementData;
    let parentEntityUrn = _element.contentUrn;
    const { elemBorderToggle, borderToggle } = this.props
    let parentIndex = `${this.props.index}-${index}`
    let elementLength = _containerBodyMatter.length
    return (
        <div  key = {index} className="aside-section-break" data-id={_elementId}>
            <SectionSeperator
                elemBorderToggle={elemBorderToggle}
                borderToggle={borderToggle}
                setActiveElement={this.props.setActiveElement}
                element={_element}
            />
            {this.renderElement(_containerBodyMatter, parentEntityUrn, parentIndex,elementLength)}

        </div>
    )

}

     /**
    * 
    * @discription - This function is renders element
    * @param {string} _elements -object of element
    * @param {string} parentEntityUrn -parent Entity urn for add new element
    */
   renderElement(_elements, parentEntityUrn, parentIndex, elementLength) {
    let firstSection = true;
    //let elementLength =_elements.length-1;
    let showSectionBreak ; 
    try {
        if (_elements !== null && _elements !== undefined) {
            return _elements.map((element, index) => {
                if (element.type == "manifest" && firstSection) {
                    firstSection = false;
                    return this.section(element, index);
                } else if (element.type == "manifest" && !firstSection) {
                    return this.sectionBreak(element, index);
                }
                else {
                     showSectionBreak = (elementLength == index + 1)? true:false
                    return (
                        <React.Fragment>
                            {index === 0 && (!this.props.element.subtype || this.props.element.subtype == "sidebar") && <ElementSaprator
                                upperOne={true}
                                index={index}
                                key={`elem-separtor-${element.id}`}
                                esProps={this.props.elementSepratorProps(index, false, parentEntityUrn)}
                                elementType={this.props.element.type}
                            />
                            }
                            <ElementContainer
                                element={element}
                                key={element.id}
                                index={`${parentIndex}-${index}`}

                            // handleCommentspanel={this.props.handleCommentspanel}
                            />
                            <ElementSaprator
                                index={index}
                                key={`elem-separtor-${element.id}`}
                                esProps={this.props.elementSepratorProps(index, false, parentEntityUrn)}
                                elementType={this.props.element.type}
                                sectionBreak={ this.props.element.subtype == "workedexample" ? showSectionBreak :false}
                            />
                        </React.Fragment>
                    )
                }

            })
        }

    } catch (error) {
        console.log("error", error)
    }
   }

    /**
     * render | renders title and slate wrapper
     */
    render() {
        const { element } = this.props
        return (
           <div  className = "aside-container" tabIndex="0" onBlur = {this.props.handleBlur} ref={this.asideRef} >
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