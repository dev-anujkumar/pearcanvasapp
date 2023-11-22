//Helper Functions for ApiResults.jsx
export const formatString = (value) => {
    return String(value).replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/ /g, ' ')
}

export const checkIfIncludes = (searchItem, ValueToBeSearch) => {
    return searchItem.toUpperCase().includes(ValueToBeSearch.toUpperCase())
}

export const getTitle = (value) => {
    let title = value?.title ? value.title : value?.unformattedTitle?.en ? value.unformattedTitle.en : "";
    return formatString(title)
}

export const getCaption = (value) => {
    let caption = value?.captions?.text ? value.captions.text : "";
    return formatString(caption)
}
