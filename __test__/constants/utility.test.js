import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import {utility,matchHTMLwithRegex, encodeHTMLInWiris, checkHTMLdataInsideString, dropdownValueAtIntialize, requestConfigURI, sendDataToIframe, guid, hasProjectPermission, hasReviewerRole, getTitleSubtitleModel, createTitleSubtitleModel, createLabelNumberTitleModel, getLabelNumberTitleHTML, removeBlankTags, removeUnoClass, getSlateType, replaceWirisClassAndAttr, getShowhideChildUrns, removeClassesFromHtml, prepareDialogueDom,labelValueForFiguretype,labelValue,Table, Equation , Exhibit,dropdownValueForFiguretype,dropdownList,subtype,preformattedtext,mathml,image,tableasmarkup, getCookieByName, handleTextToRetainFormatting, showNotificationOnCanvas} from '../../src/constants/utility.js';
import cypressConfig from '../../src/config/cypressConfig';
import { newFigureObj, textRetainObject } from '../../fixtures/ElementFigureTestingData.js';
import { showHide } from '../../fixtures/ElementSHowHideData';



describe('Testing Function - matchHTMLwithRegex', () => {
    xit('Case 1- with Html - false',()=>{
        let htmlData = <img align="middle" class="temp_Wirisformula" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAPCAYAAACSol3eAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAABGJhU0UAAAAOJ5y/mQAAAZpJREFUeNpjYMAOyoD4BBBvAeJjQDwBiDkZBiFQAWIuJD7IoUupbAcjLRzOC8SfgVidgDozIP4PxKZEmHkaqpYQPkmqY0EacgmoWQjEB4B4ARHmJUDV4wMgcxJJdehGIJ6ER14EiJ8AsRAQPwViYQLmcUDV41InDDWHk1AUtkHT5SRoVK4B4kV49IAyYBeU3QPEpUR4vhuqD5d53fjS4mogng3EWlBfBwHxByC+BcRzcehjBuI7QKwE5StD+UwEHKqEQx2IfxvJPAywF4jnYRGvhibsRhz6fKBFGTLYBsReRIQqSJ03mhiIvxWXBk8g/gXEsljkYqEOdcNjmRcRjscGsDkKm+PhoB+Ir+CQqwLiF0DMgkVOGRpNTASSAy7AhKZOiVCyWYonBA7iSfSgjFOCJ0N0EhGqyBmxm1BGBIXobizioCi9DM1Y6ICTQBEDK7I4CDhUGKpOkIB5YGADxO+BmAcpSuKB+AKe6EvEkfnQK4E4IkJ1AbSymE9MoV4AzfmrgHgHENdCiyxc4BQVq0FTEqpfmgFmSg0AAMaKY79jtweTAAAAcnRFWHRNYXRoTUwAPG1hdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwiPjxtbz4mI3gyMjAyOzwvbW8+PG1vPiYjeDIyMDY7PC9tbz48bW8+JiN4MjIwNzs8L21vPjwvbWF0aD4AQV47AAAAAElFTkSuQmCC" data-temp-mathml="«math xmlns=¨http://www.w3.org/1998/Math/MathML¨»«mo»§#8706;«/mo»«mo»§#8710;«/mo»«mo»§#8711;«/mo»«/math»" alt="partial differential increment nabla" role="math" style="max-width: none;" height="19" width="42"></img>
        let expectedData = false;
        let returnData = matchHTMLwithRegex(htmlData);
        expect(returnData).toBe(expectedData);
    })
    it('Case 2- without Html',()=>{
        let htmlData = ""
        let expectedData = false;
        let returnData = matchHTMLwithRegex(htmlData);

        expect(returnData).toBe(expectedData);
    })
    xit('Case 3- with Html - true',()=>{
        let htmlData = "<p></p>"
        let expectedData = true;
        let returnData = matchHTMLwithRegex(htmlData);

        expect(returnData).toBe(expectedData);
    })

})

