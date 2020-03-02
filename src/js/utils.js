var _ = require("lodash");

export const utils = {

    getMonthName(monthNumber, abbrev) {
        var monthFullNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var monthAbbrevNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        var monthNames = abbrev ? monthAbbrevNames : monthFullNames;

        return monthNames[monthNumber]
    },

    getCommentFormatTime(hour, min) {
        var AMorPM = hour > 11 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        hour = hour < 10 ? `0${hour}` : hour;
        min = min < 10 ? `0${min}` : min;
        return `${hour}:${min} ${AMorPM}`
    },

    buildCommentDate(dateString) {
        var date = new Date(dateString);
        var day = date.getDate();
        var month = utils.getMonthName(date.getMonth(), true);
        var year = date.getFullYear();
        var time = utils.getCommentFormatTime(date.getHours(), date.getMinutes());

        return `${month}. ${day}, ${year} @${time}`
    },

    toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    },
    getTaxonomicType(data) {
        let format = '';
        switch (true) {
            case (data.indexOf("flashcards") !== -1):
                format = "flashcards";
                break;

            case (data.indexOf("cite-interactive-slideshow-video") !== -1):
                format = "gallery-video";
                break;
            //case (data.toLowerCase().indexOf("cite-interactive-slideshow-image") !== -1):
            //    format = "gallery-image";
            //    break;
            case (data.indexOf("cite-interactive-slideshow-image") !== -1):
                 format = "guided-example";
                 break;
            case (data.indexOf("cite-interactive-graph") !== -1):
                format = "graph";
                break;

            case (data.indexOf("cite-interactive-simulation") !== -1):
                format = "simulation";
                break;

            case (data.indexOf("cite-interactive-survey") !== -1):
                format = "survey";
                break;

            case (data.indexOf("cite-interactive-timeline") !== -1):
                format = "timeline";
                break;

            case (data.indexOf("cite-interactive-fill-in-blank") !== -1):
                format = "fill-in-blank";
                break;
            case (data.indexOf("cite-interactive-multiple-choice") !== -1):
                format = "mcq";
                break;
            case (data.indexOf("cite-interactive-hotspot") !== -1):
                format = "hotspot";
                break;
            case (data.indexOf("cite-accounting-tables") !== -1):
                format = "accountingtable";
                break;
            case (data.indexOf("cite-interactive-video-with-interactive") !== -1):
                format = "video-mcq";
                break;
        }
        return format;
    },
    getTaxonomicFormat(data) {

        let type = [];

        switch (true) {
            case (data.toLowerCase().indexOf("mmi") !== -1):
                type = 'mmi';
                break;

            case (data.toLowerCase().indexOf("cite") !== -1):
                type = 'cite';
                break;

            case (data.toLowerCase().indexOf("tdx") !== -1):
                type = 'tdx';
                break;
        }
        return type;
    },
};

export const checkforToolbarClick = (classList) =>{
    let existingToolbarClasses = ["tox-dialog__body-nav-item","tox-tab","tox-dialog__body-nav-item--active","tox-dialog__content-js","tox-dialog","tox-collection__item-icon","tox-tbtn","tox-tbtn--select","tox-split-button","wrs_focusElement","tox-split-button__chevron","definition-editor","dialog-input-textarea","SearchLibAutoSuggest__input___jIHit","plautosuggestTheme__input___Jd4Ux","patterns__col100___1reM7"];
    let isTargetFound = false;

    classList.forEach((val)=>{
        if(existingToolbarClasses.indexOf(val)>-1){
            isTargetFound = true;
            return;
        }
    })
    return isTargetFound;
}
export const customEvent = {
        listeners: {},
        subscribe: (eventName, listner) => {
            if (customEvent.listeners.hasOwnProperty(eventName)) {
                customEvent.listeners[eventName].push(listner)
            } else {
                customEvent.listeners[eventName] = [listner];
            }
        },
        trigger: (eventName,args) => {
            if (customEvent.listeners.hasOwnProperty(eventName)) {
                customEvent.listeners[eventName].forEach((listner, index) => {
                    listner(args);
                })
            }
        },
        unsubscribe: (eventName) => {
            if (customEvent.listeners.hasOwnProperty(eventName)) {
                customEvent.listeners[eventName] = []
            }
        },
        removeListenr: (eventName) => {
            if (customEvent.listeners.hasOwnProperty(eventName)) {
                delete customEvent.listeners[eventName]
            }
        }
}
