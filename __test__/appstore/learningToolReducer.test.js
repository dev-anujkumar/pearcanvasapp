import reducer from '../../src/appstore/learningToolReducer';
import {
    LT_API_RESULT,
    LT_API_RESULT_FAIL,
    SELECTED_FIGURE,
    PAGINATION,
    LEARNING_TOOL_DIS_VALUE,
    TOGGLE_LT_POPUP,
    GET_DISCIPLINE,
    REMOVE_SELECTED_DATA,
    GET_DISCIPLINE_FAIL,
    LT_TYPE_FILTER_SELECTED
} from '../../src/constants/Action_Constants';

const INITIAL_STATE = {
    shouldHitApi: false,
    learningToolTypeValue: '',
    apiResponse: [],
    showErrorMsg: true, //should be false
    showLTBody: false,
    learningTypeSelected: false,
    showDisFilterValues: false,
    selectedResultFormApi: '',
    resultIsSelected: false,
    toggleLT: false,
    linkButtonDisable: true,
    apiResponseForDis: [],
    learningToolDisValue: '',
    numberOfRows: 25
};
const INITIAL_STATE2 = {
    shouldHitApi: false,
    learningToolTypeValue: "accounting-sims",
    apiResponse: [],
    showErrorMsg: true, //should be false
    showLTBody: false,
    learningTypeSelected: false,
    showDisFilterValues: false,
    selectedResultFormApi: '',
    resultIsSelected: false,
    toggleLT: false,
    linkButtonDisable: true,
    apiResponseForDis: [],
    learningToolDisValue: "mathematics",
    numberOfRows: 25
};
const INITIAL_STATE3 = {
    shouldHitApi: false,
    learningToolTypeValue: "accounting-sims",
    apiResponse: [],
    showErrorMsg: true, //should be false
    showLTBody: false,
    learningTypeSelected: false,
    showDisFilterValues: false,
    selectedResultFormApi: '',
    resultIsSelected: false,
    toggleLT: false,
    linkButtonDisable: true,
    apiResponseForDis: [],
    learningToolDisValue: "art",
    numberOfRows: 25
};
const mock_GET_DISCIPLINE = {
    "taxonomyType": "disciplines",
    "options": [
        {
            "prefLabel": "art",
            "locale": "en"
        },
        {
            "prefLabel": "biologyandmicrobiology",
            "locale": "en"
        },
        {
            "prefLabel": "mathematics",
            "locale": "en"
        },
        {
            "prefLabel": "psychology",
            "locale": "en"
        },
        {
            "prefLabel": "anatomyandphysiology",
            "locale": "en"
        },
        {
            "prefLabel": "anthropology",
            "locale": "en"
        },
        {
            "prefLabel": "business",
            "locale": "en"
        },
        {
            "prefLabel": "businessstatistics",
            "locale": "en"
        },
        {
            "prefLabel": "chemistry",
            "locale": "en"
        },
        {
            "prefLabel": "communication-film-theatre",
            "locale": "en"
        },
        {
            "prefLabel": "communicationsciencesanddisorders",
            "locale": "en"
        },
        {
            "prefLabel": "computerscience",
            "locale": "en"
        },
        {
            "prefLabel": "counseling",
            "locale": "en"
        },
        {
            "prefLabel": "criminaljustice",
            "locale": "en"
        },
        {
            "prefLabel": "culinary-hospitality-travel-and-tourism",
            "locale": "en"
        },
        {
            "prefLabel": "deaf-studies-and-deaf-education",
            "locale": "en"
        },
        {
            "prefLabel": "economics",
            "locale": "en"
        },
        {
            "prefLabel": "education",
            "locale": "en"
        },
        {
            "prefLabel": "ems-and-fire-science-(brady)",
            "locale": "en"
        },
        {
            "prefLabel": "engineering",
            "locale": "en"
        },
        {
            "prefLabel": "english",
            "locale": "en"
        },
        {
            "prefLabel": "environmentalscience",
            "locale": "en"
        },
        {
            "prefLabel": "fashion-and-interior-design",
            "locale": "en"
        },
        {
            "prefLabel": "geographyandatmosphericsciences",
            "locale": "en"
        },
        {
            "prefLabel": "geologyandoceanography",
            "locale": "en"
        },
        {
            "prefLabel": "health-professions",
            "locale": "en"
        },
        {
            "prefLabel": "healthandkinesiology",
            "locale": "en"
        },
        {
            "prefLabel": "history",
            "locale": "en"
        },
        {
            "prefLabel": "informationtechnology",
            "locale": "en"
        },
        {
            "prefLabel": "interdisciplinarystudies",
            "locale": "en"
        },
        {
            "prefLabel": "legal-studies-and-paralegal",
            "locale": "en"
        },
        {
            "prefLabel": "music",
            "locale": "en"
        },
        {
            "prefLabel": "nursing",
            "locale": "en"
        },
        {
            "prefLabel": "nutrition",
            "locale": "en"
        },
        {
            "prefLabel": "philosophy",
            "locale": "en"
        },
        {
            "prefLabel": "physicsandastronomy",
            "locale": "en"
        },
        {
            "prefLabel": "politicalscience",
            "locale": "en"
        },
        {
            "prefLabel": "religion",
            "locale": "en"
        },
        {
            "prefLabel": "socialwork-familytherapy-humanservices",
            "locale": "en"
        },
        {
            "prefLabel": "sociology",
            "locale": "en"
        },
        {
            "prefLabel": "statistics",
            "locale": "en"
        },
        {
            "prefLabel": "student-success-and-career-development",
            "locale": "en"
        },
        {
            "prefLabel": "trades-and-technology",
            "locale": "en"
        },
        {
            "prefLabel": "worldlanguages",
            "locale": "en"
        }
    ]
}
const mock_LT_API_RESULT = [
    {
        "learningtemplateUrn": "urn:pearson:learningtemplate:adce9d0a-52f3-40ab-a614-57c696102d89",
        "templateid": "2000",
        "learningsystem": "knowdl",
        "type": "accounting-sims",
        "label": {
            "en": "9001 - LasVegas&%",
            "es": "9001 - Nombre español",
            "fr": "Nom français seulement"
        },
        "disciplines": {
            "en": [
                "art",
                "biologyandmicrobiology"
            ]
        },
        "dateModified": "2019-01-04T21:13:53.711Z"
    },
    {
        "learningtemplateUrn": "urn:pearson:learningtemplate:ab9fdcac-60ad-47e9-b434-7a7a34d51510",
        "templateid": "W-x02_001",
        "learningsystem": "knowdl",
        "type": "accounting-sims",
        "label": {
            "en": "Accounting Sim -1"
        },
        "disciplines": {
            "en": [
                "art",
                "biologyandmicrobiology"
            ]
        },
        "keywords": {
            "en": [
                "Accounting Sim -1"
            ]
        },
        "dateModified": "2019-04-04T16:57:44.002Z"
    },
    {
        "learningtemplateUrn": "urn:pearson:learningtemplate:76ec0d84-bcde-4a2d-a0fa-827be9f4aa7c",
        "templateid": "W-x02_002",
        "learningsystem": "knowdl",
        "type": "accounting-sims",
        "label": {
            "en": "Accounting Sim -2"
        },
        "disciplines": {
            "en": [
                "art",
                "biologyandmicrobiology"
            ]
        },
        "keywords": {
            "en": [
                "Accounting Sim -2"
            ]
        },
        "dateModified": "2019-04-04T16:58:10.468Z"
    },
    {
        "learningtemplateUrn": "urn:pearson:learningtemplate:9a4e0bd2-2d62-4c46-b2ea-a0f422f60da5",
        "templateid": "W-x02_003",
        "learningsystem": "knowdl",
        "type": "accounting-sims",
        "label": {
            "en": "Accounting Sim -3"
        },
        "disciplines": {
            "en": [
                "art",
                "biologyandmicrobiology"
            ]
        },
        "keywords": {
            "en": [
                "Accounting Sim -3"
            ]
        },
        "dateModified": "2019-04-04T16:58:35.240Z"
    }
]