describe('Testing Function - encodeHTMLInWiris', () => {
    it('Case 1- When Wiris content is present',()=>{
        let strData = '<p><img align="middle" class="temp_Wirisformula" src="data:image/png;base64,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" data-temp-mathml="«math xmlns=¨http://www.w3.org/1998/Math/MathML¨ class=¨¨»«mi»m«/mi»«mi»a«/mi»«mi»t«/mi»«mi»h«/mi»«mi»M«/mi»«mi»L«/mi»«mo»&amp;nbsp;«/mo»«mi»t«/mi»«mi»e«/mi»«mi»x«/mi»«mi»t«/mi»«mo»-«/mo»«mi mathvariant=¨normal¨»π«/mi»«mo»∞«/mo»«mo»∅«/mo»«mo»∆«/mo»«mo»∂«/mo»«/math»" alt="m a t h M L space t e x t minus straight pi infinity empty set increment partial differential" role="math"></p>'
        let expectedData = '<p><img align="middle" class="temp_Wirisformula" src="data:image/png;base64,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" data-temp-mathml="«math xmlns=¨http://www.w3.org/1998/§#924;ath/§#924;ath§#924;L¨ class=¨¨»«mi»m«/mi»«mi»a«/mi»«mi»t«/mi»«mi»h«/mi»«mi»§#924;«/mi»«mi»L«/mi»«mo»§#160;«/mo»«mi»t«/mi»«mi»e«/mi»«mi»x«/mi»«mi»t«/mi»«mo»-«/mo»«mi mathvariant=¨normal¨»§#960;«/mi»«mo»§#8734;«/mo»«mo»§#8709;«/mo»«mo»∆«/mo»«mo»§#8706;«/mo»«/math»"  role="math"></p>';
        let returnData = encodeHTMLInWiris(strData);

        expect(returnData).toBe(expectedData);
    })
    it('Case 2- When Wiris content is  not present',()=>{
        let strData = '<p>fdsdfsf</p>'
        let expectedData = '<p>fdsdfsf</p>';
        let returnData = encodeHTMLInWiris(strData);

        expect(returnData).toBe(expectedData);
    })
    it('Case 3- When str is blank',()=>{
        let strData = ''
        let expectedData = undefined;
        let returnData = encodeHTMLInWiris(strData);

        expect(returnData).toBe(expectedData);
    })
})

describe('Testing Function - checkHTMLdataInsideString', () => {
    it('Case 1', () => {
        let str = `<p>test string</p>`;
        let result = checkHTMLdataInsideString(str);
        expect(result).toBe('test string');
    })
    it('Case 2', () => {
        let str = `<p><br></p>`;
        let result = checkHTMLdataInsideString(str);
        expect(result).toBe('');
    })
})

describe('Testing Function - dropdownValueAtIntialize', () => {
    it('Case 1', () => {
        const dropdownData = ['figure', 'table', 'equation'];
        let formattedLabel = `<p>figure</p>`;
        let result = dropdownValueAtIntialize(dropdownData, formattedLabel);
        expect(result).toBe('Figure');
    })
    it('Case 2', () => {
        const dropdownData = ['figure', 'table', 'equation'];
        let formattedLabel = `<p></p>`;
        let result = dropdownValueAtIntialize(dropdownData, formattedLabel);
        expect(result).toBe('No Label');
    })
    it('Case 3', () => {
        const dropdownData = ['figure', 'table', 'equation'];
        let formattedLabel = `<p>test String</p>`;
        let result = dropdownValueAtIntialize(dropdownData, formattedLabel);
        expect(result).toBe('Custom');
    })
})

describe('Testing Function - requestConfigURI', () => {
    it('Case 1', () => {
        process.env = {
            NODE_ENV: "development"
        }
        let result = requestConfigURI(process);
        expect(result).toBe('dev');
    })
    it('Case 2 conditional coverage', () => {
        process.env = {
            NODE_ENV: "prod"
        }
        cypressConfig.prodUrl = "http://localhost";
        let result = requestConfigURI();
        expect(result).toBe('prod');
    })
    it('Case 3 conditional coverage', () => {
        process.env = {
            NODE_ENV: "prod"
        }
        cypressConfig.prodUrl = "structuredauthoring.pearson.com";
        let result = requestConfigURI();
        expect(result).toBe('localhost');
    })
})

describe('Testing Function - sendDataToIframe', () => {
    it('Case 1', () => {
        let messageObj = {
            type: 'ShowLoader'
        }
        let result = sendDataToIframe(messageObj);
        expect(result).toBe(undefined);
    })
})

describe('Testing Function - guid', () => {
    it('Case 1', () => {
        let result = guid();
        expect(result).toBeTruthy()
    })
    it('Case 2 Conditional converage', () => {
        window.crypto = undefined;
        window.msCrypto = {
            getRandomValues: jest.fn(() => {
                return [ 12, 23, 34 ]
            })
        }
        let result = guid();
        expect(result).toBeTruthy()
    })
})

describe('Testing Function - hasProjectPermission', () => {
    it('Case 1', () => {
        let result = hasProjectPermission('comment_only');
        expect(result).toBe(false);
    })
})

describe('Testing Function - hasReviewerRole', () => {
    it('Case 1', () => {
        let result = hasReviewerRole('comment_only');
        expect(result).toBe(true);
    })
    it('Case 2 conditional coverage', () => {
        let result = hasReviewerRole();
        expect(result).toBe(false);
    })
})

