/**************************Import Modules**************************/
import config from '../../../src/config/config';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES } from '../../../src/component/FigureHeader/AutoNumberConstants';
import * as autonumber_helperFunctions from '../../../src/component/FigureHeader/AutoNumber_helperFunctions';
import * as slateLevelMediaMapper from '../../../src/component/FigureHeader/slateLevelMediaMapper';
import * as AutoNumberActions from '../../../src/component/FigureHeader/AutoNumberActions';
import {GET_ALL_AUTO_NUMBER_ELEMENTS} from '../../../src/constants/Action_Constants'
/*************************Import Constants*************************/
import { mockSlateFiguresList, mockAutoNumberingDetails, slateAncestorFM, slateAncestorBM, slateAncestorPart, slateAncestorChapter, slateAncestorChapterwithMod, mockIndexedElements,
         figureData, element, newElement, mockNumberedElements, mock_autoNumber_ElementTypeKey, slateLevelData, elementObj, slateData1, mock_autoNumber_response_ElementType_mapper} from './AutoNumberApiTestData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('-----------------Testing AutoNumber_helperFunctions-----------------', () => {
    describe('Test-1 setAutoNumberSettingValue-----------------', () => {
        let element = mockSlateFiguresList[0]
        it('Test-1.1---setAutoNumberSettingValue---Resume numbering', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'setAutoNumberSettingValue');
            const result = autonumber_helperFunctions.setAutoNumberSettingValue(element);
            expect(result).toBe('Resume numbering with')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-1.2---setAutoNumberSettingValue---Remove numbering', () => {
            element= {
                ...element,
                numberedandlabel: false
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'setAutoNumberSettingValue');
            const result = autonumber_helperFunctions.setAutoNumberSettingValue(element);
            expect(result).toBe('Remove label & number')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-1.3---setAutoNumberSettingValue---Overrride label & number', () => {
            element= {
                ...element,
                numberedandlabel: true,
                manualoverride: {
                    overridenumbervalue: "aaa",
                    overridelabelvalue: "Fig"
                }
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'setAutoNumberSettingValue');
            const result = autonumber_helperFunctions.setAutoNumberSettingValue(element);
            expect(result).toBe('Override label & number')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-1.4---setAutoNumberSettingValue---Overrride number only', () => {
            element= {
                ...element,
                numberedandlabel: true,
                manualoverride: {
                    overridenumbervalue: "bbb",
                }
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'setAutoNumberSettingValue');
            const result = autonumber_helperFunctions.setAutoNumberSettingValue(element);
            expect(result).toBe('Override number only')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-1.5---setAutoNumberSettingValue---Default Numbering', () => {
            element= {
                ...element,
                numberedandlabel: true
            }
            delete element.manualoverride;
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'setAutoNumberSettingValue');
            const result = autonumber_helperFunctions.setAutoNumberSettingValue(element);
            expect(result).toBe('Default Auto-number')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });

        it('Test-1.6---setAutoNumberSettingValue--- No numberedandlabel key', () => {
            delete element.numberedandlabel
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'setAutoNumberSettingValue');
            const result = autonumber_helperFunctions.setAutoNumberSettingValue(element);
            expect(result).toBe('Default Auto-number')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });

        it('Test-1.7---setAutoNumberSettingValue-----Conditional coverage', () => {
            element= {
                ...element,
                numberedandlabel: true,
                manualoverride: {
                    override: "bbb",
                }
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'setAutoNumberSettingValue');
            const result = autonumber_helperFunctions.setAutoNumberSettingValue(element);
            expect(result).toBe('Default Auto-number')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
    describe('Test-2 getOverridedNumberValue-----------------', () => {
        let element = mockSlateFiguresList[0]
        it('Test-2.1---getOverridedNumberValue---Resume numbering', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getOverridedNumberValue');
            const result = autonumber_helperFunctions.getOverridedNumberValue(element);
            expect(result).toBe('555')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-2.2---getOverridedNumberValue---Remove numbering', () => {
            element = {
                ...element,
                numberedandlabel: false
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getOverridedNumberValue');
            const result = autonumber_helperFunctions.getOverridedNumberValue(element);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-2.3---getOverridedNumberValue---Overrride label & number', () => {
            element = {
                ...element,
                numberedandlabel: true,
                manualoverride: {
                    overridenumbervalue: "aaa",
                    overridelabelvalue: "Fig"
                }
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getOverridedNumberValue');
            const result = autonumber_helperFunctions.getOverridedNumberValue(element);
            expect(result).toBe('aaa')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-2.4---getOverridedNumberValue---Overrride number only', () => {
            element = {
                ...element,
                numberedandlabel: true,
                manualoverride: {
                    overridenumbervalue: "bbb",
                }
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getOverridedNumberValue');
            const result = autonumber_helperFunctions.getOverridedNumberValue(element);
            expect(result).toBe('bbb')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-2.5---getOverridedNumberValue---Default Numbering', () => {
            element = {
                ...element,
                numberedandlabel: true
            }
            delete element.manualoverride
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getOverridedNumberValue');
            const result = autonumber_helperFunctions.getOverridedNumberValue(element);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });

        it('Test-2.6---getOverridedNumberValue---Conditional coverage', () => {
            element = {
                ...element,
                numberedandlabel: true,
                manualoverride: {
                    override: "bbb",
                }
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getOverridedNumberValue');
            const result = autonumber_helperFunctions.getOverridedNumberValue(element);
            expect(result).toBe(undefined);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });

        it('Test-2.7---getOverridedNumberValue---Conditional coverage', () => {
            delete element.numberedandlabel;
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getOverridedNumberValue');
            const result = autonumber_helperFunctions.getOverridedNumberValue(element);
            expect(result).toBe(undefined);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    })
    describe('Test-3 getValueOfLabel-----------------', () => {
        it('Test-3.1---getValueOfLabel---for all figuretypes', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getValueOfLabel');
            let result = autonumber_helperFunctions.getValueOfLabel("audio");
            expect(result).toBe('Audio')
            result = autonumber_helperFunctions.getValueOfLabel("video");
            expect(result).toBe('Video')
            result = autonumber_helperFunctions.getValueOfLabel("image");
            expect(result).toBe('Figure')
            result = autonumber_helperFunctions.getValueOfLabel("table");
            expect(result).toBe('Figure')
            result = autonumber_helperFunctions.getValueOfLabel("mathImage");
            expect(result).toBe('Figure')
            result = autonumber_helperFunctions.getValueOfLabel("interactive");
            expect(result).toBe('Interactive');
            result = autonumber_helperFunctions.getValueOfLabel("sidebar");
            expect(result).toBe('Aside');
            result = autonumber_helperFunctions.getValueOfLabel("workedexample");
            expect(result).toBe('Worked Example');
            result = autonumber_helperFunctions.getValueOfLabel("tableasmarkup");
            expect(result).toBe('Table');
            result = autonumber_helperFunctions.getValueOfLabel("authoredtext");
            expect(result).toBe('Equation');
            result = autonumber_helperFunctions.getValueOfLabel("codelisting");
            expect(result).toBe('Exhibit');
            result = autonumber_helperFunctions.getValueOfLabel("mathml");
            expect(result).toBe('')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    })
    describe('Test-4 getLabelNumberPreview-----------------', () => {
        let element = mockSlateFiguresList[0]
        let params = {
            imgLabelValue: "Figure",
            imgNumberValue: "2",
            parentNumber: "11"
        }
        it('Test-4.1---getLabelNumberPreview---Other cases', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getLabelNumberPreview');
            let result = autonumber_helperFunctions.getLabelNumberPreview(element, params);
            expect(result).toBe('Figure 11.2')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-4.2---getLabelNumberPreview---Remove numbering', () => {
            element = {
                ...element,
                numberedandlabel: false
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getLabelNumberPreview');
            let result = autonumber_helperFunctions.getLabelNumberPreview(element, params);
            expect(result).toBe('')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-4.3---getLabelNumberPreview---No Parent Number - remove numbering case in toc', () => {
            params = {
                imgLabelValue: "Figure",
                imgNumberValue: "2"
            }
            element = {
                ...element,
                numberedandlabel: true
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getLabelNumberPreview');
            let result = autonumber_helperFunctions.getLabelNumberPreview(element, params);
            expect(result).toBe('Figure 2')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });

        it('Test-4.4---getLabelNumberPreview---Conditional coverage', () => {
            params = {
                imgLabelValue: "Figure",
                imgNumberValue: "2",
                currentLabelValue: "Figure",
                labelNumberSetting: "Override label & number",
                currentNumberValue: "2"
            }
            element = {
                ...element,
                numberedandlabel: true
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getLabelNumberPreview');
            let result = autonumber_helperFunctions.getLabelNumberPreview(element, params);
            expect(result).toBe('Figure 2')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });

        it('Test-4.5---getLabelNumberPreview---Conditional coverage', () => {
            params = {
                imgLabelValue: "Figure",
                imgNumberValue: "2",
                labelNumberSetting: "Override label & number",
                currentNumberValue: "2"
            }
            element = {
                ...element,
                numberedandlabel: true
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getLabelNumberPreview');
            let result = autonumber_helperFunctions.getLabelNumberPreview(element, params);
            expect(result).toBe('Figure 2')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    })
    describe('Test-5 getContainerNumber-----------------', () => {
        let autoNumberingDetails = mockAutoNumberingDetails
        it('Test-5.1---getContainerNumber---FM', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getContainerNumber');
            let result = autonumber_helperFunctions.getContainerNumber(slateAncestorFM, autoNumberingDetails);
            expect(result).toBe('F')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-5.2---getContainerNumber---BM', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getContainerNumber');
            let result = autonumber_helperFunctions.getContainerNumber(slateAncestorBM, autoNumberingDetails);
            expect(result).toBe('B')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-5.3---getContainerNumber---Part', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getContainerNumber');
            let result = autonumber_helperFunctions.getContainerNumber(slateAncestorPart, autoNumberingDetails);
            expect(result).toBe('P1')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-5.4---getContainerNumber---Chapter', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getContainerNumber');
            let result = autonumber_helperFunctions.getContainerNumber(slateAncestorChapter, autoNumberingDetails);
            expect(result).toBe(1)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-5.5---getContainerNumber---Chapter with Module', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getContainerNumber');
            let result = autonumber_helperFunctions.getContainerNumber(slateAncestorChapterwithMod, autoNumberingDetails);
            expect(result).toBe(2)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-5.6---getContainerNumber---Conditional coverage', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getContainerNumber');
            let result = autonumber_helperFunctions.getContainerNumber({}, autoNumberingDetails);
            expect(result).toBe('');
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    })
    describe('Test-6 getLabelNumberFieldValue-----------------', () => {
        let element = mockSlateFiguresList[0],
            figureLabelValue = "Figure"
        it('Test-6.1---getLabelNumberFieldValue---Resume numbering', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getLabelNumberFieldValue');
            const result = autonumber_helperFunctions.getLabelNumberFieldValue(element, figureLabelValue, "2");
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-6.2---getLabelNumberFieldValue---Overrride label & number', () => {
            element = {
                ...element,
                numberedandlabel: true,
                manualoverride: {
                    overridenumbervalue: "aaa",
                    overridelabelvalue: "Fig"
                }
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getLabelNumberFieldValue');
            const result = autonumber_helperFunctions.getLabelNumberFieldValue(element, figureLabelValue, "2");
            expect(result).toBe('Figure')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-6.3---getLabelNumberFieldValue---Overrride number only', () => {
            element = {
                ...element,
                numberedandlabel: true,
                manualoverride: {
                    overridenumbervalue: "bbb",
                }
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getLabelNumberFieldValue');
            const result = autonumber_helperFunctions.getLabelNumberFieldValue(element, figureLabelValue, "2");
            expect(result).toBe('Figure')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-6.4---getLabelNumberFieldValue---Default Numbering', () => {
            element = {
                ...element,
                numberedandlabel: true
            }
            delete element.manualoverride
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getLabelNumberFieldValue');
            const result = autonumber_helperFunctions.getLabelNumberFieldValue(element, figureLabelValue, "2");
            expect(result).toBe('Figure')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-6.5---getLabelNumberFieldValue---Remove numbering', () => {
            element = {
                ...element,
                numberedandlabel: false
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getLabelNumberFieldValue');
            const result = autonumber_helperFunctions.getLabelNumberFieldValue(element, figureLabelValue, "2");
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });

        it('Test-6.6---getLabelNumberFieldValue---Conditional coverage', () => {
            element = {
                ...element,
                numberedandlabel: true,
                manualoverride: {
                    override: "bbb",
                }
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getLabelNumberFieldValue');
            const result = autonumber_helperFunctions.getLabelNumberFieldValue(element, figureLabelValue, "2");
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });

        it('Test-6.7---getLabelNumberFieldValue---Conditional coverage', () => {
            delete element.numberedandlabel;
            delete element.displayedlabel;
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getLabelNumberFieldValue');
            const result = autonumber_helperFunctions.getLabelNumberFieldValue(element, figureLabelValue, "2");
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });

        it('Test-6.8---getLabelNumberFieldValue---Conditional coverage', () => {
            delete element.numberedandlabel;
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getLabelNumberFieldValue');
            const result = autonumber_helperFunctions.getLabelNumberFieldValue(element, figureLabelValue, 'Override label & number');
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });

        it('Test-6.9---getLabelNumberFieldValue---Conditional coverage', () => {
            delete element.numberedandlabel;
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getLabelNumberFieldValue');
            const result = autonumber_helperFunctions.getLabelNumberFieldValue(element, '', 'Override label & number');
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });

        it('Test-6.10---getLabelNumberFieldValue---Conditional coverage', () => {
            delete element.numberedandlabel;
            element.type = 'element-aside'; 
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getLabelNumberFieldValue');
            const result = autonumber_helperFunctions.getLabelNumberFieldValue(element, '', '');
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    })
    describe('Test-7 getNumberData-----------------', () => {
        let element2 = {
            displayedlabel: 'Figure',
            contentUrn: "urn:pearson:entity:a4719e78-a66b-4356-ac62-7591a42d070d",
            figuretype: "image"
        }
        let element = { ...element2, numberedandlabel: true, manualoverride: {
                "overridenumbervalue": "12"
            }}
        it('Test-7.1---getNumberData---default cases', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getNumberData');
            autonumber_helperFunctions.getNumberData("backMatter", element2, mockIndexedElements)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-7.2---getNumberData---default cases', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getNumberData');
            autonumber_helperFunctions.getNumberData("", element2, mockIndexedElements)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });

        it('Test-7.3---getNumberData---override number cases', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getNumberData');
            autonumber_helperFunctions.getNumberData("backMatter", element, mockIndexedElements)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });

        it('Test-7.4---getNumberData---conditional coverage', () => {
            element = {
                ...element,
                numberedandlabel: true,
                manualoverride: {
                    "override": "12"
                }
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getNumberData');
            autonumber_helperFunctions.getNumberData("backMatter", element, mockIndexedElements)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });

        it('Test-7.4---getNumberData---conditional coverage', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getNumberData');
            autonumber_helperFunctions.getNumberData("backmatter", element, mockIndexedElements)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    })
    describe('Test-8 getSlateEntityUrn-----------------', () => {
        it('Test-8.1---getSlateEntityUrn---default cases', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getSlateEntityUrn');
            let result = autonumber_helperFunctions.getSlateEntityUrn()
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-8.2---getSlateEntityUrn---in slate cases', () => {
            config.slateEntityURN = "urn:pearson:entity:73d49cc5-38d2-4605-aa4a-65183186e076"
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getSlateEntityUrn');
            let result = autonumber_helperFunctions.getSlateEntityUrn()
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-8.3---getSlateEntityUrn---on slate cases', () => {
            config.tempSlateEntityURN = "urn:pearson:entity:73d49cc5-38d2-4605-aa4a-65183186e076"
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getSlateEntityUrn');
            let result = autonumber_helperFunctions.getSlateEntityUrn()
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    })
    describe('Test-9 getAutoNumberedElement-----------------', () => {
        let element2 = {
            displayedlabel: 'Figure',
            contentUrn: "urn:pearson:entity:a4719e78-a66b-4356-ac62-7591a42d070d",
            figuretype: "image"
        }
        it('Test-9.1---getAutoNumberedElement', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getAutoNumberedElement');
            let result = autonumber_helperFunctions.getAutoNumberedElement(element2)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    })
    describe('Test-10 setAutonumberingValuesForPayload-----------------', () => {
        const {
            AUTO_NUMBER_SETTING_DEFAULT,
            AUTO_NUMBER_SETTING_RESUME_NUMBER,
            AUTO_NUMBER_SETTING_REMOVE_NUMBER,
            AUTO_NUMBER_SETTING_OVERRIDE_NUMBER,
            AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
        } = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES
        let isPayloadValid = true
        let titleHTML = "Map"
        let numberHTML = "2"
        let element = mockSlateFiguresList[0]
        it('Test-10.1---setAutonumberingValuesForPayload---Resume numbering', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'setAutonumberingValuesForPayload');
            const result = autonumber_helperFunctions.setAutonumberingValuesForPayload(AUTO_NUMBER_SETTING_DEFAULT, titleHTML, numberHTML, isPayloadValid);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-10.2---setAutonumberingValuesForPayload---Remove numbering', () => {
            element = {
                ...element,
                numberedandlabel: false
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'setAutonumberingValuesForPayload');
            const result = autonumber_helperFunctions.setAutonumberingValuesForPayload(AUTO_NUMBER_SETTING_RESUME_NUMBER, titleHTML, numberHTML, isPayloadValid);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-10.3---setAutonumberingValuesForPayload---Overrride label & number', () => {
            element = {
                ...element,
                numberedandlabel: true,
                manualoverride: {
                    overridenumbervalue: "aaa",
                    overridelabelvalue: "Fig"
                }
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'setAutonumberingValuesForPayload');
            const result = autonumber_helperFunctions.setAutonumberingValuesForPayload(AUTO_NUMBER_SETTING_REMOVE_NUMBER, titleHTML, numberHTML, isPayloadValid);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-10.4---setAutonumberingValuesForPayload---Overrride number only', () => {
            element = {
                ...element,
                numberedandlabel: true,
                manualoverride: {
                    overridenumbervalue: "bbb",
                }
            }
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'setAutonumberingValuesForPayload');
            const result = autonumber_helperFunctions.setAutonumberingValuesForPayload(AUTO_NUMBER_SETTING_OVERRIDE_NUMBER, titleHTML, numberHTML, isPayloadValid);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-10.5---setAutonumberingValuesForPayload---Default Numbering', () => {
            isPayloadValid = false
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'setAutonumberingValuesForPayload');
            const result = autonumber_helperFunctions.setAutonumberingValuesForPayload(AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER, titleHTML, numberHTML, isPayloadValid);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-10.6---setAutonumberingValuesForPayload---Resume numbering with null value', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'setAutonumberingValuesForPayload');
            autonumber_helperFunctions.setAutonumberingValuesForPayload(AUTO_NUMBER_SETTING_RESUME_NUMBER, titleHTML, "", isPayloadValid);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
    describe('Test-11 prepareAutoNumberList---------------------', () => {
        it('Test-11.1 prepareAutoNumberList ', () => {
            const output = { 
                frontMatter:
                    { 'urn:pearson:entity:5af04c31-a733-46df-8224-214aabcf2665': 1,
                      'urn:pearson:entity:5af04c31-a733-46df-8224-214aabcf26445': '',
                      'urn:pearson:entity:5af04c31-a733-46df-8224-344aabcf26445': '12',
                      'urn:pearson:entity:5af04c33-a733-46df-8224-344aabcf26445': '555' }
                 }
            const result = autonumber_helperFunctions.prepareAutoNumberList(figureData);
            expect(result).toStrictEqual(output);
        });
    });
    describe('Test-12 updateAutonumberingOnElementTypeUpdate---------------------', () => {
        const getState=  () => {
            return {
                autoNumberReducer: {
                    isAutoNumberingEnabled: false,
                    autoNumberedElements: {
                        imagesList: [],
                        tablesList: [],
                        equationsList: [],
                        audiosList: [],
                        videosList: []
                    },
                    autoNumberingDetails: {},
                    autoNumberElementsIndex: {
                        figureImageIndex: {},
                        tableIndex: {},
                        equationsIndex: {},
                        audioIndex: {},
                        videoIndex: {}
                    },
                    slateFigureList: [],
                    autoNumberOption: ''
                }
            }
        }

        jest.spyOn(slateLevelMediaMapper, 'getAutoNumberedElementsOnSlate').mockImplementation(() => {
            return Promise.resolve([{
                    "alignment": "full",
                    "contentUrn": "urn:pearson:entity:25960fb1-3080-4a24-a20d-6c6dcca19add",
                    "displayedlabel": "Audio",
                    "figuredata": {"schema": 'http://schemas.pearson.com/wip-authoring/audio/1#/definitions/audio', "height": '399', "width": '600', "audioid": '', "posterimage": {}},
                    "figuretype": "audio",
                    "html": {"title": '<p class="paragraphNumeroUno"><br></p>', "text": '', "postertext": '', "captions": '<p class="paragraphNumeroUno"><br></p>', "credits": '<p class="paragraphNumeroUno"><br></p>'},
                    "id": "urn:pearson:work:f026ec86-19a2-4aad-9da9-a16f7e1ad2d8",
                    "indexPos": 0,
                    "numberedandlabel": true,
                    "parentDetails": [],
                    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                    "slateEntityUrn": "urn:pearson:entity:f167be8b-27a7-4bec-9196-4e5e7d393291",
                    "subtype": "figureAudioSL",
                    "titlecontentintitlefield": true,
                    "type": "figure",
                    "versionUrn": "urn:pearson:work:f026ec86-19a2-4aad-9da9-a16f7e1ad2d8",
                }]);
        });

        jest.spyOn(AutoNumberActions, 'getAutoNumberSequence').mockImplementation(jest.fn())
        it('Test-12.1 updateAutonumberingOnElementTypeUpdate ', () => {
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_ALL_AUTO_NUMBER_ELEMENTS);
            }
            autonumber_helperFunctions.updateAutonumberingOnElementTypeUpdate(newElement, element, mockNumberedElements, slateAncestorChapter, slateLevelData)(getState, dispatch);

        });
    });

    describe('Test-13 getNumberedElements---------------------', () => {
        it('Test-13.1 getNumberedElements ', () => {
            const mockData = {
                "contentUrn": "urn:pearson:entity:d45c8383-5480-4d8d-b74e-7406fbefa678",
                "displayedlabel": "Figure",
                "entityUrn": "urn:pearson:entity:d45c8383-5480-4d8d-b74e-7406fbefa678",
                "figureType": "image",
                "imageId": "",
                "numberedandlabel": true,
                "parentContainerEntityUrn": "urn:pearson:entity:968c4725-168b-42fc-ac3c-072c1416e937",
                "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                "slateEntityUrn": "urn:pearson:entity:968c4725-168b-42fc-ac3c-072c1416e937",
                "subType": "imageTextWidth",
                "title": "",
                "type": "figure",
                "versionUrn": "urn:pearson:work:f7d4ef4f-03ee-4e62-9f21-d2ef16f98a7d"
                }
            let data = { "figure": [mockData]}
            const output = { imageList: { frontMatter: [mockData] } }
            const result = autonumber_helperFunctions.getNumberedElements(data, "frontMatter");
            expect(result).toStrictEqual(output)
        });
    });
})

describe('Test-14 getContainerEntityUrn----Conditional coverage', () => {
    it('Test-14.1---getContainerEntityUrn---', () => {
        let slateAncestor = {
            ...slateAncestorChapter,
            label: 'slate'
        }
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getContainerEntityUrn');
        let result = autonumber_helperFunctions.getContainerEntityUrn(slateAncestor);
        expect(result).toBe('')
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-14.2---getContainerEntityUrn---', () => {
        let slateAncestor = {
            ...slateAncestorChapter,
            ancestor: {
                ...slateAncestorChapter.ancestor,
                label: 'module'
            }
        }
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getContainerEntityUrn');
        let result = autonumber_helperFunctions.getContainerEntityUrn(slateAncestor);
        expect(result).toBe('')
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-14.3---getContainerEntityUrn---', () => {
        let slateAncestor = {
            ...slateAncestorChapter,
            ancestor: {
                ...slateAncestorChapter.ancestor,
                label: 'label'
            }
        }
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getContainerEntityUrn');
        let result = autonumber_helperFunctions.getContainerEntityUrn(slateAncestor);
        expect(result).toBe('')
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
})

describe('Test-15 updateAutonumberingOnElementTypeUpdate', () => {
    let initialState = {
        autoNumberReducer: {
            isAutoNumberingEnabled: true,
            autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey,
            autoNumberedElements: mockNumberedElements,
            popupParentSlateData: {
                isPopupSlate: false
            }
        }
    };
    it('Test-15.1---updateAutonumberingOnElementTypeUpdate---', () => {
        let oldElement = {
            ...element,
            contentUrn: 'urn:pearson:entity:dbad2887-96d8-4711-9382-d48a7cef48e3',
            displayedlabel: 'Figure'
        }
        let newElement = {
            ...oldElement,
            displayedlabel: 'Table'
        }
        let slateData = [...slateData1, oldElement, newElement];
        jest.spyOn(slateLevelMediaMapper, 'getAutoNumberedElementsOnSlate').mockImplementation(() => {
            return Promise.resolve(slateData);
        });
        
        const store = mockStore(() => initialState);
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'updateAutonumberingOnElementTypeUpdate');
        store.dispatch(autonumber_helperFunctions.updateAutonumberingOnElementTypeUpdate(newElement, oldElement, mockNumberedElements, slateAncestorChapter, slateLevelData));
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-15.2---updateAutonumberingOnElementTypeUpdate---conditional coverage', () => {
        let oldElement = {
            ...element,
            contentUrn: 'urn:pearson:entity:dbad2887-96d8-4711-9382-d48a7cef48e3',
            displayedlabel: 'Figure'
        }
        let newElement = {
            ...oldElement,
            displayedlabel: 'Table'
        }
        let slateData = [...slateData1, newElement];
        jest.spyOn(slateLevelMediaMapper, 'getAutoNumberedElementsOnSlate').mockImplementation(() => {
            return Promise.resolve(slateData);
        });
        
        const store = mockStore(() => initialState);
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'updateAutonumberingOnElementTypeUpdate');
        store.dispatch(autonumber_helperFunctions.updateAutonumberingOnElementTypeUpdate(newElement, oldElement, mockNumberedElements, slateAncestorChapter, slateLevelData));
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-15.3---updateAutonumberingOnElementTypeUpdate---conditional coverage', () => {
        let oldElement = {
            ...element,
            displayedlabel: 'Figure'
        }
        let newElement = {
            ...oldElement,
            displayedlabel: 'Table'
        }
        let slateData = [...slateData1, oldElement];
        jest.spyOn(slateLevelMediaMapper, 'getAutoNumberedElementsOnSlate').mockImplementation(() => {
            return Promise.resolve(slateData);
        });
        
        const store = mockStore(() => initialState);
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'updateAutonumberingOnElementTypeUpdate');
        store.dispatch(autonumber_helperFunctions.updateAutonumberingOnElementTypeUpdate(newElement, oldElement, mockNumberedElements, slateAncestorChapter, slateLevelData));
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-15.4---updateAutonumberingOnElementTypeUpdate---conditional coverage', () => {
        jest.spyOn(slateLevelMediaMapper, 'getAutoNumberedElementsOnSlate').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });
        
        const store = mockStore(() => initialState);
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'updateAutonumberingOnElementTypeUpdate');
        store.dispatch(autonumber_helperFunctions.updateAutonumberingOnElementTypeUpdate(element, element, mockNumberedElements, {}, slateLevelData));
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-15.5---updateAutonumberingOnElementTypeUpdate---conditional coverage', () => {
        jest.spyOn(slateLevelMediaMapper, 'getAsideElementsWrtKey').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });

        let ele = {...element, type: 'element-aside'}
        const store = mockStore(() => initialState);
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'updateAutonumberingOnElementTypeUpdate');
        store.dispatch(autonumber_helperFunctions.updateAutonumberingOnElementTypeUpdate(ele, ele, mockNumberedElements, {}, slateLevelData));
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-15.6---updateAutonumberingOnElementTypeUpdate---conditional coverage', () => {
        jest.spyOn(slateLevelMediaMapper, 'getAsideElementsWrtKey').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });

        let ele = {...element, type: 'element'}
        const store = mockStore(() => initialState);
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'updateAutonumberingOnElementTypeUpdate');
        store.dispatch(autonumber_helperFunctions.updateAutonumberingOnElementTypeUpdate(ele, ele, mockNumberedElements, {}, slateLevelData));
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-15.7---updateAutonumberingOnElementTypeUpdate---conditional coverage', () => {
        let initialState = {
            autoNumberReducer: {
                isAutoNumberingEnabled: true,
                autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey,
                autoNumberedElements: mockNumberedElements,
                popupParentSlateData: {
                    isPopupSlate: true
                }
            }
        };
        jest.spyOn(slateLevelMediaMapper, 'getAsideElementsWrtKey').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });

        let ele = {...element, type: 'element'}
        const store = mockStore(() => initialState);
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'updateAutonumberingOnElementTypeUpdate');
        store.dispatch(autonumber_helperFunctions.updateAutonumberingOnElementTypeUpdate(ele, ele, mockNumberedElements, {}, slateLevelData));
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
})

