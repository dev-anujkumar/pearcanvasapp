import React, { useEffect, useRef } from "react";
import mammoth from "mammoth";
import { pastePostProcess } from "../PowerPasteElement/PowerPasteElement.jsx";
import './PreviewWordfile.css';

const PreviewWordFile = (props) => {

    const editorRefOrig = useRef(null);
    const editorRefConverted = useRef(null);
    const editorConfig = {
        selector: "#myTextarea",
        // content_style: powerpaste_list_content_style,
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
        // auto_focus: `myTextarea`,
        paste_preprocess: (plugin, data) => pastePreProcess(data),
        setup: (editor) => {
            console.log(editor, 'edittt');
            editor.on('init', ()=>{
                if(props.fileToBeUploaded){
                    var options = {
                        styleMap: [
                            "p[style-name='Section Title'] => h1:fresh",
                            "p[style-name='Subsection Title'] => h2:fresh",
                            "u => u",
                        ]
                    };
                      mammoth.convertToHtml({arrayBuffer: props.fileToBeUploaded}, options)
                    .then((result) => {
                        // console.log(result, 'fffttt');
                        var html = result.value; // The generated HTML
                        // this.setState({docContent: html});
                        const parser = new DOMParser();
                        var doc = parser.parseFromString(html, "text/html")
                        // console.log('Testing array', doc.body.children)
                        editor.setContent(html);
                        editor.getBody().setAttribute('contenteditable', false);
                        // tinymce.get('myTextarea2').setContent(html);
                        // pastePostProcess(doc)
                    })
                    .catch(function(error) {
                        console.error(error);
                    });            
                }
            })
        }
      }

      const editorConfig2 = {
        selector: "#myTextarea2",
        // content_style: powerpaste_list_content_style,
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
        // auto_focus: `myTextarea2`,
        // paste_preprocess: (plugin, data) => pastePreProcess(data),
        paste_postprocess: (plugin, data) => pastePostProcess(data),
        setup: (editor) => {
            console.log(editor, 'edittt');
            editor.on('init', ()=>{
                // console.log(data, 'inside load');
                if(props.fileToBeUploaded){
                    var options = {
                        styleMap: [
                            "p[style-name='Section Title'] => h1:fresh",
                            "p[style-name='Subsection Title'] => h2:fresh",
                            "u => u",
                        ]
                    };
                    mammoth.convertToHtml({arrayBuffer: props.fileToBeUploaded}, options)
                    .then((result) => {
                        console.log(result, 'fffttt');
                        var html = result.value; // The generated HTML
                        // html = (html).replace(/color="/g, 'style="color:#');
                        const parser = new DOMParser();
                        var doc = parser.parseFromString(html, "text/html")
                        // console.log('Testing array', doc.body.children)
                        editor.setContent(html);
                        editor.getBody().setAttribute('contenteditable', false);
                        // tinymce.get('myTextarea2').setContent(html);
                        pastePostProcess(doc,props, 'importWord');
                    })
                }
            })
        }
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
        <div className="word-file-import" style={{display: 'flex', columnGap: '40px'}}>
            <div style={{width: '50%'}}>
                <div className="original-text">Original - {props?.fileToBeUploaded?.name}</div>
                <p ref={editorRefOrig} id='myTextarea' style={{width: '100%'}} > </p>
            </div>
            <div style={{width: '50%'}}>
                <div className="converted-text">Converted-Preview</div>
                <p ref={editorRefConverted} id='myTextarea2' style={{width: '100%'}} ></p>
            </div>
        </div>
    )
}

export default PreviewWordFile;