describe('Testing Function - getTitleSubtitleModel', () => {
    it('Case 1 label part', () => {
        let model = `<p><label>title text</label><number>number text</number>subtitle text</p>`
        let result = getTitleSubtitleModel(model, 'formatted-title', 'figure');
        expect(result).toBe("<p class=\"paragraphNumeroUno\">title text</p>");
    })
    it('Case 2 number part', () => {
        let model = `<p><number>number text</number>subtitle text</p>`
        let result = getTitleSubtitleModel(model, 'formatted-number', 'figure');
        expect(result).toBe("<p class=\"paragraphNumeroUno\">number text</p>");
    })
    it('Case 3 number part conditional coverage', () => {
        let model = `<p><label>title text</label><number>number text</number>subtitle text</p>`
        let result = getTitleSubtitleModel(model, 'formatted-number', 'figure');
        expect(result).toBe("<p class=\"paragraphNumeroUno\">number text</p>");
    })
    it('Case 4 subtitle part conditional coverage', () => {
        let model = `<p><label>title text</label><number>number text</number>subtitle text</p>`
        let result = getTitleSubtitleModel(model, 'formatted-subtitle', 'figure');
        expect(result).toBe("<p class=\"paragraphNumeroUno\">subtitle text</p>");
    })
    it('Case 5 else case conditional coverage', () => {
        let model = `<p><label>title text</label><number>number text</number>subtitle text</p>`
        let result = getTitleSubtitleModel(model, {}, 'figure');
        expect(result).toBe("<p class=\"paragraphNumeroUno\"><br/></p>");
    })
    it('Case 6 conditional coverage', () => {
        // let model = `<p><label>title text</label><number>number text</number>subtitle text</p>`
        let result = getTitleSubtitleModel();
        expect(result).toBe(undefined);
    })
    it('Case 7 subtitle part conditional coverage of removeTagsforSubTitle', () => {
        let model = `<p><label>title text</label><number>number text</number>subtitle text</p>`
        let result = getTitleSubtitleModel(model, 'formatted-subtitle', 'popup');
        expect(result).toBe("<p class=\"paragraphNumeroUno\"><number>number text</number>subtitle text</p>");
    })
})

describe('Testing Function - createTitleSubtitleModel', () => {
    it('Case 1', () => {
        let result = createTitleSubtitleModel('title text', 'subtitle text');
        expect(result).toBe('<p><label>title text&nbsp;</label>subtitle text</p>');
    })
    it('Case 2 conditional coverage', () => {
        let result = createTitleSubtitleModel('', 'subtitle text');
        expect(result).toBe('<p>subtitle text</p>');
    })
})

describe('Testing Function - createLabelNumberTitleModel', () => {
    it('Case 1', () => {
        let result = createLabelNumberTitleModel('title text', 'number text', 'subtitle text');
        expect(result).toBe("<p><label>title text&nbsp;</label><number>number text&nbsp;</number>subtitle text</p>");
    })
    it('Case 2 conditional coverage', () => {
        let result = createLabelNumberTitleModel('title text', '', 'subtitle text');
        expect(result).toBe("<p><label>title text&nbsp;</label>subtitle text</p>");
    })
    it('Case 3 conditional coverage', () => {
        let result = createLabelNumberTitleModel('', 'number text', 'subtitle text');
        expect(result).toBe("<p><number>number text&nbsp;</number>subtitle text</p>");
    })
    it('Case 4 conditional coverage', () => {
        let result = createLabelNumberTitleModel('', '', 'subtitle text');
        expect(result).toBe('<p>subtitle text</p>');
    })
})

