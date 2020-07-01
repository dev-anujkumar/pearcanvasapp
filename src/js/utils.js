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
            case (data.indexOf("cite-interactive-flashcards") !== -1):
                format = "flashcards";
                break;

            case (data.indexOf("cite-interactive-slideshow-video") !== -1):
            case (data.indexOf("slideshow-video") !== -1):
                format = "gallery-video";
                break;

            case (data.indexOf("cite-interactive-slideshow-image") !== -1):
            case (data.indexOf("slideshow-image") !== -1):
                format = "gallery-image";
                break;

            case (data.indexOf("guided-example") !== -1):
                format = "guided-example";
                break;

            case (data.indexOf("cite-interactive-graph") !== -1):
            case (data.indexOf("graph") !== -1):
                format = "graph";
                break;

            case (data.indexOf("cite-interactive-simulation") !== -1):
            case (data.indexOf("simulation") !== -1):
                format = "simulation";
                break;

            case (data.indexOf("cite-interactive-survey") !== -1):
            case (data.indexOf("survey") !== -1):
                format = "survey";
                break;

            case (data.indexOf("cite-interactive-timeline") !== -1):
            case (data.indexOf("timeline") !== -1):
                format = "timeline";
                break;

            case (data.indexOf("cite-interactive-fill-in-blank") !== -1):
            case (data.indexOf("fill-in-blank") !== -1):
                format = "fill-in-blank";
                break;
            case (data.indexOf("cite-interactive-multiple-choice") !== -1):
                format = "mcq";
                break;
            case (data.indexOf("cite-interactive-hotspot") !== -1):
            case (data.indexOf("hotspot") !== -1):
                format = "hotspot";
                break;
            case (data.indexOf("cite-accounting-tables") !== -1):
            case (data.indexOf("accounting-tables") !== -1):
                format = "accountingtable";
                break;
            case (data.indexOf("cite-interactive-video-with-interactive") !== -1):
            case (data.indexOf("video-with-interactive") !== -1):
                format = "video-mcq";
                break;
            default:
                format = "fpo";
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

