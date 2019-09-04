import { CONTENT_STYLE } from './TinymceDefaultCss'
export const EditorConfig = {
    formats: {
        // Changes the default format for h1 to have a class of heading
        "element-authoredtext": { block: 'p', classes: 'paragraphNumeroUno' },
        p: { block: 'p', classes: 'paragraphNumeroUno' },
        h1: { block: 'h1', classes: 'heading1NummerEins' },
        h2: { block: 'h2', classes: 'heading2NummerEins' },
        h3: { block: 'h3', classes: 'heading3NummerEins' },
        h4: { block: 'h4', classes: 'heading4NummerEins' },
        h5: { block: 'h5', classes: 'heading5NummerEins' },
        h6: { block: 'h6', classes: 'heading6NummerEins' },
        'BQ': { block: 'blockquote', classes: 'blockquoteMarginalia', wrapper: true},
        'PQ': { block: 'h3', classes: 'pullQuoteNumeroUno' },
        'MA': { block: 'blockquote', classes: 'blockquoteMarginaliaAttr', wrapper: true },
        'LO': { block: 'h2', classes: 'heading2learningObjectiveItem' }
    },
    toolbar: 'undo redo| bold italic underline strikethrough removeformat| alignleft aligncenter alignright alignjustify outdent indent numlist bullist | superscript subscript jsplus_special_symbols ',
    contentStyle: CONTENT_STYLE,
    plugins: "lists advlist placeholder"
}