xdescribe('Testing Function - getLabelNumberTitleHTML', () => {
    let figureObj = newFigureObj;
    it('Case 1', () => {
        let result = getLabelNumberTitleHTML(figureObj);
        expect(result).toStrictEqual({"formattedLabel": "<p class=\"paragraphNumeroUno\">Equation</p>", "formattedNumber": "<p class=\"paragraphNumeroUno\">12</p>", "formattedTitle": "<p class=\"paragraphNumeroUno\">title</p>"});
    })
    it('Case 2', () => {
        figureObj = {
            ...figureObj,
            figuretype: 'video',
            title: {
                ...figureObj.title,
                replace: jest.fn()
            },
            subtitle: {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "Equation 12 title",
                replace: jest.fn()
            },
            html: {
                ...figureObj.html,
                "subtitle": "<p><label>Equation&nbsp;</label><number>12&nbsp;</number>title</p>",
            }
        }
        let result = getLabelNumberTitleHTML(figureObj);
        expect(result).toStrictEqual({"formattedLabel": "<p class=\"paragraphNumeroUno\"><label>Equation</label><number>12</number>title</p>", "formattedNumber": "<p class=\"paragraphNumeroUno\">Equation</p>", "formattedTitle": "<p class=\"paragraphNumeroUno\">title</p>"});
    })
    it('Case 3 conditional coverage', () => {
        figureObj = {
            ...figureObj,
            figuretype: 'video',
            subtitle: {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "Equation 12 title",
                replace: jest.fn()
            },
            html: {
                ...figureObj.html,
                "subtitle": "<p><label>Equation&nbsp;</label><number>12&nbsp;</number>title</p>",
            }
        }
        figureObj.hasOwnProperty('title') ? delete figureObj.title : figureObj;
        let result = getLabelNumberTitleHTML(figureObj);
        expect(result).toStrictEqual({"formattedLabel": "<p class=\"paragraphNumeroUno\">Equation</p>", "formattedNumber": "<p class=\"paragraphNumeroUno\">12</p>", "formattedTitle": "<p class=\"paragraphNumeroUno\">title</p>"});
    })
    it('Case 4 conditional coverage', () => {
        figureObj = {
            ...figureObj,
            figuretype: 'video',
            html: {
                ...figureObj.html,
                "subtitle": "<p><label>Equation&nbsp;</label><number>12&nbsp;</number>title</p>",
            }
        }
        figureObj.hasOwnProperty('subtitle') ? delete figureObj.subtitle : figureObj;
        let result = getLabelNumberTitleHTML(figureObj);
        expect(result).toStrictEqual({"formattedLabel": "<p class=\"paragraphNumeroUno\">Equation</p>", "formattedNumber": "<p class=\"paragraphNumeroUno\">12</p>", "formattedTitle": "<p class=\"paragraphNumeroUno\">title</p>"});
    })
    it('Case 5 conditional coverage', () => {
        figureObj = {
            ...figureObj,
            figuretype: 'image',
            subtitle: {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "Equation 12 title",
            },
            html: {
                ...figureObj.html,
                "subtitle": "<p><label>Equation&nbsp;</label><number>12&nbsp;</number>title</p>",
            }
        }
        let result = getLabelNumberTitleHTML(figureObj);
        expect(result).toStrictEqual({"formattedLabel": "<p class=\"paragraphNumeroUno\"><label>Equation</label><number>12</number>title</p>", "formattedNumber": "<p class=\"paragraphNumeroUno\">Equation</p>", "formattedTitle": "<p class=\"paragraphNumeroUno\">title</p>"});
    })
    it('Case 6 conditional coverage', () => {
        figureObj = {
            ...figureObj,
            figuretype: 'image',
        }
        figureObj.hasOwnProperty('subtitle') ? delete figureObj.subtitle : figureObj;
        let result = getLabelNumberTitleHTML(figureObj);
        expect(result).toStrictEqual({"formattedLabel": "<p class=\"paragraphNumeroUno\"><label>Equation</label><number>12</number>title</p>", "formattedNumber": "<p class=\"paragraphNumeroUno\">Equation</p>", "formattedTitle": "<p class=\"paragraphNumeroUno\">title</p>"});
    })
})

describe('Testing Function - removeBlankTags', () => {
    it('Case 1', () => {
        let htmlData = "<p><label>title text&nbsp;</label><number>number text&nbsp;</number>subtitle text</p>";
        let result = removeBlankTags(htmlData);
        expect(result).toBe("<p><label>title text&nbsp;</label><number>number text&nbsp;</number>subtitle text</p>");
    })
})

describe('Testing Function - removeUnoClass', () => {
    it('Case 1', () => {
        let htmlData = '<h4 id="cypress-0-2" class="heading4VideoTitle figureTitle cypress-editable mce-edit-focus">xdxfd<strong>xf ,m,mmmmm&nbsp; &nbsp;</strong></h4>';
        let result = removeUnoClass(htmlData);
        expect(result).toBe("<h4 id=\"cypress-0-2\">xdxfd<strong>xf ,m,mmmmm&nbsp; &nbsp;</strong></h4>");
    })
    it('Case 2 catch block', () => {
        let htmlData = '<h4 id="cypress-0-2">xdxfd<strong>xf ,m,mmmmm&nbsp; &nbsp;</strong></h4>';
        let result = removeUnoClass(htmlData);
        expect(result).toBe("<h4 id=\"cypress-0-2\">xdxfd<strong>xf ,m,mmmmm&nbsp; &nbsp;</strong></h4>");
    })
})

describe('Testing Function - getSlateType', () => {
    it('Case 1', () => {
        let slateObj = {
            type: 'pdf'
        }
        let result = getSlateType(slateObj);
        expect(result).toBe("pdf");
    })
})

describe('Testing Function - replaceWirisClassAndAttr', () => {
    it('Case 1', () => {
        document.getElementById = () => {
            return {
                innerHTML: "<div>blockquote</div>",
                replace: () => { }
            }
        }
        let result = replaceWirisClassAndAttr();
        expect(result).toBe(undefined);
    })
    it('Case 2', () => {
        document.getElementById = () => {
            return {
                innerHTML: undefined,
                replace: () => { }
            }
        }
        let result = replaceWirisClassAndAttr();
        expect(result).toBe(undefined);
    })
})

describe('Testing Function - getShowhideChildUrns', () => {
    xit('Case 1', () => {
        let result = getShowhideChildUrns(showHide);
        expect(result).toStrictEqual(["urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c", "urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa38362", "urn:pearson:work:2b9dde07-1771-488a-b9f1-010af4a8961a", "urn:pearson:work:50994dd9-c556-415f-bee2-57fc4c4fb032"]);
    })
    xit('Case 2', () => {
        let newShowHide = delete showHide.interactivedata;
        let result = getShowhideChildUrns(newShowHide);
        expect(result).toStrictEqual(undefined);
    })
})

