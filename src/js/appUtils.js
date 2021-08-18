import cypressConfig from '../config/cypressConfig';

export const loadPatternScripts = (PATTERNS) => {

    appendPatternScripts(PATTERNS['PATTERN_VENDOR'])
    appendPatternScripts(PATTERNS['PATTERN_BROKER'])
    appendPatternScripts(PATTERNS['PATTERN_ADD_ASSET'])
    appendPatternScripts(PATTERNS['PATTERN_PRODUCT_LINK'])
    appendPatternScripts(PATTERNS['PATTERN_SEARCH_SELECT'])
}

const appendPatternScripts = (src) => {
    let script = document.createElement('script');
    script.type = "text/javascript";
    script.defer = true;
    script.async = false;
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);
}

export const modifyObjKeys = (obj, newObj) => {
    Object.keys(obj).forEach(function(key) {
      delete obj[key];
    });      
    Object.keys(newObj).forEach(function(key) {
      obj[key] = newObj[key];
    });
    Object.keys(cypressConfig).forEach(function(key) {
        obj[key] = cypressConfig[key];
    });
    console.log("Get MongoDB taskdef config>> ", obj);
    if(process.env.NODE_ENV === 'development'){
        obj.REACT_APP_API_URL = cypressConfig.CYPRESS_API_ENDPOINT;
        obj.JAVA_API_URL = cypressConfig.CYPRESS_TOC_JAVA_ENDPOINT;
    }
}