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
        this.state = {
            sectionFocus: false,
            btnClassName: ""

        }
        this.asideRef = React.createRef();
    }
    componentDidMount() {
        this.asideRef.current.addEventListener("focus", this.handleFocus);
    }

    componentWillUnmount() {
        this.asideRef.current.removeEventListener("focus", this.handleFocus);
    }
    handleFocus = () => {
        this.props.setActiveElement(this.props.element);
        this.props.handleFocus()
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
                    let { id: _containerId, type: _containerType, contents: _contents, elementdata: _elementData } = _containerData;
                    let { title: _slateTitle, bodymatter: _bodyMatter } = _contents || _elementData;
                    let { index } = this.props
                    let parentEntityUrn = _containerData.contentUrn;
                    let parentUrn = {
                        manifestUrn:_containerId,
                        contentUrn :_containerData.contentUrn
                    }
                    return (
                        <div className="container-aside" data-id={_containerId} container-type={_containerType}>
                            {
                                this.renderElement(_bodyMatter, parentUrn, index)
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
        let parentUrn = {
            manifestUrn:_elementId,
            contentUrn :element.contentUrn
        }
        let parentIndex = `${this.props.index}-${index}`
        return (
            <div className="section" data-id={_elementId} >
                <hr className="work-section-break" />
                {this.renderElement(_containerBodyMatter, parentUrn, parentIndex)}
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
        let parentUrn = {
            manifestUrn:_elementId,
            contentUrn :_element.contentUrn
        }
        const { elemBorderToggle, borderToggle } = this.props
        let parentIndex = `${this.props.index}-${index}`
        return (
            <div className="aside-section-break" data-id={_elementId}>
                <SectionSeperator
                    elemBorderToggle={elemBorderToggle}
                    borderToggle={borderToggle}
                    setActiveElement={this.props.setActiveElement}
                    element={_element}
                />
                {this.renderElement(_containerBodyMatter, parentUrn, parentIndex, true)}

            </div>
        )

    
}

    /**
   * 
   * @discription - This function is renders element
   * @param {string} _elements -object of element
   * @param {string} parentUrn -parent Entity urn for add new element
   */
    renderElement(_elements, parentUrn, parentIndex, sectionBreak) {
        let firstSection = true;
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
                        console.log("elementid---", `${parentIndex}-${index}`);
                        return (
                            <React.Fragment>
                                {index === 0 && (!this.props.element.subtype || this.props.element.subtype == "sidebar") && <ElementSaprator
                                    upperOne={true}
                                    index={index}
                                    key={`elem-separtor-${element.id}`}
                                    esProps={this.props.elementSepratorProps(index, false, parentUrn)}
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
                                    esProps={this.props.elementSepratorProps(index, false, parentUrn)}
                                    elementType={this.props.element.type}
                                    sectionBreak={sectionBreak}
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
   * 
   * @discription - This function is renders workexample
   * @param {string} designtype -string to select type of work example
   */

    renderWorkExample = (designtype) => {
        return (
            <React.Fragment>
                <hr className={`aside-horizotal-break ${designtype == "workedexample2" ? 'aside-horizotal-break-green' : ""}`} />
                {this.renderContainer(this.props)}
                <hr className={`aside-break-bottom ${designtype == "workedexample2" ? 'aside-break-bottom-green' : ""}`}></hr>
            </React.Fragment>
        )
    }

       /**
   * 
   * @discription - This function is renders diffrent types of border of aside
   * @param {string} designtype -string to select type of aside container
   */

    borderTop = (designtype) => {
        if (designtype == "asideSidebar01" || designtype == "asideSidebar02" || designtype == "asideSidebar03" || designtype == "asideTacticBox") {
            return (
                <div className={designtype + "BorderTop"} />
            )
        } else if (designtype == "asideSidebar04") {
            return (
                <div className={designtype}>
                    <h5 className="heading5NummerEinsSidebar04"></h5>
                </div>
            )
        } else if (designtype == "asideSidebar05") {
            return (
                <React.Fragment>
                    <div className={designtype}></div>
                    <h4 className="heading4NumeroUnoSidebar05" resource=""></h4>
                </React.Fragment>
            )


        } else if (designtype == "asideActivity") {
            return (
                <React.Fragment>
                    <div className={designtype}></div>
                    <h3 className="heading3ActivityLabel"></h3>
                </React.Fragment>
            )
        }else {
            return(
                <div className={designtype + "BorderTop"} />
            )
           
        }
    }
     /**
   * 
   * @discription - This function is renders aside container
   * @param {string} designtype -string to select type of aside container
   */

    renderAside = (designtype) => {
        
            return (
                <React.Fragment>
                    {this.borderTop(designtype)}
                    {this.renderContainer(this.props)}
                    <div className={designtype + "BorderBottom"} />
                </React.Fragment>

            )
    }
   

    /**
     * render | renders title and slate wrapper
     */
    render() {
        const { element } = this.props
        return (
            <aside className={`${element.designtype} aside-container`} tabIndex="0" onBlur={this.props.handleBlur} ref={this.asideRef} >
                {element.subtype == "workedexample" ? this.renderWorkExample(element.designtype) : this.renderAside(element.designtype)}
            </aside>
        );
    }
}

ElementAsideContainer.propTypes = {
    /** slate data attached to store and contains complete slate object */
    element: PropTypes.object.isRequired
}

export default ElementAsideContainer;