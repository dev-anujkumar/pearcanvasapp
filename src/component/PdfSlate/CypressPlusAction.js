import config from "../../config/config"
import axios from 'axios' 

  const startPdfConversion = (wUrn) => {
    try{
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
   catch(error){
  console.log(error)
}
}
export {startPdfConversion}