describe('Test-16 updateAutonumberingKeysInStore', () => {
    let initialState = {
        autoNumberReducer: {
            isAutoNumberingEnabled: true,
            autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey,
            autoNumberedElements: mockNumberedElements
        }
    };
    it('Test-16.1---updateAutonumberingKeysInStore---', () => {
        let updatedElement = {
            ...element,
            contentUrn: 'urn:pearson:entity:af780ac6-84ee-411e-b0b8-fc9860a50cb4',
            displayedlabel: 'Figure',
            manualoverride: {
                overridenumbervalue: '22'
            }
        }
        
        const store = mockStore(() => initialState);
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'updateAutonumberingKeysInStore');
        store.dispatch(autonumber_helperFunctions.updateAutonumberingKeysInStore(updatedElement, mockNumberedElements, slateAncestorChapter));
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-16.2---updateAutonumberingKeysInStore---conditional coverage', () => {
        let updatedElement = {
            ...element,
            contentUrn: 'urn:pearson:entity:af780ac6-84ee-411e-b0b8-fc9860a50cb4',
            displayedlabel: 'Figure',
        }
        
        const store = mockStore(() => initialState);
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'updateAutonumberingKeysInStore');
        store.dispatch(autonumber_helperFunctions.updateAutonumberingKeysInStore(updatedElement, mockNumberedElements, slateAncestorChapter));
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-16.3---updateAutonumberingKeysInStore---conditional coverage', () => {
        let updatedElement = {
            ...element,
            contentUrn: 'urn:pearson:entity:dbad2887-96d8-4711-9382-d48a7cef48e3',
            displayedlabel: 'Figure',
        }
        
        const store = mockStore(() => initialState);
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'updateAutonumberingKeysInStore');
        store.dispatch(autonumber_helperFunctions.updateAutonumberingKeysInStore(updatedElement, mockNumberedElements, slateAncestorChapter));
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-16.4---updateAutonumberingKeysInStore---conditional coverage', () => {
        let updatedElement = {
            ...element,
            contentUrn: 'urn:pearson:entity:dbad2887-96d8-4711-9382-d48a7cef48e3',
            displayedlabel: 'Element',
        }
        
        const store = mockStore(() => initialState);
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'updateAutonumberingKeysInStore');
        store.dispatch(autonumber_helperFunctions.updateAutonumberingKeysInStore(updatedElement, mockNumberedElements, slateAncestorChapter));
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-16.5---updateAutonumberingKeysInStore---conditional coverage', () => {
        delete element.displayedlabel;        
        const store = mockStore(() => initialState);
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'updateAutonumberingKeysInStore');
        store.dispatch(autonumber_helperFunctions.updateAutonumberingKeysInStore(element, mockNumberedElements, {}));
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
})

