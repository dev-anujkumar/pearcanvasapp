import config from "../../config/config"
import axios from 'axios'
import { reloadSlate } from "../ElementContainer/AssessmentEventHandling"
import { COMPLETED,FAILED,ABORTED, SET_JOINED_PDF_STATUS } from "../../constants/Action_Constants"

let pool
const poolFunc = (wUrn) => {
  pool = setInterval(async () => {
    const conversionStatus = await pdfConversionStatus()
    if (conversionStatus === undefined || conversionStatus?.data?.status === COMPLETED ||
      conversionStatus?.data?.status === ABORTED||conversionStatus?.status === 404 || conversionStatus?.data?.status === FAILED) {
      clearPool()
      if (conversionStatus?.data?.status === COMPLETED) {
        reloadSlate()
      }
    }
  }, 2000)
}
const clearPool = () => {
  clearInterval(pool)
}

const startPdfConversion = async (wUrn) => {
  try {
    let url = `${config.REACT_APP_API_URL}v1/enable-cypress-plus/${config.projectUrn}/cypress-plus/enable?workUrn=${wUrn}&slateUrn=${config.slateManifestURN}`
    return await axios.post(url, {},
      {
        headers: {
          "Content-Type": "application/json",
          'myCloudProxySession': config.myCloudProxySession
        }
      }
    )
  }
  catch (error) {
    console.error(error)
  }
}

const pdfConversionStatus = async () => {
  try {
    const res = await axios.get(`${config.REACT_APP_API_URL}v1/cypress-plus-api/conversion-status/project/
                ${config.projectUrn}/manifest/${config.slateManifestURN}/entity/${config.slateEntityURN}`, {
      headers: {
        "Content-Type": "application/json",
        'myCloudProxySession': config.myCloudProxySession
      }
    }, { validateStatus: false })
    return res
  } catch (error) {
    console.error('pdfConversionStaus error', error)
  }
}
/**
 * Set status if current pdf slate is merged or not
 * @param {*} flag 
 * @returns 
 */
export const getJoinedPdfStatus = (flag) => (dispatch) => {
  dispatch({
      type: SET_JOINED_PDF_STATUS,
      payload: flag
  });
}

export { startPdfConversion, pdfConversionStatus, poolFunc, clearPool }