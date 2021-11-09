import { partition, orderBy } from 'lodash';
import TCMUtils from '../../../js/tcmUtils.js';
import PendingTransactionsDataMapper from './PendingTransactionsDataMapper';
import LatestTransactionsDataMapper from './LatestTransactionsDataMapper';
import AcceptedTransactionsDataMapper from './AcceptedTransactionsDataMapper';
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

  processResponse(response, eURN, indexOfElements) {
    response = TCMUtils.apiCleanUp(response);
    let processedResponse = [];
    if (response) {
      const complexElementsPartition = partition(response, element => element.elemURN.split('+').length > 1);
      if (complexElementsPartition[1].length > 0) {
        processedResponse = complexElementsPartition[1]
          .map(this.processContainers.bind(this, eURN));
      }
      processedResponse = OrderElementsData.sortSimpleElements(processedResponse, indexOfElements);
      processedResponse = orderBy(processedResponse, ['elemIndex'], ['asc']);
    } else {
      // TODO: based on the Service Response should update the store
      console.log('Need get the Response Data and update the Store');
    }
    return {
      result: processedResponse
    };
  },

  /**
   * This method is usedFootnoteData to process the container elements
   * @param {*} data
   */
  processContainers(eURN, data) {
    let result = {};
    result.elementID = data.elemURN;
    result.eURN = eURN;
    if (Object.prototype.hasOwnProperty.call(data, 'latestAcceptedTransaction')
      && Object.prototype.hasOwnProperty.call(data, 'latestPendingTransaction')) {
      result = this.getLatestTransactions(data, result);
    }
    if (Object.prototype.hasOwnProperty.call(data, 'latestAcceptedTransaction')
      && !Object.prototype.hasOwnProperty.call(data, 'latestPendingTransaction')) {
      result = this.getAcceptedTranscations(data, result);
    }
    if (!Object.prototype.hasOwnProperty.call(data, 'latestAcceptedTransaction')
      && Object.prototype.hasOwnProperty.call(data, 'latestPendingTransaction')) {
      result = this.getPendingTranscations(data, result);
    }
    return result;
  },
};

export default FetchAllDataMapper;