describe('Test-17 validateLabelNumberSetting', () => {
    it('Test-17.1---validateLabelNumberSetting---', () => {
        const {
            AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
        } = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES
        const removeClassesFromHtml = jest.fn()
        const titleHTML = 'test text';
        const numberHTML = '22';
        const subtitleHTML = '';
        const captionHTML = '';
        const creditsHTML = '';
        const oldImage = {};
        const podwidth = '';
        const smartlinkContexts = ["3rd-party"];
        const index = '0-1';
        const changeInPodwidth = '';
        const props = {
            autoNumberOption: {
                entityUrn: 'urn:pearson:entity:af780ac6-84ee-411e-b0b8-fc9860a50cb4',
                option: AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
            }
        }
        let updatedElement = {
            ...element,
            contentUrn: 'urn:pearson:entity:af780ac6-84ee-411e-b0b8-fc9860a50cb4',
            displayedlabel: 'Figure',
            manualoverride: {
                overridenumbervalue: '22'
            },
            figuredata: {
                interactiveformat: "external-link",
                interactiveid: "",
                interactivetype: "3rd-party"
            }
        }
        
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'validateLabelNumberSetting');
        autonumber_helperFunctions.validateLabelNumberSetting(props, updatedElement, removeClassesFromHtml, titleHTML, numberHTML, subtitleHTML, captionHTML, creditsHTML, oldImage, podwidth, smartlinkContexts, index, changeInPodwidth);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-17.2---validateLabelNumberSetting--- conditional coverage', () => {
        const {
            AUTO_NUMBER_SETTING_REMOVE_NUMBER
        } = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES
        const removeClassesFromHtml = jest.fn()
        const titleHTML = 'test text';
        const numberHTML = '22';
        const subtitleHTML = '';
        const captionHTML = '';
        const creditsHTML = '';
        const oldImage = {};
        const podwidth = '';
        const smartlinkContexts = ["3rd-party"];
        const index = '0-1';
        const changeInPodwidth = '';
        const props = {
            autoNumberOption: {
                entityUrn: 'urn:pearson:entity:af780ac6-84ee-411e-b0b8-fc9860a50cb4',
                option: AUTO_NUMBER_SETTING_REMOVE_NUMBER
            }
        }
        let updatedElement = {
            ...element,
            contentUrn: 'urn:pearson:entity:af780ac6-84ee-411e-b0b8-fc9860a50cb4',
            displayedlabel: 'Figure',
            manualoverride: {
                overridenumbervalue: '22',
                overridelabelvalue: 'label'
            }
        }
        
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'validateLabelNumberSetting');
        autonumber_helperFunctions.validateLabelNumberSetting(props, updatedElement, removeClassesFromHtml, titleHTML, numberHTML, subtitleHTML, captionHTML, creditsHTML, oldImage, podwidth, smartlinkContexts, index, changeInPodwidth);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-17.3---validateLabelNumberSetting--- conditional coverage', () => {
        const {
            AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
        } = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES
        const removeClassesFromHtml = jest.fn()
        const titleHTML = 'test text';
        const numberHTML = '22';
        const subtitleHTML = '';
        const captionHTML = '';
        const creditsHTML = '';
        const oldImage = {};
        const podwidth = '';
        const smartlinkContexts = ["3rd-party"];
        const index = '0-1';
        const changeInPodwidth = '';
        const props = {
            autoNumberOption: {
                entityUrn: 'urn:pearson:entity:af780ac6-84ee-411e-b0b8-fc9860a50cb4',
                option: AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
            },
            currentSlateAncestorData: slateAncestorChapter
        }
        let updatedElement = {
            ...element,
            contentUrn: 'urn:pearson:entity:af780ac6-84ee-411e-b0b8-fc9860a50cb4',
            displayedlabel: 'Figure',
            manualoverride: {
                overridenumbervalue: '',
                overridelabelvalue: 'label'
            }
        }
        
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'validateLabelNumberSetting');
        autonumber_helperFunctions.validateLabelNumberSetting(props, updatedElement, removeClassesFromHtml, titleHTML, numberHTML, subtitleHTML, captionHTML, creditsHTML, oldImage, podwidth, smartlinkContexts, index, changeInPodwidth);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-17.4---validateLabelNumberSetting--- conditional coverage', () => {
        const {
            AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
        } = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES
        const removeClassesFromHtml = jest.fn()
        const titleHTML = 'test text';
        const numberHTML = '';
        const subtitleHTML = '';
        const captionHTML = '';
        const creditsHTML = '';
        const oldImage = {};
        const podwidth = '';
        const smartlinkContexts = ["3rd-party"];
        const index = '0-1';
        const changeInPodwidth = '';
        const props = {
            autoNumberOption: {
                entityUrn: 'urn:pearson:entity:af780ac6-84ee-411e-b0b8-fc9860a50cb4',
                option: AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
            },
            currentSlateAncestorData: slateAncestorChapter
        }
        let updatedElement = {
            ...element,
            contentUrn: 'urn:pearson:entity:af780ac6-84ee-411e-b0b8-fc9860a50cb4',
            displayedlabel: 'Figure',
            manualoverride: {
                overridenumbervalue: '22',
                overridelabelvalue: 'label'
            }
        }
        
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'validateLabelNumberSetting');
        autonumber_helperFunctions.validateLabelNumberSetting(props, updatedElement, removeClassesFromHtml, titleHTML, numberHTML, subtitleHTML, captionHTML, creditsHTML, oldImage, podwidth, smartlinkContexts, index, changeInPodwidth);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-17.5---validateLabelNumberSetting--- conditional coverage', () => {
        const {
            AUTO_NUMBER_SETTING_DEFAULT
        } = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES
        const removeClassesFromHtml = jest.fn()
        const titleHTML = 'test text';
        const numberHTML = '';
        const subtitleHTML = '';
        const captionHTML = '';
        const creditsHTML = '';
        const oldImage = {};
        const podwidth = '';
        const smartlinkContexts = ["3rd-party"];
        const index = '0-1';
        const changeInPodwidth = '';
        const props = {
            autoNumberOption: {
                entityUrn: 'urn:pearson:entity:af780ac6-84ee-411e-b0b8-fc9860a50cb4',
                option: AUTO_NUMBER_SETTING_DEFAULT
            },
            currentSlateAncestorData: slateAncestorChapter
        }
        let updatedElement = {
            ...element,
            contentUrn: 'urn:pearson:entity:af780ac6-84ee-411e-b0b8-fc9860a50cb4',
            displayedlabel: 'Figure',
            numberedandlabel: false
        }
        
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'validateLabelNumberSetting');
        autonumber_helperFunctions.validateLabelNumberSetting(props, updatedElement, removeClassesFromHtml, titleHTML, numberHTML, subtitleHTML, captionHTML, creditsHTML, oldImage, podwidth, smartlinkContexts, index, changeInPodwidth);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-17.6---validateLabelNumberSetting--- conditional coverage', () => {
        const {
            AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
        } = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES
        const removeClassesFromHtml = jest.fn(() => { return '' });
        const titleHTML = 'Figure';
        const numberHTML = '22';
        const subtitleHTML = '';
        const captionHTML = '';
        const creditsHTML = '';
        const oldImage = '';
        const podwidth = '';
        const smartlinkContexts = ["3rd-party"];
        const index = '0-1';
        const changeInPodwidth = jest.fn();
        const props = {
            autoNumberOption: {
                entityUrn: 'urn:pearson:entity:af780ac6-84ee-411e-b0b8-fc9860a50cb4',
                option: AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
            },
            currentSlateAncestorData: slateAncestorChapter
        }
        let updatedElement = {
            ...element,
            contentUrn: 'urn:pearson:entity:af780ac6-84ee-411e-b0b8-fc9860a50cb4',
            displayedlabel: 'Figure',
            manualoverride: {
                overridenumbervalue: '22'
            },
            figuredata: {
                interactiveformat: "external-link",
                interactiveid: "",
                interactivetype: "3rd-party"
            },
            html: {
                ...element.html,
                postertext: '<p>text</p>'
            }
        }
        document.getElementById = () => {
            return {
                innerText: "innerText",
                innerHTML: "<p>innerHTML</p>"
            }
        }
        
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'validateLabelNumberSetting');
        autonumber_helperFunctions.validateLabelNumberSetting(props, updatedElement, removeClassesFromHtml, titleHTML, numberHTML, subtitleHTML, captionHTML, creditsHTML, oldImage, podwidth, smartlinkContexts, index, changeInPodwidth);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
})

