import TagManager from 'react-gtm-module'

let isGtmInitialized = false

/**
  * @function initializeGTM
  * @description initialise GTM in project
  */
export const initializeGTM = (env) => {
  const auth = env.GOOGLE_TAG_MANAGER_AUTH || 'uMmKRWMnVp0n5ln33vV-MA'
  const preview = env.GOOGLE_TAG_MANAGER_PREVIEW || 'env-21'
  // env.GTM_ID ='GTM-N6W3WRM' // new
  // env.GTM_ID ='GTM-NFMDD8B' // old
  const GTM_ID = env.GTM_ID || 'GTM-N6W3WRM'
  console.log(GTM_ID, "inside GTM",env)
  if (auth && preview) {
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
    console.log(isGtmInitialized,"isGtmInitialized",window.dataLayer)
    if (isGtmInitialized && window && window.dataLayer) {
        console.log(event,"Push data event",data)
        window.dataLayer.push({
            event,
        ...data
        });
    }
}
