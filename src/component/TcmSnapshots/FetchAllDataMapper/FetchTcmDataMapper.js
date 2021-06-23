import { partition, orderBy } from 'lodash';
import TCMUtils from '../../../js/tcmUtils.js';
import PendingTransactionsDataMapper from './PendingTransactionsDataMapper';
import LatestTransactionsDataMapper from './LatestTransactionsDataMapper';
import AcceptedTransactionsDataMapper from './AcceptedTransactionsDataMapper';
import ComplexContainerDataMapper from './ComplexContainerDataMapper';
import OrderElementsData from './OrderElementsDataMapper';

/**
 * Service Mapper is responsible for converting the API structure to Application structure
 * returns  data
 */
const FetchAllDataMapper = {
  getPendingTranscations(data, result) {
    return PendingTransactionsDataMapper.getPendingTranscations(data, result);
  },

  getAcceptedTranscations(data, result) {
    return AcceptedTransactionsDataMapper.getAcceptedTranscations(data, result);
  },

  // eslint-disable-next-line max-lines-per-function
  getLatestTransactions(data, pResult) {
    return LatestTransactionsDataMapper.getLatestTransactions(data, pResult);
  },

  complexContainerElements(complexElementsArray, eURN, indexOfElements) {
    return ComplexContainerDataMapper.complexContainerElements(complexElementsArray, eURN, indexOfElements);
  },

  processResponse(response, eURN, indexOfElements) {

    response = TCMUtils.apiCleanUp(response);

    let processedResponse = [];
    let processedComplexResponse = [];
    let footnoteData = [];
    let glossaryData = [];
    let assetpopoverData = [];
    if (response) {
      const complexElementsPartition = partition(response, element => element.elemURN.split('+').length > 1);
      if (complexElementsPartition.length > 1) {
        processedComplexResponse = this.complexContainerElements(complexElementsPartition[0], eURN, indexOfElements);
        processedComplexResponse.forEach((responseData) => {//---1
            if (Array.isArray(responseData)) {
              responseData && responseData.length > 0 && responseData.forEach((dataLevel1)=>{//---2
                if(Array.isArray(dataLevel1)){
                  dataLevel1 && dataLevel1.length > 0 && dataLevel1.forEach((dataLevel2)=>{//---3
                    if(Array.isArray(dataLevel2)){
                      dataLevel2 && dataLevel2.length > 0 && dataLevel2.forEach((dataLevel3)=>{//---4
                        if(Array.isArray(dataLevel3)){
                          dataLevel3 && dataLevel3.length > 0 && dataLevel3.forEach((dataLevel4)=>{//---5
                            footnoteData = [...footnoteData, ...dataLevel4.footnoteSnapshot];
                            glossaryData = [...glossaryData, ...dataLevel4.glossorySnapshot];
                            let assetData = dataLevel4.assetPopOverSnapshot && dataLevel4.assetPopOverSnapshot.length ? JSON.parse(dataLevel4.assetPopOverSnapshot) : [];
                            assetpopoverData = [...assetpopoverData, ...assetData];               
                          });
                        }else{
                          footnoteData = [...footnoteData, ...dataLevel3.footnoteSnapshot];
                          glossaryData = [...glossaryData, ...dataLevel3.glossorySnapshot];
                          let assetData = dataLevel3.assetPopOverSnapshot && dataLevel3.assetPopOverSnapshot.length ? JSON.parse(dataLevel3.assetPopOverSnapshot) : [];
                          assetpopoverData = [...assetpopoverData, ...assetData];
                        }
                      });
                    }
                    else{
                      // dataLevel2.forEach((data2) => {
                        footnoteData = [...footnoteData, ...dataLevel2.footnoteSnapshot];
                        glossaryData = [...glossaryData, ...dataLevel2.glossorySnapshot];
                        let assetData = dataLevel2.assetPopOverSnapshot && dataLevel2.assetPopOverSnapshot.length ? JSON.parse(dataLevel2.assetPopOverSnapshot) : [];
                        assetpopoverData = [...assetpopoverData, ...assetData];
                      // });
                    }
                  })//---3
                }
                else{
                  // dataLevel1.forEach((data1) => {
                    footnoteData = [...footnoteData, ...dataLevel1.footnoteSnapshot];
                    glossaryData = [...glossaryData, ...dataLevel1.glossorySnapshot];
                    let assetData = dataLevel1.assetPopOverSnapshot && dataLevel1.assetPopOverSnapshot.length ? JSON.parse(dataLevel1.assetPopOverSnapshot) : [];
                    assetpopoverData = [...assetpopoverData, ...assetData];
                  // });
                }
              })//---2
            } 
            else {
            //   responseData.forEach((data) => {
                footnoteData = [...footnoteData, ...responseData.footnoteSnapshot];
                glossaryData = [...glossaryData, ...responseData.glossorySnapshot];
                let assetData = responseData.assetPopOverSnapshot && responseData.assetPopOverSnapshot.length ? JSON.parse(responseData.assetPopOverSnapshot) : [];
                assetpopoverData = [...assetpopoverData, ...assetData];
            //   });
            }
          }); //---1
        }

      if (complexElementsPartition[1].length > 0) {
        processedResponse = complexElementsPartition[1]
          .map(this.processContainers.bind(this, eURN));
        processedResponse.forEach((data) => {
          footnoteData = [...footnoteData, ...data.footnoteSnapshot];
          glossaryData = [...glossaryData, ...data.glossorySnapshot];
          let assetData = data.assetPopOverSnapshot && data.assetPopOverSnapshot.length ? JSON.parse(data.assetPopOverSnapshot) : [];
          assetpopoverData = [...assetpopoverData, ...assetData];
        });
      }
      processedResponse = OrderElementsData.sortSimpleElements(processedResponse, indexOfElements);
      processedResponse = processedResponse.concat(processedComplexResponse);
      processedResponse = orderBy(processedResponse, ['elemIndex'], ['asc']);
    } else {
      // TODO: based on the Service Response should update the store
      console.log('Need get the Response Data and update the Store');
    }
    return {
      result: processedResponse,
      footnote: TCMUtils.setFootnoteData(footnoteData),
      glossary: TCMUtils.setGlossaryData(glossaryData),
      assetpopover: TCMUtils.setAssetpopoverData(assetpopoverData),
    };
  },

  /**
   * This method is usedFootnoteData to process the container elements
   * @param {*} data
   */
  processContainers(eURN, data) {
    debugger
    let result = {};
    result.elementID = data.elemURN;
    result.eURN = eURN;
    if (Object.prototype.hasOwnProperty.call(data, 'latestAcceptedTransaction')
      && Object.prototype.hasOwnProperty.call(data, 'latestPendingTransaction')) {
      result = this.getLatestTransactions(data, result);
      result.assetPopOverSnapshot = this.processAssetpopoverSnapshot(JSON.parse(data.latestAcceptedTransaction.elemSnapshot).assetPopOverSnapshot, JSON.parse(data.latestPendingTransaction.elemSnapshot).assetPopOverSnapshot)
      // JSON.parse(data.latestPendingTransaction.elemSnapshot).assetPopOverSnapshot || [];

    }
    if (Object.prototype.hasOwnProperty.call(data, 'latestAcceptedTransaction')
      && !Object.prototype.hasOwnProperty.call(data, 'latestPendingTransaction')) {
      result = this.getAcceptedTranscations(data, result);
      result.assetPopOverSnapshot = this.processAcceptedAssetPopoverStatus(JSON.parse(data.latestAcceptedTransaction.elemSnapshot).assetPopOverSnapshot || []);
    }
    if (!Object.prototype.hasOwnProperty.call(data, 'latestAcceptedTransaction')
      && Object.prototype.hasOwnProperty.call(data, 'latestPendingTransaction')) {
      result = this.getPendingTranscations(data, result);
      result.assetPopOverSnapshot = JSON.parse(data.latestPendingTransaction.elemSnapshot).assetPopOverSnapshot || [];
    }
    return result;
  },
  processAcceptedAssetPopoverStatus(latestpendingData = []) {
    if (latestpendingData.length) {
      latestpendingData = JSON.parse(latestpendingData);
    }
    else{
      latestpendingData = [];
    }
    latestpendingData.map((data,pos) => {
      return latestpendingData[pos].isAccepted = true;
    });
    return JSON.stringify(latestpendingData);
  },
  processAssetpopoverSnapshot(latestAcceptedData = [], latestpendingData = []) {
    let latestAccepted = [];
    let latestpending = [];
    if (latestAcceptedData.length) {
      latestAcceptedData = JSON.parse(latestAcceptedData);
      latestAccepted = [...latestAcceptedData];
    }
    if (latestpendingData.length) {
      latestpendingData = JSON.parse(latestpendingData);
      latestpending = [...latestpendingData];
    }
    let dataToReturn = [];
    latestAccepted.forEach((dataAccepted) => {
      latestpending.forEach((datapending) => {
        const newObj = {};
        if (dataAccepted.assetid === datapending.assetid) {
          newObj.assetid = datapending.assetid;
          newObj.label = datapending.label;
          newObj.linkID = datapending.linkID;
          newObj.oldLabel = dataAccepted.label;
          newObj.type = datapending.type;
          if(JSON.stringify(dataAccepted)===JSON.stringify(datapending)){
            newObj.isAccepted=true;
          }
          dataToReturn.push(newObj);
          latestAcceptedData.splice(latestAcceptedData.indexOf(dataAccepted), 1);
          latestpendingData.splice(latestpendingData.indexOf(datapending), 1)
        }
      });
    });
    // latestAcceptedData = JSON.parse(this.processAcceptedAssetPopoverStatus(JSON.stringify(latestAcceptedData)));
    dataToReturn = [...dataToReturn, ...latestAcceptedData, ...latestpendingData];
    return JSON.stringify(dataToReturn);
  },
};

export default FetchAllDataMapper;