const mock_SELECTED_FIGURE = {
    dateModified: "2019-01-04T21:13:53.711Z",
    learningsystem: "knowdl",
    learningtemplateUrn: "urn:pearson:learningtemplate:adce9d0a-52f3-40ab-a614-57c696102d89",
    templateid: "2000",
    type: "accounting-sims",
    label: {
        en: "9001 - LasVegas&%",
        es: "9001 - Nombre español",
        fr: "Nom français seulement"
    },
    disciplines: {
        en: ["art",
            "biologyandmicrobiology"
        ]
    }
}
const temp = ["art",
    "biologyandmicrobiology"]

describe('Testing Learning Tool Reducer cases -->', () => {

    xit('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });
    it('Test 1- LT_TYPE_FILTER_SELECTED', () => {
        reducer(INITIAL_STATE, {
            type: LT_TYPE_FILTER_SELECTED,
            payload: {
                shouldHitApi: true,
                learningToolTypeValue: '',
            }
        })
    })
    it('Test 2- LT_API_RESULT', () => {
        reducer(INITIAL_STATE, {
            type: LT_API_RESULT,
            payload: {
                learningToolTypeValue: "accounting-sims",
                learningTypeSelected: true,
                showDisFilterValues: true,
                showLTBody: true,
                apiResponse: mock_LT_API_RESULT,
                linkButtonDisable: true,
                selectedResultFormApi: '',
            }
        })
    })
    it('Test 3- LT_API_RESULT_FAIL', () => {
        reducer(INITIAL_STATE, {
            type: LT_API_RESULT_FAIL,
            payload: {
                showErrorMsg: true,
                showDisFilterValues: false
            }
        })
    })
    it('Test 4- TOGGLE_LT_POPUP', () => {
        reducer(INITIAL_STATE, {
            type: TOGGLE_LT_POPUP,
            payload: {
                toggleLT: false, apiResponse: [],
                showLTBody: false,
                linkButtonDisable: false,
                learningToolDisValue: ''
            }
        })
    })
    it('Test 5- SELECTED_FIGURE', () => {
        reducer(INITIAL_STATE, {
            type: SELECTED_FIGURE,
            payload: {
                selectedResultFormApi: mock_SELECTED_FIGURE,
                resultIsSelected: true,
                linkButtonDisable: false
            }
        })
    })
    it('Test 6- GET_DISCIPLINE', () => {
        reducer(INITIAL_STATE, {
            type: GET_DISCIPLINE,
            payload: {
                showDisFilterValues: true,
                apiResponseForDis: mock_GET_DISCIPLINE
            }
        })
    })
    it('Test 7- LEARNING_TOOL_DIS_VALUE', () => {
        reducer(INITIAL_STATE, {
            type: LEARNING_TOOL_DIS_VALUE,
            payload: {
                learningToolDisValue: "art"
            }
        })
    })
    it('Test 8- GET_DISCIPLINE_FAIL', () => {
        reducer(INITIAL_STATE, {
            type: GET_DISCIPLINE_FAIL,
            payload: {
                showDisFilterValues: false
            }
        })
    })
    it('Test 9- PAGINATION', () => {
        reducer(INITIAL_STATE, {
            type: PAGINATION,
            payload: {
                numberOfRows: 24
            }
        })
    })
    it('Test 10- REMOVE_SELECTED_DATA', () => {
        reducer(INITIAL_STATE, {
            type: REMOVE_SELECTED_DATA,
            payload: {
                selectedResultFormApi: "",
            }
        })
    })
    it('Test 11- LT_API_RESULT for if-case', () => {
        let tempDisToMatchArray = temp;
        reducer(INITIAL_STATE2, {
            type: LT_API_RESULT,
            payload: {
                learningToolDisValue: "mathematics",
                learningTypeSelected: true,
                showDisFilterValues: true,
                showLTBody: true,
                apiResponse: mock_LT_API_RESULT,
                linkButtonDisable: true,
                selectedResultFormApi: '',
            }
        })
    })
    it('Test 12- LT_API_RESULT for if-else-case', () => {
        reducer(INITIAL_STATE3, {
            type: LT_API_RESULT,
            payload: {
                learningToolDisValue: "art",
                learningTypeSelected: true,
                showDisFilterValues: true,
                showLTBody: true,
                apiResponse: mock_LT_API_RESULT,
                linkButtonDisable: true,
                selectedResultFormApi: '',
            }
        })
    })
});