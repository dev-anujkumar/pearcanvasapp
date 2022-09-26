import LatestTransactionsDataMapper from '../../../../src/component/TcmSnapshots/FetchAllDataMapper/LatestTransactionsDataMapper'

const data = {
    "elemURN": "urn:pearson:work:ebdb34d9-439a-4730-837d-441c3573b553",
    latestAcceptedTransaction: {
        elemSnapshot: "{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">jhhvhv</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}",
        elementType: "P",
    },
    latestPendingTransaction: {
        "elemSURN": "urn:pearson:work:ebdb34d9-439a-4730-837d-441c3573b553",
        "elemSnapshot": "{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">jhhvhv</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}",
        "elemWIPData": "{\"id\":\"urn:pearson:work:ebdb34d9-439a-4730-837d-441c3573b553\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"jhhvhv\"},\"versionUrn\":\"urn:pearson:work:ebdb34d9-439a-4730-837d-441c3573b553\",\"contentUrn\":\"urn:pearson:entity:c2869057-4fac-47a3-a5b8-b1abf3cc7f76\"}",
        "elementType": "P",
        "elementEditor": "c4, test05, c4",
        "changeType": "Update",
        "changeStatus": "Pending",
        "changeTime": "1663825119959",
        "lastUpdatedTimestamp": "1663825119959",
        "slateType": "slate",
        "slateID": "urn:pearson:manifest:7deff080-ecd0-4a04-9533-511bdcb53867"
    }
}

const pResult = {
    elementID: 'urn:pearson:work:ebdb34d9-439a-4730-837d-441c3573b553',
    eURN : 'urn:pearson:work:ebdb34d9-439a-4730-837d-441c3573b553'
}

describe('LatestTransactionsDataMapper file test cases', () => {
    test('verifying getLatestTransactions Function if condition', () => {
        const data1 = {
            ...data,
            latestAcceptedTransaction: {
                elemSnapshot: "{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">jhhvhv</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}",
                elementType: "figure",
            },
        }
        LatestTransactionsDataMapper.getLatestTransactions(data1, pResult)
    });
    test('verifying getLatestTransactions Function if condition for elementChangeType === delete', () => {
        const data1 = {
            ...data,
            latestAcceptedTransaction: {
                elemSnapshot: "{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">jhhvhv</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}",
                elementType: "figure",
            },
            latestPendingTransaction: {
                "elemSURN": "urn:pearson:work:ebdb34d9-439a-4730-837d-441c3573b553",
                "elemSnapshot": "{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">jhhvhv</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}",
                "elemWIPData": "{\"id\":\"urn:pearson:work:ebdb34d9-439a-4730-837d-441c3573b553\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"jhhvhv\"},\"versionUrn\":\"urn:pearson:work:ebdb34d9-439a-4730-837d-441c3573b553\",\"contentUrn\":\"urn:pearson:entity:c2869057-4fac-47a3-a5b8-b1abf3cc7f76\"}",
                "elementType": "P",
                "elementEditor": "c4, test05, c4",
                "changeType": "delete",
                "changeStatus": "Pending",
                "changeTime": "1663825119959",
                "lastUpdatedTimestamp": "1663825119959",
                "slateType": "slate",
                "slateID": "urn:pearson:manifest:7deff080-ecd0-4a04-9533-511bdcb53867"
            }
        }
        LatestTransactionsDataMapper.getLatestTransactions(data1, pResult)
    });
    test('verifying getLatestTransactions Function else condition', () => {
        LatestTransactionsDataMapper.getLatestTransactions(data, pResult)
    });
    test('verifying getLatestTransactions Function else condition for elementChangeType === delete ', () => {
        const data1 = {
            ...data,
            latestPendingTransaction: {
                "elemSURN": "urn:pearson:work:ebdb34d9-439a-4730-837d-441c3573b553",
                "elemSnapshot": "{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">jhhvhv</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}",
                "elemWIPData": "{\"id\":\"urn:pearson:work:ebdb34d9-439a-4730-837d-441c3573b553\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"jhhvhv\"},\"versionUrn\":\"urn:pearson:work:ebdb34d9-439a-4730-837d-441c3573b553\",\"contentUrn\":\"urn:pearson:entity:c2869057-4fac-47a3-a5b8-b1abf3cc7f76\"}",
                "elementType": "P",
                "elementEditor": "c4, test05, c4",
                "changeType": "delete",
                "changeStatus": "Pending",
                "changeTime": "1663825119959",
                "lastUpdatedTimestamp": "1663825119959",
                "slateType": "slate",
                "slateID": "urn:pearson:manifest:7deff080-ecd0-4a04-9533-511bdcb53867"
            }
        }
        LatestTransactionsDataMapper.getLatestTransactions(data1, pResult)
    });
    test('verifying getLatestTransactions Function for elementChangeType === create', () => {
        const data1 = {
            ...data,
            latestPendingTransaction: {
                "elemSURN": "urn:pearson:work:ebdb34d9-439a-4730-837d-441c3573b553",
                "elemSnapshot": "{\"contentSnapshot\":\"<p class=\\\"paragraphNumeroUno\\\">jhhvhv</p>\",\"glossorySnapshot\":\"[]\",\"footnoteSnapshot\":\"[]\",\"assetPopOverSnapshot\":\"[]\"}",
                "elemWIPData": "{\"id\":\"urn:pearson:work:ebdb34d9-439a-4730-837d-441c3573b553\",\"type\":\"element-authoredtext\",\"schema\":\"http://schemas.pearson.com/wip-authoring/element/1\",\"elementdata\":{\"schema\":\"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext\",\"text\":\"jhhvhv\"},\"versionUrn\":\"urn:pearson:work:ebdb34d9-439a-4730-837d-441c3573b553\",\"contentUrn\":\"urn:pearson:entity:c2869057-4fac-47a3-a5b8-b1abf3cc7f76\"}",
                "elementType": "P",
                "elementEditor": "c4, test05, c4",
                "changeType": "create",
                "changeStatus": "Pending",
                "changeTime": "1663825119959",
                "lastUpdatedTimestamp": "1663825119959",
                "slateType": "slate",
                "slateID": "urn:pearson:manifest:7deff080-ecd0-4a04-9533-511bdcb53867"
            }

        }
        LatestTransactionsDataMapper.getLatestTransactions(data1, pResult)
    });
});
  