describe('Test-18 generateDropdownDataForFigures', () => {
    it('Test-18.1---generateDropdownDataForFigures---', () => {
        let updatedElement = {
            ...element,
            contentUrn: 'urn:pearson:entity:af780ac6-84ee-411e-b0b8-fc9860a50cb4',
            figuretype: 'video'
        }
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'generateDropdownDataForFigures');
        autonumber_helperFunctions.generateDropdownDataForFigures(updatedElement);
        updatedElement = {...updatedElement, figuretype: 'interactive'};
        autonumber_helperFunctions.generateDropdownDataForFigures(updatedElement);
        updatedElement = {...updatedElement, figuretype: 'image'};
        autonumber_helperFunctions.generateDropdownDataForFigures(updatedElement);
        updatedElement = {...updatedElement, figuretype: 'tableasmarkup'};
        autonumber_helperFunctions.generateDropdownDataForFigures(updatedElement);
        updatedElement = {...updatedElement, figuretype: 'authoredtext'};
        autonumber_helperFunctions.generateDropdownDataForFigures(updatedElement);
        updatedElement = {...updatedElement, figuretype: 'codelisting'};
        autonumber_helperFunctions.generateDropdownDataForFigures(updatedElement);
        updatedElement = {...updatedElement, figuretype: 'element'};
        autonumber_helperFunctions.generateDropdownDataForFigures(updatedElement);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-18.2---generateDropdownDataForFigures---conditional coverage', () => {
        let updatedElement = {
            ...element,
            contentUrn: 'urn:pearson:entity:af780ac6-84ee-411e-b0b8-fc9860a50cb4'
        }
        delete updatedElement.figuretype;
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'generateDropdownDataForFigures');
        autonumber_helperFunctions.generateDropdownDataForFigures(updatedElement);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
})

describe('Test-19 generateDropdownDataForContainers', () => {
    it('Test-19.1---generateDropdownDataForContainers---', () => {
        let updatedElement = {
            ...element,
            contentUrn: 'urn:pearson:entity:af780ac6-84ee-411e-b0b8-fc9860a50cb4',
            subtype: 'sidebar'
        }
        const spyFunction = jest.spyOn(autonumber_helperFunctions, 'generateDropdownDataForContainers');
        autonumber_helperFunctions.generateDropdownDataForContainers(updatedElement);
        updatedElement = {...updatedElement, subtype: 'workedexample'};
        autonumber_helperFunctions.generateDropdownDataForContainers(updatedElement);
        updatedElement = {...updatedElement, subtype: 'element'};
        autonumber_helperFunctions.generateDropdownDataForContainers(updatedElement);
        delete updatedElement.subtype;
        autonumber_helperFunctions.generateDropdownDataForContainers(updatedElement);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
})