describe('Testing Function - removeClassesFromHtml', () => {
    xit('Case 1', () => {
        let htmlData = "<p class='testing class'>blockquote</p>"
        let result = removeClassesFromHtml(htmlData);
        expect(result).toBe("<p>blockquote</p>");
    })
})

describe('Testing Function - prepareDialogueDom', () => {
    it('Case 1', () => {
        let model = {
            replace: () => { }
        }
        let result = prepareDialogueDom(model);
        expect(result).toBe("<span class=\"dialogueLine\"><br /></span>");
    })
})
describe('-----Testing Function  labelValueForFiguretype ------------', () => {
    it('should return the tableasmarkup, figure element', () => {
        const labelValue = ['Table', 'Equation', 'Exhibit'];
        const element = { figuretype: 'tableasmarkup', element: "Table" };
        expect(labelValueForFiguretype(element)).toEqual("Table");
    });
    it('should return the authoredtext, figure element', () => {
        const labelValue = ['Table', 'Equation', 'Exhibit'];
        const element = { figuretype: 'authoredtext', element: "Equation" };
        expect(labelValueForFiguretype(element)).toEqual("Equation");
    });
    it('should return the codelisting, figure element', () => {
        const labelValue = ['Table', 'Equation', 'Exhibit'];
        const element = { figuretype: 'codelisting', element: "Exhibit" };
        expect(labelValueForFiguretype(element)).toEqual("Exhibit");
    });
    it('should return the "image", "mathImage" ,table" figure element', () => {
        const labelValue = ['Table', 'Equation', 'Exhibit', 'No Label'];
        const element = { figuretype: 'image' || 'mathImage' || 'table', element: "No Label" };
        expect(labelValueForFiguretype(element)).toEqual("No Label");
    });
});
describe('-----Testing Function  dropdownValueForFiguretype ------------', () => {
    const figureDropdownData = {
        tableasmarkup: ["No Label", 'Table', "Custom"],
        mathml: ["No Label", "Equation", "Custom"],
        preformattedtext: ["No Label", "Exhibit", "Custom"],
        image: ["No Label", "Figure", "Table", "Equation", "Custom"]
    }
    it('Case 1', () => {
        const dropdownList = ["No Label", 'Table', "Custom"];
        const subtype = ['image', 'mathml', 'preformattedtext', 'tableasmarkup']
        const element = { figuretype: 'tableasmarkup', element: "Equation" };
        expect(dropdownValueForFiguretype(element, figureDropdownData)).toEqual(["No Label", 'Table', "Custom"]);

    })
    it('Case 2', () => {
        const dropdownList = ["No Label", "Equation", "Custom"];
        const subtype = ['image', 'mathml', 'preformattedtext', 'tableasmarkup']
        const element = { figuretype: 'authoredtext' };
        expect(dropdownValueForFiguretype(element, figureDropdownData)).toEqual(["No Label", "Equation", "Custom"]);

    })
    it('Case 3', () => {
        const dropdownList = ["No Label", "Exhibit", "Custom"];
        const subtype = ['image', 'mathml', 'preformattedtext', 'tableasmarkup']
        const element = { figuretype: 'codelisting' };
        expect(dropdownValueForFiguretype(element, figureDropdownData)).toEqual(["No Label", "Exhibit", "Custom"]);

    })
    it('Case 4', () => {
        const dropdownList = ["No Label", "Figure", "Table", "Equation", "Custom"];
        const subtype = ['image', 'mathml', 'preformattedtext', 'tableasmarkup']
        const element = { figuretype: 'image' || 'mathImage' || 'table' };
        expect(dropdownValueForFiguretype(element, figureDropdownData)).toEqual(["No Label", "Figure", "Table", "Equation", "Custom"]);

    })
    it('Case 1 for getCookieByName function', () => {
        document.cookie = "DISABLE_DELETE_WARNINGS"; 
        expect(getCookieByName(document.cookie)).toBe(null);
      })
});

describe('Testing Function - showNotificationOnCanvas', () => {
    it("Case 1", () => {
      document.getElementById = () => {
        return {
          innerHTML: '<div id="link-notification"></div>',
          innerText: "Show Notification",
          style: {
            display: "block",
          },
        };
      };
      let result = showNotificationOnCanvas();
      expect(result).toBe(undefined);
    });
    it("Case 2", () => {
      document.getElementById = () => {
        return {
          innerHTML: '<div id=""></div>',
          innerText: "",
          style: {
            display: "",
          },
        };
      };
      let result = showNotificationOnCanvas();
      expect(result).toBe(undefined);
    });
})

