var _ = require("lodash");
const uuidV4 = require("uuid/v4");
import { utils, checkforToolbarClick, customEvent, spanHandlers, removeBOM  } from '../../src/js/utils.js';
import { JSDOM } from 'jsdom'
global.document = (new JSDOM()).window.Element;
var globalDiv = null;
global.tinymce = {
    $: () => {
        globalDiv = document.createElement("DIV");
        let htmlString = '<div><span class="poetryLine"><strong>Testing</strong></span><strong><span class="poetryLine">Testing</span></strong></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let span = htmlDoc.getElementsByTagName("span")[0];
        let spanSecond = htmlDoc.getElementsByTagName("span")[1];
        let boldTwo = htmlDoc.getElementsByTagName("strong")[1]
        globalDiv.appendChild(span);
        globalDiv.appendChild(boldTwo);
        return [span, spanSecond]
    }
};

describe('Utils file function testing', () => {
    it('Testing getMonthName function', () => {
        let result = utils.getMonthName(2, true)
        expect(result).toBe('Mar')

    })

    it('Testing getMonthName else function', () => {
        let result = utils.getMonthName(2, false);
        expect(result).toBe('March')

    })

    it('Testing getCommentFormatTime function', () => {
        let result = utils.getCommentFormatTime(2, 2);
        expect(result).toBe('02:02 AM')

    })

    it('Testing getCommentFormatTime function', () => {
        let result = utils.getCommentFormatTime(14, 2);
        expect(result).toBe('02:02 PM')

    })

    it('Testing getCommentFormatTime function', () => {
        let result = utils.getCommentFormatTime(12, 2);
        expect(result).toBe('12:02 PM')

    })

    xit('Testing buildCommentDate function', () => {
        let result = utils.buildCommentDate('2015-03-25')
        let finalResult = result.includes('Mar. 24, 2015');
        expect(finalResult).toEqual(false);
    })

    it('Testing toTitleCase function', () => {
        let result = utils.toTitleCase('2015-03-25')
        expect(result).toBe('2015-03-25')

    })

    it('Testing getTaxonomicType function', () => {
        let data = 'flashcards'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe(data)
    })

    it('Testing cite-interactive-slideshow-video param in taxonomic function', () => {
        let data = 'cite-interactive-video-with-interactive'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe("video-mcq")
    })

    it('Testing checkforToolbarClick function', () => {
        let classList = ["tox-tbtn", "tox-tbtn--select", "tox-split-button"];
        let format = checkforToolbarClick(classList);
        expect(format).toEqual(true)

    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-slideshow-image'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('gallery-image')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'guided-example'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('guided-example')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-slideshow-video'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('gallery-video')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-graph'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('graph')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-simulation'
        utils.getTaxonomicType(data)
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-survey'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('survey')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-timeline'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('timeline')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-fill-in-blank'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('fill-in-blank')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-multiple-choice'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('mcq')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-hotspot'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('hotspot')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-accounting-tables'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('accountingtable')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-video-with-interactive'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('video-mcq')
    })

    it('Testing getTaxonomicType function for default case', () => {
        let data = 'default'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('fpo')
    })

    it('Testing getTaxonomicFormat function', () => {
        let data = 'mmi'
        let type = utils.getTaxonomicFormat(data)
        expect(type).toBe(data)

    })

    it('Testing getTaxonomicFormat function', () => {
        let data = 'cite'
        let type = utils.getTaxonomicFormat(data);
        expect(type).toBe(data)

    })

    it('Testing getTaxonomicFormat function', () => {
        let data = 'tdx'
        let type = utils.getTaxonomicFormat(data);
        expect(type).toBe(data)
    })

    it('Testing customEvent subscribe function for else block', () => {
        customEvent.subscribe('Testing', 'Test');
        expect(customEvent.listeners).toEqual({ Testing: ['Test'] });
    })

    it('Testing customEvent subscribe function for if block', () => {
        customEvent.subscribe('Testing', 'Test Two');
        expect(customEvent.listeners).toEqual({ Testing: ['Test', 'Test Two'] });
    })

    it('Testing customEvent trigger function', () => {
        let eventValue = null;
        let listner = (args) => {
            eventValue = args;
        }
        customEvent.subscribe('fire', listner);
        customEvent.trigger('fire', 'test');
        expect(eventValue).toBe('test');
    })

    it('Testing customEvent unsubscribe function', () => {
        customEvent.unsubscribe('fire');
        expect(customEvent.listeners).toEqual({ Testing: ['Test', 'Test Two'], fire: [] });
    })

    it('Testing customEvent removeListenr function', () => {
        customEvent.removeListenr('fire');
        expect(customEvent.listeners).toEqual({ Testing: ['Test', 'Test Two'] });
    })

    it('Testing handleFormattingTags function', () => {
        let htmlString = '<div><span class="poetryLine"><strong>Testing</strong></span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let span = htmlDoc.getElementsByTagName("span")[0];
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getContent: () => {
                    //return '<span class="poetryLine">Testing</span>'
                },
                setRng: (range) => {

                },
                getNode: () => {
                    return {
                        tagName: 'STRONG',
                        isEqualNode: (args) => {
                            return true;
                        },
                        closest: (args) => {
                            return span;
                        }
                    }
                }
            }
        }
        let childNodes = [
            {
                tagName: 'SPAN'
            },
            {
                tagName: 'STRONG'
            }
        ]
        let range = {
            setStart: (mainParent, startOffSet) => {

            },
            setEnd: (mainParent, startOffSet) => {

            }
        }
        spanHandlers.handleFormattingTags(editor, 'testid', 'div', childNodes, 'poetryLine', range);
        expect(divTag.innerHTML).toEqual('<span class=\"poetryLine\"><strong>Testing</strong></span>');
    })

    it('Testing handleExtraTags function', () => {
        spanHandlers.handleExtraTags('testid', 'div', 'poetryLine');
        expect(JSON.stringify(globalDiv)).toEqual("{}");
    })

    it('Testing handleBackSpaceAndDeleteKyeDown function if element has no previousSibling for key 8', () => {
        let htmlString = '<div><span class="poetryLine"><strong>T</strong></span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let spanTag = htmlDoc.getElementsByTagName("span")[0];
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getRng: () => {
                    return {
                        startOffset: 1
                    }
                },
                getNode: () => {
                    return {
                        tagName: 'STRONG',
                        className: 'TEST',
                        closest: (args) => {
                            return spanTag;
                        }
                    }
                },
                setCursorLocation: () => {

                }
            },
            dom: {
                create: () => {
                    let span = htmlDoc.createElement("SPAN");
                    span.classList.add('poetryLine');
                    span.innerHTML = '<br/>';
                    return span;
                }
            }
        }
        spanHandlers.handleBackSpaceAndDeleteKyeDown(editor, 8, {}, 'poetryLine');
        expect(divTag.innerHTML).toEqual('<span class="poetryLine"><br></span>');
    })

    it('Testing handleBackSpaceAndDeleteKyeDown function if element has previousSibling for key 8', () => {
        let htmlString = '<div><span class="poetryLine"></span><span class="poetryLine"><strong>T</strong></span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let spanTag = htmlDoc.getElementsByTagName("span")[1];
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getRng: () => {
                    return {
                        startOffset: 1
                    }
                },
                getNode: () => {
                    return {
                        tagName: 'STRONG',
                        className: 'TEST',
                        closest: (args) => {
                            return spanTag;
                        }
                    }
                },
                setCursorLocation: () => {

                }
            },
            dom: {
                create: () => {
                    let span = htmlDoc.createElement("SPAN");
                    span.classList.add('poetryLine');
                    span.innerHTML = '<br/>';
                    return span;
                }
            }
        }
        spanHandlers.handleBackSpaceAndDeleteKyeDown(editor, 8, {}, 'poetryLine');
        expect(divTag.innerHTML).toEqual('<span class=\"poetryLine\">&nbsp;<span class=\"poetryLine\"><br></span></span>');
    })

    it('Testing handleBackSpaceAndDeleteKyeDown function if element has no previousSibling for key 46', () => {
        let htmlString = '<div><span class="poetryLine">T</span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let spanTag = htmlDoc.getElementsByTagName("span")[0];
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getRng: () => {
                    return {
                        startOffset: 1
                    }
                },
                getNode: () => {
                    return {
                        tagName: 'STRONG',
                        className: 'TEST',
                        closest: (args) => {
                            return spanTag;
                        }
                    }
                },
                setCursorLocation: () => {

                }
            },
            dom: {
                create: () => {
                    let span = htmlDoc.createElement("SPAN");
                    span.classList.add('poetryLine');
                    span.innerHTML = '<br/>';
                    return span;
                }
            }
        }
        spanHandlers.handleBackSpaceAndDeleteKyeDown(editor, 46, { preventDefault: () => { } }, 'poetryLine');
        expect(divTag.innerHTML).toEqual('<span class=\"poetryLine\"><br></span>');
    })

    it('Testing handleBackSpaceAndDeleteKyeDown function if element has previousSibling for key 46', () => {
        let htmlString = '<div><span class="poetryLine">T</span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let spanTag = htmlDoc.getElementsByTagName("span")[0];
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getRng: () => {
                    return {
                        startOffset: 1
                    }
                },
                getNode: () => {
                    return {
                        tagName: 'STRONG',
                        className: 'TEST',
                        closest: (args) => {
                            return spanTag;
                        }
                    }
                },
                setCursorLocation: () => {

                }
            },
            dom: {
                create: () => {
                    let span = htmlDoc.createElement("SPAN");
                    span.classList.add('poetryLine');
                    span.innerHTML = '<br/>';
                    return span;
                }
            }
        }
        spanHandlers.handleBackSpaceAndDeleteKyeDown(editor, 46, { preventDefault: () => { } }, 'poetryLine');
        expect(divTag.innerHTML).toEqual('<span class=\"poetryLine\"><br></span>');
    })

    it('Testing handleBackSpaceAndDeleteKyeUp function if element has no previousSibling for key 46', () => {
        let htmlString = '<div><span class="poetryLine">Testing<span>T</span><br></span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let spanTag = htmlDoc.getElementsByTagName("span")[0];
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getNode: () => {
                    return {
                        tagName: 'STRONG',
                        className: 'TEST',
                        closest: (args) => {
                            return spanTag;
                        }
                    }
                },
                setCursorLocation: () => {

                }
            }
        }
        spanHandlers.handleBackSpaceAndDeleteKyeUp(editor, 46, 'poetryLine');
        expect(divTag.innerHTML).toEqual('<span class=\"poetryLine\">TestingT</span>');
    })

    it('Testing handleRemoveFormattingOnSpan function', () => {
        let selection = {
            anchorNode: {
                parentNode: {
                    nodeName: 'SPAN',
                    classList: {
                        contains: () => {
                            return true;
                        }
                    },
                    innerHTML: 'Testing',
                    innerText: 'Test'
                },
                parentElement: {
                    tagName: 'SPAN',
                    parentNode: {
                        replaceChild: () => { }
                    }
                },
                className: 'poetryLine',
                nodeName: 'SPAN'
            }
        }
        let result = spanHandlers.handleRemoveFormattingOnSpan(selection, { preventDefault: () => { }, stopPropagation: () => { } }, 'div', 'poetryLine', 'abc');
        expect(result).toEqual(false);
    })

    it('Testing splitOnTag function', () => {
        let htmlString = '<p><strong>hi there, how <em>are <span>y<!--break-->ou</span> doing</em> today?</strong></p>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let p = htmlDoc.getElementsByTagName("p")[0];
        let comment = htmlDoc.createNodeIterator(p, NodeFilter.SHOW_COMMENT, null, true).nextNode();
        spanHandlers.splitOnTag(p, comment);
        expect(p.innerHTML).toEqual('<strong>hi there, how <em>are <span>y</span></em></strong><!--break--><strong><em><span>ou</span> doing</em> today?</strong>');
    })

    it('Testing setContentOfSpan function for single child', () => {
        let htmlString = '<p><span><strong><em></em></strong></span></p>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let childNodes = htmlDoc.getElementsByTagName("p")[0].childNodes;
        spanHandlers.setContentOfSpan(childNodes);
        expect(htmlDoc.getElementsByTagName("p")[0].innerHTML).toEqual('<span><strong><em><br></em></strong></span>');
    })

    it('Testing setContentOfSpan function for multiple child', () => {
        let htmlString = '<p><span><strong></strong><em></em></span></p>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let childNodes = htmlDoc.getElementsByTagName("p")[0].childNodes;
        spanHandlers.setContentOfSpan(childNodes);
        expect(htmlDoc.getElementsByTagName("p")[0].innerHTML).toEqual('<span><strong><br></strong><em><br></em></span>');
    })

    it('Testing setContentOfSpan function for unwanted text', () => {
        let htmlString = '<p><span><strong>&#65279;</strong><em><span id="_mce_caret"></span></em></span></p>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let childNodes = htmlDoc.getElementsByTagName("p")[0].childNodes;
        spanHandlers.setContentOfSpan(childNodes);
        expect(htmlDoc.getElementsByTagName("p")[0].innerHTML).toEqual('<span><strong><br></strong><em><br></em></span>');
    })

    it('Testing setContentOfBlankChild function for single child', () => {
        let htmlString = '<p><span><strong><em></em></strong></span></p>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let childNodes = htmlDoc.getElementsByTagName("p")[0].childNodes;
        spanHandlers.setContentOfBlankChild(childNodes);
        let innerHTML = htmlDoc.getElementsByTagName("p")[0].innerHTML;
        let pomString = encodeURI(innerHTML);
        pomString = pomString.replace(/%EF%BB%BF/g, '');
        innerHTML = decodeURI(pomString)
        expect(innerHTML).toEqual('<span><strong><em></em></strong></span>');
    })

    it('Testing setContentOfBlankChild function for multiple child', () => {
        let htmlString = '<p><span><strong></strong><em></em></span></p>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let childNodes = htmlDoc.getElementsByTagName("p")[0].childNodes;
        spanHandlers.setContentOfBlankChild(childNodes);
        let innerHTML = htmlDoc.getElementsByTagName("p")[0].innerHTML;
        let pomString = encodeURI(innerHTML);
        pomString = pomString.replace(/%EF%BB%BF/g, '');
        innerHTML = decodeURI(pomString)
        expect(innerHTML).toEqual('<span><strong></strong><em></em></span>');
    })

    it('Testing setContentOfBlankChild function for _mce_caret', () => {
        let htmlString = '<p><span><strong><span id="_mce_caret"></span></strong><em></em></span></p>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let childNodes = htmlDoc.getElementsByTagName("p")[0].childNodes;
        spanHandlers.setContentOfBlankChild(childNodes);
        let innerHTML = htmlDoc.getElementsByTagName("p")[0].innerHTML;
        let pomString = encodeURI(innerHTML);
        pomString = pomString.replace(/%EF%BB%BF/g, '');
        innerHTML = decodeURI(pomString)
        expect(innerHTML).toEqual('<span><strong></strong><em></em></span>');
    })

    it('Testing addAndSplitSpan function', () => {
        let htmlString = '<div><span class="poetryLine"><strong>Testing</strong></span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let strongTag = htmlDoc.getElementsByTagName("strong")[0];
        let editor = {
            selection: {
                getNode: () => {
                    return strongTag;
                }
            },
            undoManager: {
                transact: () => {

                }
            }
        }
        spanHandlers.addAndSplitSpan(editor, 'testid', 'div', 'poetryLine');
    })

    it('Testing performSplitOperation function for first position', () => {
        let htmlString = '<div><span class="poetryLine"><strong>Testing</strong></span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let strongTag = htmlDoc.getElementsByTagName("strong")[0];
        let spanTag = htmlDoc.getElementsByTagName("span")[0];
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getNode: () => {
                    return strongTag;
                },
                getRng: () => {
                    return {
                        startOffset : 0
                    }
                },
                setCursorLocation: () => {}
            },
            dom: {
                create: () => {
                    let newSpan = htmlDoc.createElement("SPAN");
                    newSpan.classList.add('poetryLine');
                    newSpan.innerHTML = "<br/>"
                    return newSpan;
                }
            }
            
        }
        spanHandlers.performSplitOperation(editor, 'testid', 'div', 'poetryLine', 'next', spanTag);
        expect(divTag.innerHTML).toEqual('<span class="poetryLine"><br></span><span class="poetryLine"><strong>Testing</strong></span>');
    })

    it('Testing performSplitOperation function for first position with br as innerHTML', () => {
        let htmlString = '<div><span class="poetryLine"><br></span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let spanTag = htmlDoc.getElementsByTagName("span")[0]
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getNode: () => {
                    return spanTag;
                },
                getRng: () => {
                    return {
                        startOffset : 0
                    }
                },
                setCursorLocation: () => {}
            },
            dom: {
                create: () => {
                    let newSpan = htmlDoc.createElement("SPAN");
                    newSpan.classList.add('poetryLine');
                    newSpan.innerHTML = "<br/>"
                    return newSpan;
                }
            }
            
        }
        spanHandlers.performSplitOperation(editor, 'testid', 'div', 'poetryLine', 'next', spanTag);
        expect(divTag.innerHTML).toEqual('<span class="poetryLine"><br></span><span class="poetryLine"><br></span>');
    })

    it('Testing performSplitOperation function for other  position without next sibling', () => {
        let htmlString = '<div><span class="poetryLine"><strong>Testing</strong></span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let strongTag = htmlDoc.getElementsByTagName("strong")[0];
        let spanTag = htmlDoc.getElementsByTagName("span")[0];
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getNode: () => {
                    return strongTag;
                },
                getRng: () => {
                    return {
                        startOffset : 1
                    }
                },
                setCursorLocation: () => {},
                getContent: () => {
                    return 'abc'
                }
            },
            dom: {
                create: () => {
                    let newSpan = htmlDoc.createElement("SPAN");
                    newSpan.classList.add('poetryLine');
                    newSpan.innerHTML = "<br/>"
                    return newSpan;
                }
            }
            
        }
        spanHandlers.performSplitOperation(editor, 'testid', 'div', 'poetryLine', 'next', spanTag);
        expect(divTag.innerHTML).toEqual('<span class="poetryLine"><strong>Testing</strong></span><span class="poetryLine"><br></span>');
    })

    it('Testing performSplitOperation function for other  position with next sibling', () => {
        let htmlString = '<div><span class="poetryLine"><strong>Testing</strong></span><span class="poetryLine">Test</span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let strongTag = htmlDoc.getElementsByTagName("strong")[0];
        let spanTag = htmlDoc.getElementsByTagName("span")[0];
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getNode: () => {
                    return strongTag;
                },
                getRng: () => {
                    return {
                        startOffset : 1
                    }
                },
                setCursorLocation: () => {},
                getContent: () => {
                    return 'abc'
                }
            },
            dom: {
                create: () => {
                    let newSpan = htmlDoc.createElement("SPAN");
                    newSpan.classList.add('poetryLine');
                    newSpan.innerHTML = "<br/>"
                    return newSpan;
                }
            }
            
        }
        spanHandlers.performSplitOperation(editor, 'testid', 'div', 'poetryLine', 'next', spanTag);
        expect(divTag.innerHTML).toEqual('<span class="poetryLine"><strong>Testing</strong></span><span class="poetryLine"><br></span><span class="poetryLine">Test</span>');
    })

    it('Testing performSplitOperation function for other  position containing span', () => {
        let htmlString = '<div><span class="poetryLine"><span><strong>Testing</strong></span></span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let strongTag = htmlDoc.getElementsByTagName("strong")[0];
        let spanTag = htmlDoc.getElementsByTagName("span")[0];
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getNode: () => {
                    return strongTag;
                },
                getRng: () => {
                    return {
                        startOffset : 1
                    }
                },
                setCursorLocation: () => {},
                getContent: () => {
                    return ''
                },
                setContent: () => {
                    let newComment = htmlDoc.createComment("break");
                    strongTag.appendChild(newComment);
                }
            },
            dom: {
                create: () => {
                    let newSpan = htmlDoc.createElement("SPAN");
                    newSpan.classList.add('poetryLine');
                    newSpan.innerHTML = "<br/>"
                    return newSpan;
                }
            }
            
        }
        spanHandlers.performSplitOperation(editor, 'testid', 'div', 'poetryLine', 'next', spanTag);
        expect(divTag.innerHTML).toEqual('<span class="poetryLine"><strong>Testing</strong></span><span class="poetryLine"><strong><br></strong></span>');
    })

    it('Testing performSplitOperation function for other  position with blank element', () => {
        let htmlString = '<div><span class="poetryLine"></span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let spanTag = htmlDoc.getElementsByTagName("span")[0];
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getNode: () => {
                    return spanTag;
                },
                getRng: () => {
                    return {
                        startOffset : 1
                    }
                },
                setCursorLocation: () => {},
                getContent: () => {
                    return ''
                },
                setContent: () => {
                    let newComment = htmlDoc.createComment("break");
                    spanTag.appendChild(newComment);
                }
            },
            dom: {
                create: () => {
                    let newSpan = htmlDoc.createElement("SPAN");
                    newSpan.classList.add('poetryLine');
                    newSpan.innerHTML = "<br/>"
                    return newSpan;
                }
            }
            
        }
        spanHandlers.performSplitOperation(editor, 'testid', 'div', 'poetryLine', 'next', spanTag);
        expect(divTag.innerHTML).toEqual('<span class="poetryLine"><br></span><span class="poetryLine"><br></span>');
    })

    it('Testing performSplitOperation function for other  position with multi child', () => {
        let htmlString = '<div><span class="poetryLine"><em></em><strong></strong></span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let spanTag = htmlDoc.getElementsByTagName("span")[0];
        let strongTag = htmlDoc.getElementsByTagName("strong")[0];
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getNode: () => {
                    return strongTag;
                },
                getRng: () => {
                    return {
                        startOffset : 1
                    }
                },
                setCursorLocation: () => {},
                getContent: () => {
                    return ''
                },
                setContent: () => {
                    let newComment = htmlDoc.createComment("break");
                    strongTag.appendChild(newComment);
                }
            },
            dom: {
                create: () => {
                    let newSpan = htmlDoc.createElement("SPAN");
                    newSpan.classList.add('poetryLine');
                    newSpan.innerHTML = "<br/>"
                    return newSpan;
                }
            }
            
        }
        spanHandlers.performSplitOperation(editor, 'testid', 'div', 'poetryLine', 'next', spanTag);
        expect(divTag.innerHTML).toEqual('<span class=\"poetryLine\"><em><br></em><strong><br></strong></span><span class=\"poetryLine\"><strong><br></strong></span>');
    })

    it('Testing performSplitOperation function for other  position with one child', () => {
        let htmlString = '<div><span class="poetryLine"><strong></strong></span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let spanTag = htmlDoc.getElementsByTagName("span")[0];
        let strongTag = htmlDoc.getElementsByTagName("strong")[0];
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getNode: () => {
                    return strongTag;
                },
                getRng: () => {
                    return {
                        startOffset : 1
                    }
                },
                setCursorLocation: () => {},
                getContent: () => {
                    return ''
                },
                setContent: () => {
                    let newComment = htmlDoc.createComment("break");
                    strongTag.appendChild(newComment);
                }
            },
            dom: {
                create: () => {
                    let newSpan = htmlDoc.createElement("SPAN");
                    newSpan.classList.add('poetryLine');
                    newSpan.innerHTML = "<br/>"
                    return newSpan;
                }
            }
            
        }
        spanHandlers.performSplitOperation(editor, 'testid', 'div', 'poetryLine', 'next', spanTag);
        expect(divTag.innerHTML).toEqual('<span class=\"poetryLine\"><strong><br></strong></span><span class=\"poetryLine\"><strong><br></strong></span>');
    })

    it('Testing performSplitOperation function for other  position with unwanted text', () => {
        let htmlString = '<div><span class="poetryLine">&#65279;</span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let spanTag = htmlDoc.getElementsByTagName("span")[0];
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getNode: () => {
                    return spanTag;
                },
                getRng: () => {
                    return {
                        startOffset : 1
                    }
                },
                setCursorLocation: () => {},
                getContent: () => {
                    return ''
                },
                setContent: () => {
                    let newComment = htmlDoc.createComment("break");
                    spanTag.appendChild(newComment);
                }
            },
            dom: {
                create: () => {
                    let newSpan = htmlDoc.createElement("SPAN");
                    newSpan.classList.add('poetryLine');
                    newSpan.innerHTML = "<br/>"
                    return newSpan;
                }
            }
            
        }
        spanHandlers.performSplitOperation(editor, 'testid', 'div', 'poetryLine', 'next', spanTag);
        expect(divTag.innerHTML).toEqual('<span class=\"poetryLine\"><br></span><span class=\"poetryLine\"><br></span>');
    })

    it('Testing performSplitOperation function for other  position with two child in next child', () => {
        let htmlString = '<div><span class="poetryLine"><strong></strong><em></em></span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let spanTag = htmlDoc.getElementsByTagName("span")[0];
        let strongTag = htmlDoc.getElementsByTagName("strong")[0];
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getNode: () => {
                    return strongTag;
                },
                getRng: () => {
                    return {
                        startOffset : 1
                    }
                },
                setCursorLocation: () => {},
                getContent: () => {
                    return ''
                },
                setContent: () => {
                    let newComment = htmlDoc.createComment("break");
                    strongTag.appendChild(newComment);
                }
            },
            dom: {
                create: () => {
                    let newSpan = htmlDoc.createElement("SPAN");
                    newSpan.classList.add('poetryLine');
                    newSpan.innerHTML = "<br/>"
                    return newSpan;
                }
            }
            
        }
        spanHandlers.performSplitOperation(editor, 'testid', 'div', 'poetryLine', 'next', spanTag);
        expect(divTag.innerHTML).toEqual('<span class=\"poetryLine\"><strong><br></strong></span><span class=\"poetryLine\"><strong><br></strong><em><br></em></span>');
    })

    it('Testing performSplitOperation function for other  position with unwanted text in next element', () => {
        let htmlString = '<div><span class="poetryLine">&#65279;</span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let spanTag = htmlDoc.getElementsByTagName("span")[0];
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getNode: () => {
                    return spanTag;
                },
                getRng: () => {
                    return {
                        startOffset : 1
                    }
                },
                setCursorLocation: () => {},
                getContent: () => {
                    return ''
                },
                setContent: () => {
                    let newComment = htmlDoc.createComment("break");
                    spanTag.insertBefore(newComment, spanTag.childNodes[0]);
                }
            },
            dom: {
                create: () => {
                    let newSpan = htmlDoc.createElement("SPAN");
                    newSpan.classList.add('poetryLine');
                    newSpan.innerHTML = "<br/>"
                    return newSpan;
                }
            }
            
        }
        spanHandlers.performSplitOperation(editor, 'testid', 'div', 'poetryLine', 'next', spanTag);
        expect(divTag.innerHTML).toEqual('<span class=\"poetryLine\"><br></span><span class=\"poetryLine\"><br></span>');
    })

    it('Testing performSplitOperation function for other  position with text in next child', () => {
        let htmlString = '<div><span class="poetryLine">Test</span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let spanTag = htmlDoc.getElementsByTagName("span")[0];
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        let editor = {
            selection: {
                getNode: () => {
                    return spanTag;
                },
                getRng: () => {
                    return {
                        startOffset : 1
                    }
                },
                setCursorLocation: () => {},
                getContent: () => {
                    return ''
                },
                setContent: () => {
                    let newComment = htmlDoc.createComment("break");
                    spanTag.insertBefore(newComment, spanTag.childNodes[0]);
                }
            },
            dom: {
                create: () => {
                    let newSpan = htmlDoc.createElement("SPAN");
                    newSpan.classList.add('poetryLine');
                    newSpan.innerHTML = "<br/>"
                    return newSpan;
                }
            }
            
        }
        spanHandlers.performSplitOperation(editor, 'testid', 'div', 'poetryLine', 'next', spanTag);
        expect(divTag.innerHTML).toEqual('<span class=\"poetryLine\"><br></span><span class=\"poetryLine\">Test</span>');
    })

    it('Testing performSplitOperation function for other  position with text in next child for code', () => {
        let htmlString = '<code><span class="codeNoHighlightLine">Test</span></code>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');
        let spanTag = htmlDoc.getElementsByTagName("span")[0];
        let codeTag = htmlDoc.getElementsByTagName("code")[0];
        let editor = {
            selection: {
                getNode: () => {
                    return spanTag;
                },
                getRng: () => {
                    return {
                        startOffset : 1
                    }
                },
                setCursorLocation: () => {},
                getContent: () => {
                    return ''
                },
                setContent: () => {
                    let newComment = htmlDoc.createComment("break");
                    spanTag.insertBefore(newComment, spanTag.childNodes[0]);
                }
            },
            dom: {
                create: () => {
                    let newSpan = htmlDoc.createElement("SPAN");
                    newSpan.classList.add('codeNoHighlightLine');
                    newSpan.innerHTML = "<br/>"
                    return newSpan;
                }
            }
            
        }
        spanHandlers.performSplitOperation(editor, 'testid', 'code', 'codeNoHighlightLine', 'next', spanTag);
        expect(codeTag.innerHTML).toEqual('<span class=\"codeNoHighlightLine\"><br></span><span class=\"codeNoHighlightLine\">Test</span>');
    })

    it('Testing removeBOM function', () => {
        let htmlString = '<div><span class="poetryLine">&#65279;</span></div>';
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(htmlString, 'text/html');;
        let divTag = htmlDoc.getElementsByTagName("div")[0];
        divTag.innerHTML = removeBOM(divTag.innerHTML);
        expect(divTag.innerHTML).toEqual('<span class="poetryLine"></span>');
    })

});