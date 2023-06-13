import TagManager from 'react-gtm-module'

let isGtmInitialized = false

/**
  * @function initializeGTM
  * @description initialise GTM in project
  */
export const initializeGTM = (env) => {
  const auth = env.GOOGLE_TAG_MANAGER_AUTH || 'uMmKRWMnVp0n5ln33vV-MA'
  const preview = env.GOOGLE_TAG_MANAGER_PREVIEW || 'env-21'
  //const preview = ""
  // env.GTM_ID ='GTM-NFMDD8B' // old
  const GTM_ID = env.GTM_ID || 'GTM-N6W3WRM'
  if (auth) {
    const tagManagerArgs = {
      gtmId: GTM_ID,
      auth,
      preview
    }

    TagManager.initialize(tagManagerArgs)
    isGtmInitialized = true
  }
}



export const triggerCustomEventsGTM = (event, data) => {
    if (isGtmInitialized && window && window.dataLayer) {
        window.dataLayer.push({
            event,
        ...data
        });
    }
}
