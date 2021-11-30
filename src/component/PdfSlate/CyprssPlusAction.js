import { fetch,post } from "./CypressPlusApiUtills"
 import config from "../../config/config"
 import axios from 'axios'
// const pdfConversionStatus = async () => {
//     try {
//       const res = await fetch('http://10.11.1.242:8085/cypress-plus-api/conversion-status/urn:pearson:work:51ddabb8-2485-4e26-b5b1-52c263fd0a74', { validateStatus: false })
//       return res
//     } catch (error) {
//       console.log('pdfConversionStaus error', error)
//     }
//   }
  
  const startPdfConversion = (wUrn) => {
    let url = `${config.REACT_APP_API_URL}v1/enable-cypress-plus/urn:pearson:distributable:cab11a3e-4ba1-4af7-9953-c12d12c7dd74/cypress-plus/enable?workUrn=${wUrn}&slateUrn=urn:pearson:manifest:7c8f4d66-db5b-41e6-a1f3-e174b92998b4`
    return axios.post(url, {},
        {
            headers: {
                "Content-Type": "application/json",
                PearsonSSOSession: config.ssoToken
            }
        }
    )
  }

  export {startPdfConversion}