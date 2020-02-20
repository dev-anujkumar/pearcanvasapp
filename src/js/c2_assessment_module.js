const renderderedTagSelector = '#c2-modal';
const configOBJ = require('./../config/config');
let config_object = configOBJ.default;
const CMDS_APIKEY = config_object['CMDS_APIKEY'];
const CMDS_DATA_ENDPOINT = config_object['CMDS_DATA_ENDPOINT'];
const CMDS_SCHEMA_ENDPOINT = config_object['CMDS_SCHEMA_ENDPOINT'];
const CMDS_DATABASE = config_object['CMDS_DATABASE'];
const CMDS_AUTHORIZATION = config_object['CMDS_AUTHORIZATION'];
import { hideTocBlocker, disableHeader } from './toggleLoader'
const WRAPPER_URL = `${config_object.WRAPPER_URL}`;
const authModule = { GET_SSO_TOKEN: function () { return config_object.ssoToken } };
import { sendDataToIframe } from '../constants/utility.js'



// Access individual pattern (from the <script> tag)
var patternBroker; //(PatternBroker && PatternBroker !== undefined && PatternBroker !== null) ? PatternBroker.default : {}; //this.PatternBroker.default;
var patternSearchSelect; //(PatternSearchSelect && PatternSearchSelect !== undefined && PatternSearchSelect !== null) ? PatternSearchSelect.default : {};//this.SearchSCPatterns.default;

let _interactivePattern = {};
let _interactivePatternConfig = {};
var uname = config_object['userId'];

/*Configure the library*/
var libConfig = {
  'locale': 'en_US',
  'headers': {
    'Content-Type': 'application/json',
    'Accept': 'application/ld+json',
    'X-Roles-Test': 'ContentMetadataEditor',
    'Prefer': 'annotation=true',
    'Apikey': CMDS_APIKEY,
    'X-APIKey': CMDS_APIKEY,
    'PearsonSSOSession': authModule.GET_SSO_TOKEN(),
    'X-PearsonSSOSession': authModule.GET_SSO_TOKEN(),
    'Authorization': CMDS_AUTHORIZATION
  },
  'database': CMDS_DATABASE,
  'server': CMDS_DATA_ENDPOINT,
  'taxonomyserver': CMDS_SCHEMA_ENDPOINT,  // Rel 3.6
  'userId': uname || config_object['userId']
};

//patternBroker.setup(libConfig);

export const c2AssessmentModule = {
  searchAndSelectonSave: function (data) {
    console.log("searchAndSelectonSave data: " + '', data);

  },
  launchAssetBrowser: function (fileName, filterType, searchMode, searchSelectAssessmentURN, productId, searchTypeOptVal, callback) {
    patternBroker = PatternBroker.default || {}; //(PatternBroker && PatternBroker !== undefined && PatternBroker !== null) ? PatternBroker.default : {}; //this.PatternBroker.default;
    patternSearchSelect = PatternSearchSelect.default || {};
    disableHeader(true);
    if (_interactivePattern && _interactivePattern.unmount) {
      _interactivePattern.unmount();
    }

    var libConfig = {
      'locale': 'en_US',
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/ld+json',
        'X-Roles-Test': 'ContentMetadataEditor',
        'Prefer': 'annotation=true',
        'Apikey': CMDS_APIKEY,
        'X-APIKey': CMDS_APIKEY,
        'PearsonSSOSession': authModule.GET_SSO_TOKEN(),
        'X-PearsonSSOSession': authModule.GET_SSO_TOKEN(),
        'Authorization': CMDS_AUTHORIZATION
      },
      'database': CMDS_DATABASE,
      'server': CMDS_DATA_ENDPOINT,
      'taxonomyserver': CMDS_SCHEMA_ENDPOINT,  // Rel 3.6
      'searchselectserver': CMDS_DATA_ENDPOINT,
      'userId': uname || config_object['userId']
    };

    patternBroker.setup(libConfig);

    _interactivePatternConfig = { 'selector': renderderedTagSelector };
    // filename = 'Some pre-specified search term - a string value';
    _interactivePatternConfig.filename = fileName;
    // filterType = ['', '', '']  // An array of strings; Each element is a pre-specified type filter; ie.  ["PDF", "Metrodigi Interactive"]
    // _interactivePatternConfig.filterType = ['Journal','Cite interactive: Graph'];

    _interactivePatternConfig.filterType = filterType;

    // searchmode = 'full' OR 'partial'
    //_interactivePatternConfig.searchmode = 'full';
    _interactivePatternConfig.searchmode = searchMode;
    // searchTypeOptVal = 'journal'  OR  'tdx'  OR  'cite'
    //_interactivePatternConfig.searchTypeOptVal = searchTypeOptVal;  // Must be specified as one of the three types
    // searchSelectAssessmentURN - For 2nd-nth question embedding, specify Assessment wURN so the user does not need to search for it again.
    // If specified, the pattern will directly goto screen for selecting underlaying assessment items
    // If it's not specified, the pattern will goto main screen where user will need to research for the assessment
    _interactivePatternConfig.searchSelectAssessmentURN = searchSelectAssessmentURN;
    // productId - Chaucer must capture and supply this value to pattern each time the pattern is used.
    // The pattern will constraint it's search for assessment within specified productId (user does have an option to disable the constraint!)
    // Due to C1 MDS limitation, for now this will be the UUID part of the 'Register' URN. In future it'll be ISBN.
    // On PPE, some sample data exists in : ab1ce445-253a-44a4-a7eb-31274955b2d5
    _interactivePatternConfig.productId = productId;  // Rel 3.6
    // This for INTL lang support. It's still work in progress. Support for 'fr' is forthcoming.
    _interactivePatternConfig.language = 'en';  // Rel 3.6

    _interactivePattern = patternBroker.create('interactivePattern', patternSearchSelect);
    try {
      if (_interactivePattern.corsId) {
        libConfig.headers['Correlation-Id'] = _interactivePattern.corsId;
      }
      patternBroker.setup(libConfig);
      _interactivePattern.setup(_interactivePatternConfig, this.searchAndSelectCallBack);
      _interactivePattern.run(_interactivePattern);
      _interactivePattern.on(callback);

      sendDataToIframe({ 'type': 'hideToc', 'message': {} });

      //alfresco toc issue
      var targetNode = document.getElementsByClassName('overlay-0-0 overlayLittle-0-1')[0];

      // Options for the observer (which mutations to observe)
      var config = { attributes: true };

      // Callback function to execute when mutations are observed
      var callbackOb = function (mutationsList, observercb) {
        for (var mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class' && targetNode.classList.contains("transitionLeave-0-6")) {
            {
              hideTocBlocker();
              disableHeader(false);
              observercb.disconnect();
            }
          }
        }
      };
      // Create an observer instance linked to the callback function
      var observer = new MutationObserver(callbackOb);

      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);

    } catch (ex1) {
      alert(ex1.message);
      hideTocBlocker();
      disableHeader(false);
    }

  }
}