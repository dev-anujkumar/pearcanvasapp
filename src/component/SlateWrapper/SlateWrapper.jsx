// IMPORT - Plugins //
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//IMPORT TINYMCE 
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.css";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import { EditorConfig } from '../../config/EditorConfig'
// IMPORT - Components //
import SlateHeader from '../CanvasSlateHeader';
import ElementContainer from '../ElementContainer';
import { LargeLoader, SmalllLoader } from './ContentLoader.jsx';
import { SlateFooter } from './SlateFooter.jsx';
import ElementSaprator from '../ElementSaprator';

// IMPORT - Assets //
import '../../styles/SlateWrapper/style.css';

class SlateWrapper extends Component {
    constructor(props) {
        super(props);
        this.editorConfig = {
            plugins: EditorConfig.plugins,
            selector: '.element-list',
            formats: EditorConfig.formats,
            menubar: false,
            statusbar: false,
            inline: true,
            object_resizing : false,
            fixed_toolbar_container: '#tinymceToolbar',
            content_style: EditorConfig.contentStyle,
            toolbar: EditorConfig.toolbar,
            image_advtab: false,
            setup: (editor) => {
                this.onEditorBlur(editor);
                this.onEditorEnterKeyPress(editor);
                this.onEditorClick(editor);
                this.onEditorFocus(editor);               
                editor.on('keyup', (e) => {
                    let cell = editor.dom.getParent(editor.selection.getStart(), ".cypress-editable");
                    if (!cell) {
                      e.stopImmediatePropagation();
                      e.stopPropagation();
                      e.preventDefault();
                      return false;
                    }
                   // editor.dom.$(e.target).closest('body').children('p').css('display', 'none');
                  })
                  editor.on('keydown', (e) => {
                    let cell = editor.dom.getParent(editor.selection.getStart(), ".cypress-editable");
                    if (!cell) {
                      e.stopImmediatePropagation();
                      e.stopPropagation();
                      e.preventDefault();
                      return false;
                    }
                  })
                 
                  editor.on("click", (e)=>{
                    if(e.target.tagName=='dfn'){
                        //launch footnote/glossary
                    }
                   
                    let cell = editor.dom.getParent(editor.selection.getStart(), ".cypress-editable");
                    console.log('click',cell)                    
                    if (!cell) {
                        editor.dom.$('#editor-toolbar').find('.tox-toolbar').addClass('toolbar-disabled')
                      e.stopImmediatePropagation();
                      e.stopPropagation();
                      e.preventDefault();                    
                      return false;
                    }
                    else{
                        editor.dom.$('#editor-toolbar').find('.tox-toolbar').removeClass('toolbar-disabled')
                    }
                  })
            },
            init_instance_callback: (editor) => {
                 editor.fire('focus');                 
                editor.dom.$('.element-list').attr('contenteditable', 'false'); 
                editor.on("focus", (e)=>{                    
                    let cell = editor.dom.getParent(editor.selection.getStart(), ".cypress-editable");
                    console.log('focus',cell)  
                    if (!cell) {
                      e.stopImmediatePropagation();
                      e.stopPropagation();
                      e.preventDefault();
                      return false;
                    }
                  })
              }
        }
    }

    onEditorBlur = (editor) => {
        if(editor){
         editor.on('blur', function (e) {
            // e.stopImmediatePropagation();
            // e.preventDefault();
         });
        }
     
     };
 
     onEditorEnterKeyPress = (editor) => {
         console.log("onEditorEnterKeyPress >> ")
     };
 
     onEditorClick = (editor) => {
         console.log("onEditorClick >> ")
     };
 
     onEditorFocus = (editor) => {
         console.log("onEditorFocus >> ")
     };
 
     handleEditorChange = (e) => {
        //  let type = this.props.type
        //  if(e){
        //   e.target.formatter.apply(type);
        //  console.log('Content was updated:', e.target.getContent());
        //  }
         
        
     }

     componentDidMount(){       
        tinymce.init(this.editorConfig)
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
                        <SlateHeader slateType={_slateType} slateTitle={_slateTitle} />
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
            console.error(error);
        }
    }

    /**
     * renderSlate | renders slate editor area with all elements it contain
     */
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
            console.error(error);
        }
    }

    /**
     * renderElement | renders single element according to its type
     */
    renderElement(_elements) {
        try {
            if (_elements !== null && _elements !== undefined) {
                return _elements.map((element) => {
                    return (
                        <React.Fragment>
                            <ElementContainer
                                element={element}
                                key={element.id}
                            />
                            <ElementSaprator
                                key={`elem-separtor-${element.id}`}
                                typeHandler={
                                    [
                                        'text-elem',
                                        'image-elem',
                                        'audio-elem'
                                    ]
                                }
                                clickHandler={
                                    [this.testConsole, this.testConsole, this.testConsole]
                                } />
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

    testConsole = () => {
        console.log('clicked')
    }
}

SlateWrapper.propTypes = {
    /** slate data attached to store and contains complete slate object */
    slateData: PropTypes.object.isRequired
}

export default SlateWrapper;