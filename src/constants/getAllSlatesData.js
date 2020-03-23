import { sendDataToIframe } from './utility'

export const fetchAllSlatesData = () => {
    sendDataToIframe({ 'type': 'fetchAllSlatesData', 'message': {} });
}

export const getAllSlateData = (allSlateData) => dispatch=>{
    dispatch(prepareAllSlateData(allSlateData))
}

export const prepareAllSlateData = (allSlatesData) => dispatch => {
    let parentData = allSlatesData['parentData'].bodymatter ,
    childrenData =  allSlatesData['childrenData'] ;
    let allSlateData = []
    if (parentData) {
        parentData.forEach((container) => {
            for (let key in childrenData) {
                if (key == container.entityUrn) {
                    allSlateData.push({
                        entityUrn: container.entityUrn,
                        containerUrn: container.containerUrn,
                        type: container.label,
                        title: container.unformattedTitle && container.unformattedTitle.en ? container.unformattedTitle.en : "",
                        contents: prepareContents(childrenData[key])
                    })
                }

            }
        })
    }
    if(allSlateData !=[]){
        allSlateData.forEach((container)=>{
            for(let key in childrenData) {                
                if(container && container.contents){
                    container.contents.forEach((data)=>{
                        if(key == data.entityUrn){
                            data['contents']=  prepareContents(childrenData[key])                           
                        }
                    })
                }
            }
        })
    }
    dispatch({
        type: 'GET_ALL_SLATE_DATA',
        payload: { allSlateData: allSlateData }
    })
}

export const prepareContents = (data) => {
    let contents = [];

    data && data.frontmatter && data.frontmatter.forEach((item) => {
        contents.push({
            entityUrn: item.entityUrn,
            containerUrn: item.containerUrn,
            type: item.label,
            title: item.unformattedTitle && item.unformattedTitle.en ? item.unformattedTitle.en : "",
            contents:[]
        })
    })
    data && data.bodymatter && data.bodymatter.forEach((item) => {
        contents.push({
            entityUrn: item.entityUrn,
            containerUrn: item.containerUrn,
            type: item.label,
            title: item.unformattedTitle && item.unformattedTitle.en ? item.unformattedTitle.en : "",
            contents:[]
        })
    })
    data && data.backmatter && data.backmatter.forEach((item) => {
        contents.push({
            entityUrn: item.entityUrn,
            containerUrn: item.containerUrn,
            type: item.label,
            title: item.unformattedTitle && item.unformattedTitle.en ? item.unformattedTitle.en : "",            
            contents:[]
        })
    })
       return contents
}