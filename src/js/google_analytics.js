import TagManager from 'react-gtm-module'

let isGtmInitialized = false

/**
  * @function initializeGTM
  * @description initialise GTM in project
  */
export const initializeGTM = (env) => {
  //const auth = env.GOOGLE_TAG_MANAGER_AUTH
  //const preview = env.GOOGLE_TAG_MANAGER_PREVIEW
  //env.GTM_ID ='G-BEFDGNXZHS' // new
  //env.GTM_ID ='GTM-NFMDD8B' // old
  const GTM_ID = env.GTM_ID || 'GTM-NFMDD8B'
  console.log(GTM_ID, "inside GTM",env)
  
//   if (auth && preview) {
//     const tagManagerArgs = {
//       gtmId: GTM_ID,
//       auth,
//       preview
//     }
    if(GTM_ID){
        const tagManagerArgs = {
                gtmId: GTM_ID,
        }
        TagManager.initialize(tagManagerArgs)
        isGtmInitialized = true
    }
    
  //}
}



export const sendToDataLayer = (event, data) => {
    if (isGtmInitialized && window && window.dataLayer) {
        window.dataLayer.push({
            event,
        ...data
        });
    }
}
