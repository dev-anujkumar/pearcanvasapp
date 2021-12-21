import config from "../../config/config"
import axios from 'axios'
import { reloadSlate } from "../ElementContainer/AssessmentEventHandling"
import { COMPLETED,FAILED } from "../../constants/Action_Constants"

let pool
const poolFunc = (wUrn) => {
  pool = setInterval(async () => {
    const conversionStatus = await pdfConversionStatus(wUrn)
    if (conversionStatus === undefined || conversionStatus?.data?.status === COMPLETED || conversionStatus?.status === 404 || conversionStatus?.data?.status === FAILED) {
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

const startPdfConversion = (wUrn) => {
  try {
    let url = `${config.REACT_APP_API_URL}v1/enable-cypress-plus/${config.projectUrn}/cypress-plus/enable?workUrn=${wUrn}&slateUrn=${config.slateManifestURN}`
    return axios.post(url, {},
      {
        headers: {
          "Content-Type": "application/json",
          PearsonSSOSession: config.ssoToken
        }
      }
    )
  }
  catch (error) {
    console.error(error)
  }
}

const pdfConversionStatus = async (wUrn) => {
  try {
    const res = await axios.get(`${config.REACT_APP_API_URL}v1/cypress-plus-api/conversion-status/${wUrn}`, {
      headers: {
        "Content-Type": "application/json",
        PearsonSSOSession: config.ssoToken
      }
    }, { validateStatus: false })
    return res
  } catch (error) {
    console.error('pdfConversionStaus error', error)
  }
}
export { startPdfConversion, pdfConversionStatus, poolFunc, clearPool }