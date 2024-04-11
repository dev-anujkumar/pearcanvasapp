import React, { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import mammoth from "mammoth";
import { pastePostProcess } from "../PowerPasteElement/PowerPasteElement.jsx";
import './PreviewWordfile.css';
/***
 * PreviewWordFile is used to display the preview of the imported word file using tinymce
 */
const PreviewWordFile = (props) => {

    const editorRefOrig = useRef(null);
    const editorRefConverted = useRef(null);
    const [backdropOrig, setBackdropOrig] = useState(false);
    const [backdropConv, setBackdropConv] = useState(false);
    const editorConfig = {
        selector: "#myTextarea",
        height: 400,
        plugins: [
          'advlist lists',
         'powerpaste'
        ],
        toolbar: false,
        menubar: false,
        branding: false,
        statusbar:false,
        powerpaste_allow_local_images: true,
        powerpaste_word_import: 'clean',
        powerpaste_html_import: 'clean',
        smart_paste: false,
        setup: (editor) => {
            editor?.on('init', ()=>{
                if(props?.fileToBeUploaded){
                    setBackdropOrig(true);
                    const options = {
                        convertImage: mammoth?.images?.imgElement((image) => {
                            return image?.read('base64').then((imageBuffer) => {
                                return {
                                    src: 'data:' + image?.contentType + ';base64,' + imageBuffer,
                                    style: 'max-width: 100%',
                                };
                            });
                        }),
                        styleMap: [
                            "p[style-name='Section Title'] => h1:fresh",
                            "p[style-name='Subsection Title'] => h2:fresh",
                            "u => u",
                        ]
                    };
                    mammoth?.convertToHtml({arrayBuffer: props?.fileToBeUploaded}, options)
                    .then((result) => {
                        const html = result?.value; // The generated HTML
                        editor?.setContent(html);
                        readonlyPreviewView(editor)
                        if(editor?.getBody()) setBackdropOrig(false)
                    })
                    .catch(function(error) {
                        console.error(error);
                        props?.togglePopup(false);
                    });            
                }
            })
        },
        readonly: 1,
    }

    const editorConfig2 = {
        selector: "#myTextarea2",
        height: 400,
        plugins: [
            'advlist lists',
            'powerpaste'
        ],
        toolbar: false,
        menubar: false,
        branding: false,
        statusbar:false,
        powerpaste_allow_local_images: true,
        powerpaste_word_import: 'clean',
        powerpaste_html_import: 'clean',
        smart_paste: false,
        setup: (editor) => {
            editor?.on('init', ()=>{
                if(props?.fileToBeUploaded){
                    setBackdropConv(true);
                    const options = {
                        styleMap: [
                            "p[style-name='Section Title'] => h1:fresh",
                            "p[style-name='Subsection Title'] => h2:fresh",
                            "u => u",
                        ]
                    };
                    mammoth?.convertToHtml({arrayBuffer: props?.fileToBeUploaded}, options)
                    .then((result) => {
                        const html = result?.value; // The generated HTML
                        const parser = new DOMParser();
                        const doc = parser?.parseFromString(html, "text/html")
                        editor?.setContent(html);
                        pastePostProcess(doc,props, 'importWord');
                        readonlyPreviewView(editor)
                        if(editor?.getBody()){
                        setBackdropConv(false);
                        props?.enableImportButton()
                        }
                    })
                    .catch(function(error) {
                        console.error(error);
                        props?.togglePopup(false);
                    });
                }
            })
        },
        readonly: 1,
    }

    const readonlyPreviewView = (editor) => {
        if(editor && editor?.getBody()?.style) editor.getBody().style.pointerEvents = "none";
        editor?.getBody()?.setAttribute('contenteditable', false);
    }

    useEffect(() => {
        tinymce.init(editorConfig)
        tinymce.init(editorConfig2)
        return () => {
        tinymce?.get('myTextarea2')?.destroy?.()
        tinymce?.get('myTextarea')?.destroy?.()
        }
    }, [])

    return(
        <div className={`${props?.isBannerVisible ? 'word-file-import-banner' : 'word-file-import'}`}>
            <div className="sub-heading-container">
                <div className="original-text">Original - {props?.fileToBeUploaded?.name}</div>
                <div className="converted-text">Converted-Preview</div>
            </div>
            <div className="preview-editor-container">
                <div className="original-file-preview">
                    {backdropOrig && <CircularProgress sx={{position: 'absolute', zIndex: '999', top: '48%', left: '46%'}}/>}
                    <p ref={editorRefOrig} id='myTextarea' style={{width: '100%'}} > </p>
                </div>
                <div className='converted-file-preview'>
                    {backdropConv && <CircularProgress sx={{position: 'absolute', top: '49%', left: '48%', zIndex: '999'}}/>}
                    <p ref={editorRefConverted} id='myTextarea2' style={{width: '100%'}} ></p>
                </div>
            </div>
        </div>
    )
}

export default PreviewWordFile;