describe('Testing Function - handleTextToRetainFormatting', () => {
    it('Case 1', () => {
        let htmlData = "<u>Why</u> do we use it? It is a long <strong><em><u>established</u></em></strong> fact that a <strong><em><s>reader</s></em></strong> will be <sup>distracted</sup> by the readable"
        let elemData = '<div> <u>Why</u> do we use it? It is a long <strong><em><u>established</u></em></strong> fact that a <strong><em><s>reader</s></em></strong> will be <sup>distracted</sup> by the readable </div>'
        let result = handleTextToRetainFormatting(htmlData, elemData, textRetainObject);
        expect(result).toBe("<u>Why</u> do we use it? It is a long <strong><em><u>established</u></em></strong> fact that a <strong><em><s>reader</s></em></strong> will be <sup>distracted</sup> by the readable");
    })
    it('Case 2', () => {
        let simpleDiv = document.createElement('div');
        simpleDiv.innerHTML = '<h1 class="heading1NummerEins"><em>Why</em> we use it?</h1> <p>do</p>';
        let htmlData = '<h1 class="heading1NummerEins"><em>Why</em> we use it?</h1> <p>do</p>'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, textRetainObject);
        expect(result).toBe(' <em>Why</em> we use it? do');
    })
    it('Case 3 handleUnwantedFormattingTags', () => {
        let simpleDiv = document.createElement('div');
        simpleDiv.innerHTML = '<h1><em>Why</em> we use it?</h1> <p>do</p> <h2>h</h2> <h3>h3</h3><h4>h4</h4><h5>h5</h5><h6>h6</h6> <li>li</li><ul>ul</ul><ol>ol</ol>';
        let htmlData = '<h1><em>Why</em> we use it?</h1> <p>do</p> <h2>h</h2> <h3>h3</h3><h4>h4</h4><h5>h5</h5><h6>h6</h6> <li>li</li><ul>ul</ul><ol>ol</ol>'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, textRetainObject);
        expect(result).toBe(' <em>Why</em> we use it? do  h  h3 h4 h5 h6  li ul ol ');
    })
    it('Case 4 handleUnwantedFormattingTags else', () => {
        let simpleDiv = document.createElement('div');
        simpleDiv.innerHTML = '<ol><em>we</em> use it hey</ol>';
        let htmlData = '<ol>we use it hey</ol>'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, textRetainObject);
        expect(result).toBe('<em>we</em> use it hey ');
    })
    it('Case 5', () => {
        let simpleDiv = document.createElement('div');
        simpleDiv.innerHTML = '<h1 class="heading1NummerEins"><em>Why</em> <b>we</b> <i>use</i> <strike>it</strike> <span id="specialChar"></span>hello</h1> <p>do</p>';
        let htmlData = '<h1 class="heading1NummerEins"><em>Why</em> <b>we</b> <i>use</i> <strike>it</strike> <span id="specialChar"></span>hello</h1> <p>do</p>'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, textRetainObject);
        expect(result).toBe(' <em>Why</em> <strong>we</strong> <em>use</em> <s>it</s> hello do');
    })
    it('Case 6 ', () => {
        let simpleDiv = document.createElement('div');
        simpleDiv.innerHTML = '<a>use it hey</a>';
        simpleDiv.innerText = 'use it hey';
        let htmlData = '<a>use it hey</a>'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, textRetainObject);
        expect(result).toBe('use it hey');
    })
    it('Case 7', () => {
        let simpleDiv = document.createElement('div');
        simpleDiv.innerHTML = '</abbr>use it hey</abbr>';
        simpleDiv.innerText = 'use it hey';
        let htmlData = '<dfn class=test>use it hey</dfn>'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, textRetainObject);
        expect(result).toBe('use it hey');
    })
    it('Case 8', () => {
        let simpleDiv = document.createElement('div');
        simpleDiv.innerHTML = '<abbr>use it hey</abbr>';
        simpleDiv.innerText = 'use it hey';
        let htmlData = '<abbr class=test>use it hey</abbr>'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, textRetainObject);
        expect(result).toBe('use it hey');
    })
    it('Case 9', () => {
        let simpleDiv = document.createElement('div');
        simpleDiv.innerHTML = '</span>use it hey</span>';
        simpleDiv.innerText = 'use it hey';
        let htmlData = '<span class=test>use it hey</span>'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, textRetainObject);
        expect(result).toBe('use it hey');
    })
    it('Case 10', () => {
        let simpleDiv = document.createElement('div');
        simpleDiv.innerHTML = '<br />';
        simpleDiv.innerText = 'use it hey';
        let htmlData = '<br />'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, textRetainObject);
        expect(result).toBe('use it hey');
    })
    it('Case 11', () => {
        let simpleDiv = document.createElement('div');
        simpleDiv.innerHTML = '<br>';
        simpleDiv.innerText = 'use it hey';
        let htmlData = '<br>'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, textRetainObject);
        expect(result).toBe('use it hey');
    })
    it('Case 12: Pasting wiris img', () => {
        let props = {
            element: {
                type:"element-authoredtext"
            }
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerHTML = '<em>Why</em><img align="middle" class="Wirisformula" > <b>we</b> <i>use</i> <strike>it</strike> <span id="specialChar"></span>hello <p>do</p>';
        let htmlData = '<em>Why</em> <b>we</b> <i>use</i><img align="middle" class="Wirisformula" ><strike>it</strike> <span id="specialChar"></span>hello <p>do</p>'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv,props);
        expect(result).toBe('<em>Why</em>we</strong> <em>use</em> <s>it</s> hello do ');
    })
    it('Case 12: Pasting inline img', () => {
        let props = {
            element: {
                type:"element-authoredtext"
            }
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerHTML = '<em>Why</em><img align="middle" class="imageAssetContent" > <b>we</b> <i>use</i> <strike>it</strike> <span id="specialChar"></span>hello <p>do</p>';
        let htmlData = '<em>Why</em> <b>we</b> <i>use</i><img align="middle" class="imageAssetContent" ><strike>it</strike> <span id="specialChar"></span>hello <p>do</p>'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv,props);
        expect(result).toBe('<em>Why</em><img align=\"middle\" class=\"imageAssetContent\"> <strong>we</strong> <em>use</em> <s>it</s> hello do ');
    })
    it('Case 12: Pasting inline img for blockfeature element', () => {
        let props = {
            placeholder:"Attribution Text",
            element: {
                type:"element-blockfeature"
            }
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerHTML = '<em>Why</em><img align="middle" class="imageAssetContent" > <b>we</b> <i>use</i> <strike>it</strike> <span id="specialChar"></span>hello <p>do</p>';
        simpleDiv.innerText = "<em>Why</em><img align=\"middle\" class=\"imageAssetContent\"> <strong>we</strong> <em>use</em> <s>it</s> hello do "
        let htmlData = '<em>Why</em> <b>we</b> <i>use</i><img align="middle" class="imageAssetContent" ><strike>it</strike> <span id="specialChar"></span>hello <p>do</p>'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv,props);
        expect(result).toBe('&lt;em&gt;Why&lt;/em&gt;&lt;img align=\"middle\" class=\"imageAssetContent\"&gt; &lt;strong&gt;we&lt;/strong&gt; &lt;em&gt;use&lt;/em&gt; &lt;s&gt;it&lt;/s&gt; hello do ');
    })
    it('Case 12.1 else if  handleTextToRetainFormatting', () => {
        const object = {
            element: {
                type: 'element-blockfeature'
            },
            placeholder : "enter text"
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerHTML = '<h1><em>Why</em> we use it?</h1> <p>do</p> <h2>h</h2> <h3>h3</h3><h4>h4</h4><h5>h5</h5><h6>h6</h6> <li>li</li><ul>ul</ul><ol>ol</ol>';
        let htmlData = '<h1><em>Why</em> we use it?</h1> <p>do</p> <h2>h</h2> <h3>h3</h3><h4>h4</h4><h5>h5</h5><h6>h6</h6> <li>li</li><ul>ul</ul><ol>ol</ol>'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe(' <em>Why</em> we use it? do  h  h3 h4 h5 h6  li ul ol ');
    })
    it('Case 12.2 else if handleTextToRetainFormatting', () => {
        const object = {
            element: {
                type: 'element-blockfeature'
            },
            placeholder : "enter text"
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerHTML = '<h1><em>Why</em> <u><strong>we</strong></u> <s>use</s> it?</h1> <p>do</p> <h2>h</h2> <h3>h3</h3><h4>h4</h4><h5>h5</h5><h6>h6</h6> <li>li</li><ul>ul</ul><ol>ol</ol>';
        let htmlData = '<h1><em>Why</em> we use it?</h1> <p>do</p> <h2>h</h2> <h3>h3</h3><h4>h4</h4><h5>h5</h5><h6>h6</h6> <li>li</li><ul>ul</ul><ol>ol</ol>'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe(' <em>Why</em> we use it? do  h  h3 h4 h5 h6  li ul ol ');
    })
    it('Case 12.3 else if element-learningobjectives handleTextToRetainFormatting', () => {
        const object = {
            element: {
                type: 'element-learningobjectives'
            }
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerHTML = "<u>Why</u> do we use it? It is a long <strong><em><u>established</u></em></strong> fact that a <strong><em><s>reader</s></em></strong> will be <sup>distracted</sup> by the readable"
        let htmlData = '<em>Why</em> we use it? <p>do</p> <h2>h</h2> <h3>h3</h3><h4>h4</h4><h5>h5</h5><h6>h6</h6> <li>li</li><ul>ul</ul><ol>ol</ol>'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe("Why do we use it? It is a long established fact that a reader will be <sup>distracted</sup> by the readable");
    })
    it('Case 12.3 else if element-learningobjectives else case handleTextToRetainFormatting', () => {
        const object = {
            element: {
                type: 'element-learningobjectives'
            }
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerHTML = "Why do we use it? It is a long established fact that a reader will be <sup>distracted</sup> by the readable"
        let htmlData = 'Why we use it? <p>do</p> <h2>h</h2> <h3>h3</h3><h4>h4</h4><h5>h5</h5><h6>h6</h6> <li>li</li><ul>ul</ul><ol>ol</ol>'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe("Why do we use it? It is a long established fact that a reader will be <sup>distracted</sup> by the readable");
    })
    it('Case 12.4 else if Attribution Text  handleTextToRetainFormatting', () => {
        const object = {
            placeholder: "Attribution Text"
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerText = "Why do we use it"
        let htmlData = 'Why do we use it'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe("Why do we use it");
    })
    it('Case 12.5 else if Label Name  handleTextToRetainFormatting', () => {
        const object = {
            placeholder: "Label Name",
            isAutoNumberingEnabled: false
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerText = "Why do we use it"
        let htmlData = 'Why <code>do</code> we use it'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe("Why do we use it");
    })
    it('Case 12.6 else if Number  handleTextToRetainFormatting', () => {
        const object = {
            placeholder: "Number",
            isAutoNumberingEnabled: false
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerText = "Why do we use it"
        let htmlData = 'Why <code>do</code> <sub>we</sub> <sup>use</sup> it'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe("Why do we use it");
    })
    it('Case 12.7 else if openerelement  handleTextToRetainFormatting', () => {
        const object = {
            element: {
                type: 'openerelement'
            }
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerText = "Why do we use it"
        let htmlData = 'Why <s>do</s> we use it'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe("Why do we use it");
    })
    it('Case 12.8 else if Label Name  handleTextToRetainFormatting', () => {
        const object = {
            placeholder: "Label Name",
            isAutoNumberingEnabled: true
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerText = "Why do we use it"
        let htmlData = 'Why do we use it'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe("Why do we use it");
    })
    it('Case 12.9 else if element-dialogue  handleTextToRetainFormatting', () => {
        const object = {
            element: {
                type: "element-dialogue"
            },
            placeholder: "Enter Dialogue...",
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerText = "Why do we use it"
        let htmlData = 'Why <code>do</code> we use it'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe("Why do we use it");
    })
    it('Case 12.10 else if Enter Dialogue... else case  handleTextToRetainFormatting', () => {
        const object = {
            element: {
                type: "element-dialogue"
            },
            placeholder: "Enter Dialogue...",
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerText = "Why do we use it"
        let htmlData = 'Why do we use it'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe("Why do we use it");
    })
    it('Case 12.11 else if element-dialogue  handleTextToRetainFormatting', () => {
        const object = {
            element: {
                type: "element-dialogue"
            },
            placeholder: "Enter Stage Directions...",
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerText = "Why do we use it"
        let htmlData = 'Why <code>do</code> <em>we</em> use it'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe("Why do we use it");
    })
    it('Case 12.12 else if Enter Stage Directions... else case  handleTextToRetainFormatting', () => {
        const object = {
            element: {
                type: "element-dialogue"
            },
            placeholder: "Enter Stage Directions...",
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerText = "Why do we use it"
        let htmlData = 'Why do we use it'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe("Why do we use it");
    })
    it('Case 12.13 else if element-dialogue  handleTextToRetainFormatting', () => {
        const object = {
            element: {
                type: "element-dialogue"
            },
            placeholder: "Enter Character Name...",
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerText = "Why do we use it"
        let htmlData = 'Why <code>do</code> <strong>we</strong> use it'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe("Why do we use it");
    })
    it('Case 12.14 else if Enter Character Name... else case  handleTextToRetainFormatting', () => {
        const object = {
            element: {
                type: "element-dialogue"
            },
            placeholder: "Enter Character Name...",
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerText = "Why do we use it"
        let htmlData = 'Why do we use it'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe("Why do we use it");
    })
    it('Case 12.15 else if popup  handleTextToRetainFormatting', () => {
        const object = {
            element: {
                type: "popup"
            },
            placeholder: "Enter call to action...",
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerText = "Why do we use it"
        let htmlData = 'Why <sub>do</sub> <sup>we</sup> <s>use</s> it'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe("Why do we use it");
    })
    it('Case 12.16 else if popup Enter call to action... else case  handleTextToRetainFormatting', () => {
        const object = {
            element: {
                type: "popup"
            },
            placeholder: "Enter call to action...",
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerText = "Why do we use it"
        let htmlData = 'Why do we use it'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe("Why do we use it");
    })
    it('Case 12.17 else if default case  handleTextToRetainFormatting', () => {
        const object = {
            element: {
                type: "popup"
            },
            placeholder: "",
        }
        let simpleDiv = document.createElement('div');
        simpleDiv.innerText = "Why do we use it"
        let htmlData = 'Why <sub>do</sub> <sup>we</sup> <s>use</s> it'
        let result = handleTextToRetainFormatting(htmlData, simpleDiv, object);
        expect(result).toBe("Why <sub>do</sub> <sup>we</sup> <s>use</s> it");
    })
})
