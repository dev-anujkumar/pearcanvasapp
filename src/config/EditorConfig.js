import { CONTENT_STYLE } from './TinymceDefaultCss';
import 'tinymce/plugins/charmap';
export const EditorConfig = {
    
    formats: {
        // Changes the default format for h1 to have a class of heading
        'paragraph': { block: 'p', classes: 'paragraphNumeroUno' },
        'heading-1': { block: 'h1', classes: 'heading1NummerEins' },
        'heading-2': { block: 'h2', classes: 'heading2NummerEins' },
        'heading-3': { block: 'h3', classes: 'heading3NummerEins' },
        'heading-4': { block: 'h4', classes: 'heading4NummerEins' },
        'heading-5': { block: 'h5', classes: 'heading5NummerEins' },
        'heading-6': { block: 'h6', classes: 'heading6NummerEins' },
        'marginalia': { block: 'blockquote', classes: 'blockquoteMarginalia', wrapper: true},
        'pullquote': { block: 'h3', classes: 'pullQuoteNumeroUno' },
        'marginalia-attribution': { block: 'blockquote', classes: 'blockquoteMarginaliaAttr', wrapper: true },
        'LO': { block: 'h2', classes: 'heading2learningObjectiveItem' },
        'strikethrough' : {inline : 's', exact : true},
        'underline' : {inline : 'u', exact : true},
        custom_code: {title: 'inline code', inline: 'code'},
        removeformat: [
            { selector: 'abbr,dfn,a,strong,em,s,u,sub,sup,code', remove: 'all',split: true, expand: false, deep: true },
            { selector: 'span', remove: 'empty', split: false }
          ]
    },
    toolbar: 'undo redo | formatSelector | bold italic underline strikethrough removeformat subscript superscript charmap | crossLinkingIcon Glossary Footnote tinyMcewirisformulaEditor tinyMcewirisformulaEditorChemistry code | customListButton customUoListButton indent outdent | slateTag ',
    contentStyle: CONTENT_STYLE,
    plugins: "lists advlist placeholder charmap paste tiny_mce_wiris"
}

export const GlossaryFootnoteEditorConfig = {
    formats: {
        'paragraph': { block: 'p', classes: 'paragraphNumeroUno' },
        'strikethrough' : {inline : 's', exact : true},
        'underline' : {inline : 'u', exact : true},
        removeformat: [
            { selector: 'abbr,dfn,a,strong,em,s,u,sub,sup,code,span', remove: 'all',split: true, expand: false }
          ]
    },
    toolbar: 'bold italic underline strikethrough removeformat subscript superscript tinyMcewirisformulaEditor tinyMcewirisformulaEditorChemistry code'
}

export const FormatSelectors = function(callback){

   return  [
        {
            type: 'menuitem',
            text: 'Paragraph',
            value: 'P',
            onAction : function(){callback('P')}
        },
        {
            type: 'menuitem',
            text: 'Heading 1',
            value: "H1",
            onAction : function(){callback('H1')}
        },
        {
            type: 'menuitem',
            text: 'Heading 2',
            value: "H2",
            onAction : function(){callback('H2')}
        },
        {
            type: 'menuitem',
            text: 'Heading 3',
            value: "H3",
            onAction : function(){callback('H3')}
        },
        {
            type: 'menuitem',
            text: 'Heading 4',
            value: "H4",
            onAction : function(){callback('H4')}
        },
        {
            type: 'menuitem',
            text: 'Heading 5',
            value: "H5",
            onAction : function(){callback('H5')}
        },
        {
            type: 'menuitem',
            text: 'Heading 6',
            value: "H6",
            onAction : function(){callback('H6')}
        },
        {
            type: 'menuitem',
            text: 'Blockquote',
            value: "BQ",
            onAction : function(){callback('BQ')}
        },
        {
            type: 'menuitem',
            text: 'Pullquote',
            value: "PQ",
            onAction : function(){callback('PQ')}
        },
        {
            type: 'menuitem',
            text: 'Learning Objective Item',
            value: "LO",
            onAction : function(){callback('LO')}
        }
    ]
}

export const elementTypeOptions = Object.freeze({
    'P' : {
        primaryOption : 'primary-paragraph',
        secondaryOption : 'secondary-paragraph',
        label : 'P',
    },
    'H1' : {
        primaryOption : 'primary-heading',
        secondaryOption : 'secondary-heading-1',
        label : 'P',
    },
    'H2' : {
        primaryOption : 'primary-heading',
        secondaryOption : 'secondary-heading-2',
        label : 'P',
    },
    'H3' : {
        primaryOption : 'primary-heading',
        secondaryOption : 'secondary-heading-3',
        label : 'P',
    },
    'H4' : {
        primaryOption : 'primary-heading',
        secondaryOption : 'secondary-heading-4',
        label : 'P',
    },
    'H5' : {
        primaryOption : 'primary-heading',
        secondaryOption : 'secondary-heading-5',
        label : 'P',
    },
    'H6' : {
        primaryOption : 'primary-heading',
        secondaryOption : 'secondary-heading-6',
        label : 'P',
    },
    'PQ' : {
        primaryOption : 'primary-blockquote',
        secondaryOption : 'secondary-pullquote',
        label : 'P',
    },
    'BQ' : {
        primaryOption : 'primary-blockquote',
        secondaryOption : 'secondary-marginalia-attribution',
        label : 'P',
    },
    'LO' : {
        primaryOption : 'primary-learning-objective',
        secondaryOption : 'secondary-learning-objective',
        label : 'P',
    },
})

