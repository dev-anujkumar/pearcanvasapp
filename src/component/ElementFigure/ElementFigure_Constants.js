/**Element Figure Image */
export const IMAGE = "image"
export const TABLE = "table"
export const MATH_IMAGE = "mathImage"
export const FIGURE_IMAGE_BUTTON_TITLE = "Select an Image"
export const GENERATE_IMAGE_BUTTON_TITLE = "Generate an Image"
export const IMAGE_ID = "Image ID: "
export const IMAGE_PATH = "Image Path: "
export const ALFRESCO_SITE_PATH = "Alfresco Site: "
export const UPDATE_FIGURE_IMAGE_BUTTON_TITLE = "Update Image"

/**Element Figure Table */
export const TABLE_AS_MARKUP = "tableasmarkup"
export const FIGURE_TABLE_TITLE = "Table"
export const FIGURE_TABLE_BUTTON_TITLE = "Add a Table"

/**Element Math ML, Block Code*/
export const MATH_ML = "authoredtext"
export const BLOCK_CODE = "codelisting"
export const BLOCK_MATH_CODE_CLASSES = {
    authoredtext: {
        divClass: "floating-math-content-group",
        placeHolder: "Math Block Content",
        tagName: "p",
        tinyMceClass: "figureMathContent "
    },
    codelisting: {
        divClass: "floating-code-content-group",
        placeHolder: "Code Block Content",
        tagName: "code",
        tinyMceClass: "figureCodeContent "
    }
}