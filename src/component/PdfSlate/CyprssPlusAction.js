import { fetch,post } from "./CypressPlusApiUtills"
import config from "../../config/config"
const pdfConversionStatus = async () => {
    try {
      const res = await fetch('http://10.11.1.242:8085/cypress-plus-api/conversion-status/urn:pearson:work:51ddabb8-2485-4e26-b5b1-52c263fd0a74', { validateStatus: false })
      return res
    } catch (error) {
      console.log('pdfConversionStaus error', error)
    }
  }
  
  const startPdfConversion = () => {
    try {
      return post('http://10.11.1.242:9091/cypress-plus-api/convert-pdf',{workUrn:'urn:pearson:work:51ddabb8-2485-4e26-b5b1-52c263fd0a74',projectUrn:'urn:pearson:distributable:cab11a3e-4ba1-4af7-9953-c12d12c7dd74'})
    } catch (error) {
      console.log('startPdfConversion error', error)
    }
  }

  export { pdfConversionStatus, startPdfConversion}