import AcceptedTransactionsDataMapper from "../../../../src/component/TcmSnapshots/FetchAllDataMapper/AcceptedTransactionsDataMapper"

test('should test AcceptedTransactionsDataMapper', () => {
    let data = {
        latestAcceptedTransaction: {
          elemSnapshot: '{"result":true, "count":42}',
          elementType: "acceptedElementType",
          changeType: 'delete',
          trackChangeApprover: "authorName",
          changeStatus: "",
          lastUpdatedTimestamp: "",
          feedback: {},
          index: "",
          changeTime: ""
        },
      };
      let result = {}
    AcceptedTransactionsDataMapper.getAcceptedTranscations(data, result);
})

test('should test AcceptedTransactionsDataMapper changetype as update', () => {
    let data = {
        latestAcceptedTransaction: {
          elemSnapshot: '{"result":true, "count":42}',
          elementType: "acceptedElementType",
          changeType: 'update',
          trackChangeApprover: "authorName",
          changeStatus: "",
          lastUpdatedTimestamp: "",
          feedback: {},
          index: "",
          changeTime: ""
        },
      };
      let result = {}
    AcceptedTransactionsDataMapper.getAcceptedTranscations(data, result);
})