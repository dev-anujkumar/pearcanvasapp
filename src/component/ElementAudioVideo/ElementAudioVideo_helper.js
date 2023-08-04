import axios from "axios";
import config from "../../config/config";

/*** 
 *@description - This is the function to get the asset metadata 
 *@param assetID - This is the asset ID for which metadata is fetched
*/
export const getAssetMetadata = async (assetID) => {
  let url = `${config.ALFRESCO_EDIT_METADATA}alfresco-proxy/api/-default-/public/alfresco/versions/1/nodes/` + assetID;
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      apikey: config.CMDS_APIKEY,
      myCloudProxySession: config.myCloudProxySession,
    },
  });
  const { properties } = response?.data?.entry || {};
  return properties;
};
