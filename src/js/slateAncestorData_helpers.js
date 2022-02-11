/**
 * This functions sets the current slate ancestor data
 * @param {*} apiData 
 * @param {*} slateEntityUrn 
 * @returns SlatesList
 */
import { GET_SLATE_LIST_IN_CONTAINER } from '../constants/Action_Constants';
export const getCurrentSlatesList = async (allSlateData, slateMatterType, currentParentUrn,dispatch) => {
    const currentMatterData = allSlateData[slateMatterType]
    const slatesList = await fetchCurrentContainerSlateList(currentMatterData, currentParentUrn.toLowerCase())
    dispatch({
        type: GET_SLATE_LIST_IN_CONTAINER,
        payload: slatesList
    })
}

const fetchCurrentContainerSlateList = (currentMatterData, currentParentUrn, slatesList = []) => {
    switch (currentParentUrn) {
        case 'frontmatter':
        case 'backmatter':
            slatesList = getSlatesinFMandBM(currentMatterData, slatesList)
            break;
        default:
            slatesList = getSlatesinBodymatter(currentMatterData, currentParentUrn, slatesList)
            break;
    }
    return slatesList
}


const getSlatesinBodymatter = (currentMatterData, currentParentUrn, slatesList) => {
    if (currentMatterData?.length > 0) {
        const isParentatLevel1 = currentMatterData.findIndex(item => item.entityUrn === currentParentUrn)
        if (isParentatLevel1 > -1) { //part IS, chapter
            const currentContainerData = currentMatterData[isParentatLevel1]?.contents || []
            slatesList = getSlatesinFMandBM(currentContainerData, slatesList)
        }
        else {
            currentMatterData.forEach(container => {
                if (container.label == 'part' && container.contents?.length > 0) {
                    const isParentatLevel2 = container.contents.findIndex(item2 => item2.entityUrn === currentParentUrn)
                    if (isParentatLevel2 > -1) {  //chapter in part 
                        const currentContainerData2 = container.contents[isParentatLevel2]?.contents || []
                        if (container.contents[isParentatLevel2]?.label == 'part' && currentContainerData2?.length > 0) {
                            slatesList = getSlatesinFMandBM([currentContainerData2[0]], slatesList)
                        } else {
                            slatesList = getSlatesinFMandBM(currentContainerData2, slatesList)
                        }
                    }
                } else if (container.label == 'volume' && container?.contents?.length > 0) {
                    const isParentatLevel3 = container.contents.findIndex(item3 => item3.entityUrn === currentParentUrn)
                    if (isParentatLevel3 > -1) { //part IS in volume, chapter
                        const currentContainerData3 = container.contents[isParentatLevel3]?.contents || []
                        if (container.contents[isParentatLevel3]?.label == 'part' && currentContainerData3?.length > 0) {
                            slatesList = getSlatesinFMandBM([currentContainerData3[0]], slatesList)
                        } else {
                            slatesList = getSlatesinFMandBM(currentContainerData3, slatesList)
                        }

                    }
                    else {
                        container?.contents?.forEach(item2 => {
                            if (item2?.label == 'part' && item2?.contents?.length > 0) { //chapter in part in volume
                                const isParentatLevel4 = item2.contents.findIndex(item4 => item4.entityUrn === currentParentUrn)
                                if (isParentatLevel4 > -1) { //part IS in volume, chapter
                                    const currentContainerData4 = item2?.contents[isParentatLevel4]?.contents || []
                                    slatesList = getSlatesinFMandBM(currentContainerData4, slatesList)
                                }
                            }
                        })
                    }
                }
            })

        }
    }
    return slatesList
}

const getSlatesinFMandBM = (currentMatterData, slatesList) => {
    if (currentMatterData?.length > 0) {
        currentMatterData?.forEach(container => {
            const notAllowedContainers = ['module','appendix','pdfslate','assessment-slate','chapter']
            if (notAllowedContainers.indexOf(container?.label) === -1) {
                slatesList.push(setItemDetails(container))
            }
            else if (container?.contents?.length > 0) {
                slatesList = getSlatesinFMandBM(container.contents, slatesList)
            }
        })
    }
    return slatesList
}
/**
 * @function setItemDetails
 * @description-This function is to prepare details for an item
 * @param {Object} item
 * @returns {Object}  
*/
const setItemDetails = (item) => {
    return item?.entityUrn
}