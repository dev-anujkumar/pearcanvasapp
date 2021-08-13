import cypressConfig from '../config/cypressConfig';
import { sendDataToIframe} from '../constants/utility';
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

export const timeSince = () => {
    let count;
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 0 }
    ];
    let seconds = Math.floor((new Date().getTime() - this.countTimer) / 1000);
    let interval = intervals.find(i => i.seconds <= seconds);
    if (interval && interval.label != 'second') {
        count = Math.floor(seconds / interval.seconds);
        sendDataToIframe({ 'type': 'slateRefreshStatus', 'message': {slateRefreshStatus : `Refreshed, ${count} ${interval.label == 'second' ? '' : interval.label} ago`} });
    }        
}

export const removeWirisOverlay =() =>{
    let targetNode = document.querySelector('body');
        // Options for the observer (which mutations to observe)		
        var config = { attributes: true };
        // Callback function to execute when mutations are observed		
        let callbackOb = function (mutationsList, observercb) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'attributes') {
                    let wirisNodes = document.getElementsByClassName('wrs_modal_dialogContainer');
                    let wirisNodeLength = wirisNodes.length;
                    if (wirisNodeLength > 1) {
                        for (let i = 0; i < wirisNodeLength - 1; i++) {
                            wirisNodes[i].remove();
                            document.getElementsByClassName('wrs_modal_overlay').remove();
                        }
                    }
                }
            }
        };
        // Create an observer instance linked to the callback function		
        let observer = new MutationObserver(callbackOb);
        // Start observing the target node for configured mutations	
        if (targetNode)
            observer.observe(targetNode, config);
}