export const checkforToolbarClick = (classList) => {
    let existingToolbarClasses = ["tox-dialog__body-nav-item", "tox-tab", "tox-dialog__body-nav-item--active", "tox-dialog__content-js", "tox-dialog", "tox-collection__item-icon", "tox-tbtn", "tox-tbtn--select", "tox-split-button", "wrs_focusElement", "tox-split-button__chevron", "definition-editor", "dialog-input-textarea", "SearchLibAutoSuggest__input___jIHit", "plautosuggestTheme__input___Jd4Ux", "patterns__col100___1reM7"];
    let isTargetFound = false;

    classList.forEach((val) => {
        if (existingToolbarClasses.indexOf(val) > -1) {
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
    trigger: (eventName, args) => {
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

export const spanHandlers = {

    handleFormattingTags: (editor, elementId, parentTag, childNodes, childClass, range) => {
        let havingExtraChild = false;
        for (let index = 0; index < childNodes.length; index++) {
            if (childNodes[index].tagName && childNodes[index].tagName.toLowerCase() !== 'span') {
                havingExtraChild = true;
                break;
            }
        }
        if (havingExtraChild) {
            let sText = editor.selection.getContent();
            let parser = new DOMParser();
            let htmlDoc = parser.parseFromString(sText, 'text/html');
            let spans = htmlDoc.getElementsByClassName(childClass);
            let startNode = null;
            let endNode = null;
            let startOffSet = 0;
            let endOffSet = -1;
            if (!spans.length) {
                if (editor.selection.getNode().tagName && editor.selection.getNode().tagName.toLowerCase() === 'stanza') {
                    spans = [editor.selection.getNode()];
                } else {
                    spans = [editor.selection.getNode().closest(`.${childClass}`)];
                }
            }
            if (spans.length) {
                startNode = spans[0];
                endNode = spans[spans.length - 1];
            }
            let mainParent = null;
            let allLines = tinymce.$(`div[data-id="${elementId}"] .${childClass}`);
            let nodesFragment = document.createDocumentFragment();
            for (let index = 0; index < allLines.length; index++) {
                if (startNode && startNode.isEqualNode(allLines[index])) {
                    startOffSet = index;
                }
                if (endNode && endNode.isEqualNode(allLines[index])) {
                    endOffSet = index;
                }
                let parents = [];
                let elem = allLines[index];
                while (elem.parentNode && elem.parentNode.nodeName.toLowerCase() != parentTag) {
                    elem = elem.parentNode;
                    parents.push(elem.nodeName.toLowerCase());
                }
                mainParent = elem.parentElement;
                for (let innerIndex = 0; innerIndex < parents.length; innerIndex++) {
                    allLines[index].innerHTML = '<' + parents[innerIndex] + '>' + allLines[index].innerHTML + '</' + parents[innerIndex] + '>';
                }
                nodesFragment.appendChild(allLines[index]);
            }
            if (mainParent) {
                mainParent.innerHTML = "";
                mainParent.appendChild(nodesFragment);
                range.setStart(mainParent, startOffSet);
                range.setEnd(mainParent, endOffSet + 1);
                editor.selection.setRng(range);
            }
        }
    },

    handleExtraTags: (elementId, parentTag, childClass) => {
        let mainParent = null;
        let allLines = tinymce.$(`div[data-id="${elementId}"] .${childClass}`);
        let nodesFragment = document.createDocumentFragment();
        for (let index = 0; index < allLines.length; index++) {
            let parents = [];
            let elem = allLines[index];
            while (elem.parentNode && elem.parentNode.nodeName.toLowerCase() != parentTag) {
                elem = elem.parentNode;
                parents.push(elem.nodeName.toLowerCase());
            }
            mainParent = elem.parentElement;
            for (let innerIndex = 0; innerIndex < parents.length; innerIndex++) {
                allLines[index].innerHTML = '<' + parents[innerIndex] + '>' + allLines[index].innerHTML + '</' + parents[innerIndex] + '>';
            }
            nodesFragment.appendChild(allLines[index]);
        }
        if (mainParent) {
            mainParent.innerHTML = "";
            mainParent.appendChild(nodesFragment);
        }
    },

    handleBackSpaceAndDeleteKyeDown: (editor, key, e, childClass) => {
        let currentElement = editor.selection.getNode();
        if (editor.selection.getNode().tagName.toLowerCase() !== 'span' || editor.selection.getNode().className.toLowerCase() !== childClass) {
            currentElement = editor.selection.getNode().closest(`.${childClass}`);
        }
        if (key === 8 && editor.selection.getRng().startOffset === 0 && currentElement && currentElement.innerHTML !== '<br>' && editor.selection.getContent() === '' && currentElement.textContent.trim() != '') {
            e.preventDefault();
        } else if (currentElement && ((currentElement.innerHTML && (currentElement.innerHTML.length === 1 || currentElement.textContent.trim().length === 1)) || (key === 8 && currentElement.tagName == 'SPAN' && (currentElement.innerHTML == '<br>' || currentElement.textContent.trim() === '')))) {
            if (currentElement.previousSibling) {
                if (key === 46) {
                    e.preventDefault();
                } else {
                    if(currentElement.previousSibling.innerHTML != '<br>') {
                        currentElement.previousSibling.innerHTML += '&nbsp;';
                    }
                }
                let temElm = editor.dom.create('br');
                currentElement.previousSibling.appendChild(temElm);
                let childNodes = currentElement.previousSibling.childNodes;
                editor.selection.setCursorLocation(currentElement.previousSibling.childNodes[childNodes.length - 1], 0);
                currentElement.remove();
            } else {
                let elm = editor.dom.create('span', { 'class': childClass }, '<br />');
                currentElement.parentNode.insertBefore(elm, currentElement);
                editor.selection.setCursorLocation(currentElement.previousSibling, 0);
                currentElement.remove();
                if (key === 46) {
                    e.preventDefault();
                }
            }
        }
    },

    handleBackSpaceAndDeleteKyeUp: (editor, key, childClass) => {
        let currentElement = editor.selection.getNode();
        if (editor.selection.getNode().tagName.toLowerCase() !== 'span' || editor.selection.getNode().className.toLowerCase() !== childClass) {
            currentElement = editor.selection.getNode().closest(`.${childClass}`);
        }
        if (currentElement) {
            if (key === 46) {
                let innerSpans = currentElement.getElementsByTagName('span');
                for (let index = 0; index < innerSpans.length; index++) {
                    let innerHtml = innerSpans[index].innerHTML;
                    innerSpans[index].outerHTML = innerHtml;
                }
            }
            if (currentElement.innerHTML != '<br>' && currentElement.textContent.trim() != '') {
                let brs = currentElement.getElementsByTagName('br');
                while (brs.length) {
                    brs[0].parentNode.removeChild(brs[0]);
                }
            }
        } else {
            currentElement = editor.selection.getNode();
            let checkSpan = currentElement.getElementsByClassName(childClass);
            if (!checkSpan.length) {
                currentElement.innerHTML = `<span class="${childClass}"><br/></span>`;
                checkSpan = currentElement.getElementsByClassName(childClass);
                editor.selection.setCursorLocation(checkSpan[0], 0);
            } else if (checkSpan.length === 1) {
                editor.selection.setCursorLocation(checkSpan[0], 0);
            }
        }
    },

    handleRemoveFormattingOnSpan: (selection, e, parentTag, childClass) => {
        if (selection.anchorNode.parentNode.nodeName === "SPAN" && selection.anchorNode.parentNode.classList.contains(childClass)) {
            if (selectedText !== "") {
                selection.anchorNode.parentNode.innerHTML = selection.anchorNode.parentNode.innerText;
            }
            let spanNode = selection.anchorNode;
            let outerNode = selection.anchorNode;
            if (spanNode.nodeName == "SPAN" || (spanNode.className && !spanNode.className.toLowerCase() == childClass)) {
                //spanNode = selection.anchorNode.closest('.poetryLine');
                while (outerNode.parentElement && outerNode.parentElement.tagName.toLowerCase() != parentTag) {
                    outerNode = outerNode.parentElement;
                }
                outerNode.parentNode.replaceChild(spanNode, outerNode);
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }
    },
    handleSelectAllRemoveFormatting: (id, parentTag, childClass) =>{
        tinymce.$(`${parentTag}#cypress-${id} .${childClass}`).each(function () {
            this.innerHTML = this.innerText;
        })
    },

    splitOnTag: function(bound, cutElement) {
        for (let parent = cutElement.parentNode; bound != parent; parent = grandparent) {
            let right = parent.cloneNode(false);
            while (cutElement.nextSibling)
                right.appendChild(cutElement.nextSibling);
            var grandparent = parent.parentNode;
            grandparent.insertBefore(right, parent.nextSibling);
            grandparent.insertBefore(cutElement, right);
        }
    },

    setContentOfSpan: function(childNodes) {
        for (let index = 0; index < childNodes.length; index++) {
            let innerNodes = childNodes[index].childNodes;
            if (innerNodes) {
                if (innerNodes.length) {
                    if (innerNodes.length > 1) {
                        this.setContentOfSpan(innerNodes);
                    } else {
                        if (innerNodes[0].tagName && !(innerNodes[0].id && innerNodes[0].id === '_mce_caret' && innerNodes[0].innerHTML === '')) {
                            this.setContentOfSpan(innerNodes);
                        } else {
                            childNodes[index].innerHTML = '<br/>';
                        }
                    }
                } else {
                    if (childNodes[index] && childNodes[index].tagName && childNodes[index].tagName.toLowerCase() !== 'img') {
                        childNodes[index].innerHTML = '<br/>';
                    }
                }
            }
        }
    },

    setContentOfBlankChild: function(childNodes) {
        for (let index = 0; index < childNodes.length; index++) {
            let innerNodes = childNodes[index].childNodes;
            if (innerNodes) {
                if (innerNodes.length) {
                    if (innerNodes.length > 1) {
                        this.setContentOfBlankChild(innerNodes);
                    } else {
                        if (innerNodes[0].tagName) {
                            if (!(innerNodes[0].id && innerNodes[0].id === '_mce_caret' && innerNodes[0].innerHTML === '')) {
                                this.setContentOfBlankChild(innerNodes);
                            } else {
                                if (childNodes[index].textContent === '') {
                                    childNodes[index].innerHTML = '&#65279;';
                                }
                            }
                        }
                    }
                } else {
                    if (childNodes[index] && childNodes[index].tagName && childNodes[index].tagName.toLowerCase() !== 'img' && childNodes[index].textContent === '') {
                        childNodes[index].innerHTML = '&#65279;';
                    }
                }
            }
        }
    },

    addAndSplitSpan: function(editor, elementId, parentTag, childClass) {
        let position = 'next';
        let elementSearch = editor.selection.getNode();
        if (editor.selection.getNode().tagName.toLowerCase() !== 'span' || editor.selection.getNode().className.toLowerCase() !== childClass) {
            elementSearch = editor.selection.getNode().closest(`.${childClass}`);
        }
        if (elementSearch && elementSearch.tagName.toLowerCase() === 'span' && ((childClass === 'poetryLine' && elementSearch.innerHTML != '<br>') || childClass === 'codeNoHighlightLine')) {
            editor.undoManager.transact(() => {
                let elm = editor.dom.create('span', { 'class': childClass }, '<br />');
                if (editor.selection.getRng().startOffset === 0) {
                    elementSearch.parentNode.insertBefore(elm, elementSearch);
                    editor.selection.setCursorLocation(elementSearch.previousSibling, 0);
                    if(elementSearch.innerHTML === '<br>') {
                        position = 'current';
                    } else {
                        position = 'previous';
                    }
                } else {
                    if (editor.selection.getContent() !== '' || editor.selection.getNode().tagName.toLowerCase() === 'img' || editor.selection.getNode().tagName.toLowerCase() === 'dfn' || editor.selection.getNode().tagName.toLowerCase() === 'abbr' || editor.selection.getNode().tagName.toLowerCase() === 'a') {
                        if (elementSearch.nextSibling) {
                            elementSearch.parentNode.insertBefore(elm, elementSearch.nextSibling)
                            editor.selection.setCursorLocation(elementSearch.nextSibling, 0);
                        } else {
                            elementSearch.parentNode.appendChild(elm);
                            editor.selection.setCursorLocation(elementSearch.nextSibling, 0);
                        }
                    } else {
                        editor.selection.setContent('<!--break-->');
                      	if (parentTag === 'code'){
                            elementSearch.innerHTML = String(elementSearch.innerHTML).replace(/ /g, '&nbsp;');
                        }
                        let comment = document.createNodeIterator(elementSearch.parentNode, NodeFilter.SHOW_COMMENT, null, true).nextNode();
                        this.splitOnTag(elementSearch.parentNode, comment);
                        elementSearch.nextSibling.remove();
                        let innerSpans = elementSearch.getElementsByTagName('span');
                        for (let index = 0; index < innerSpans.length; index++) {
                            let innerHtml = innerSpans[index].innerHTML;
                            innerSpans[index].outerHTML = innerHtml;
                        }
                        if (elementSearch.textContent.trim() == '') {
                            if (elementSearch.innerHTML == '') {
                                position = 'current';
                                elementSearch.innerHTML = '<br/>';
                            } else {
                                let childNodes = elementSearch.childNodes;
                                if (childNodes.length) {
                                    if (childNodes.length > 1) {
                                        this.setContentOfSpan(childNodes);
                                    } else {
                                        if (childNodes[0].tagName) {
                                            this.setContentOfSpan(childNodes);
                                        } else {
                                            elementSearch.innerHTML = '<br/>';
                                        }
                                    }
                                }
                            }
                        } else {
                            let childNodes = elementSearch.childNodes;
                            this.setContentOfBlankChild(childNodes)
                        }
                        innerSpans = elementSearch.getElementsByTagName('span');
                        for (let index = 0; index < innerSpans.length; index++) {
                            let innerHtml = innerSpans[index].innerHTML;
                            innerSpans[index].outerHTML = innerHtml;
                        }
                        let innerSpansSibling = elementSearch.nextSibling.getElementsByTagName('span');
                        for (let index = 0; index < innerSpansSibling.length; index++) {
                            let innerHtml = innerSpansSibling[index].innerHTML;
                            innerSpansSibling[index].outerHTML = innerHtml;
                        }
                        if (elementSearch.nextSibling.textContent.trim() == '') {
                            if (elementSearch.nextSibling.innerHTML == '') {
                                elementSearch.nextSibling.innerHTML = '<br/>';
                            } else {
                                let childNodes = elementSearch.nextSibling.childNodes;
                                if (childNodes.length) {
                                    if (childNodes.length > 1) {
                                        this.setContentOfSpan(childNodes);
                                    } else {
                                        if (childNodes[0].tagName) {
                                            this.setContentOfSpan(childNodes);
                                        } else {
                                            elementSearch.nextSibling.innerHTML = '<br/>';
                                        }
                                    }
                                }
                            }
                        } else {
                            let childNodes = elementSearch.nextSibling.childNodes;
                            this.setContentOfBlankChild(childNodes)
                        }
                        innerSpansSibling = elementSearch.nextSibling.getElementsByTagName('span');
                        for (let index = 0; index < innerSpansSibling.length; index++) {
                            let innerHtml = innerSpansSibling[index].innerHTML;
                            innerSpansSibling[index].outerHTML = innerHtml;
                        }
                        elementSearch.nextSibling.removeAttribute("data-id");
                        elementSearch.nextSibling.className = childClass;
                        elementSearch.innerHTML = elementSearch.innerHTML.replace(/^\s+|\s+$/g, '&nbsp;');
                        elementSearch.nextSibling.innerHTML = elementSearch.nextSibling.innerHTML.replace(/^\s+|\s+$/g, '&nbsp;');
                        editor.selection.setCursorLocation(elementSearch.nextSibling, 0);
                    }
                }
                this.handleExtraTags(elementId, parentTag, childClass);
                if (position === 'next') {
                    editor.selection.setCursorLocation(elementSearch.nextSibling, 0);
                } else if (position === 'previous') {
                    editor.selection.setCursorLocation(elementSearch.previousSibling, 0);
                } else if (position === 'current') {
                    editor.selection.setCursorLocation(elementSearch, 0);
                }
            });
        }
    }
}
