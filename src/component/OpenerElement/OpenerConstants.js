export const labelOptions = ["No Label", "Chapter", "Ch", "Part", "Unit"]

/**
 * Extracts and returns title, number and label from titleText to populate opener element.
 * @param {*} textSemantics Info of position of title, number and label
 * @param {*} type type of data to be extracted
 * @param {*} titleText raw data
 */
export const getOpenerContent = (textSemantics, type, titleText) => {
    let contentData = textSemantics.filter(data => data.type === type)[0]
    let contentNumberData = textSemantics.filter(data => data.type === "number")[0]
    let dataToReturn = ""
    switch(type){
        case "label":
            if(contentData){
                dataToReturn = titleText.substring(contentData.charStart, contentData.charEnd)
            }
            else{
                dataToReturn = "Chapter"
            }
            break;

        case "number":
            if(contentData){
                dataToReturn = titleText.substring(contentData.charStart, contentData.charEnd - 1)
            }
            break;

        case "title":
        default:
            if(contentNumberData){
                dataToReturn = titleText.substring(contentNumberData.charEnd).trimLeft()
            }
            break;      
    }
    return dataToReturn
}

/**
 * Returns background image data
 * @param {*} path image source url
 */
export const getOpenerImageSource = (path) => {
    if(path && path == "")
        return null
    else
        return path
}
