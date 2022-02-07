/**************************Import Modules**************************/
import config from '../../../src/config/config';
import { LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES } from '../../../src/component/FigureHeader/AutoNumberConstants';
import * as autonumber_helperFunctions from '../../../src/component/FigureHeader/AutoNumber_helperFunctions';
/*************************Import Constants*************************/
import { mockSlateFiguresList, mockAutoNumberingDetails, slateAncestorFM, slateAncestorBM, slateAncestorPart, slateAncestorChapter, slateAncestorChapterwithMod, mockIndexedElements } from './AutoNumberApiTestData';

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
            expect(result).toBe('Interactive')
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
            params.labelNumberSetting = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES.AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER;
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
    })
    describe('Test-5 getContainerNumber-----------------', () => {
        let autoNumberingDetails = mockAutoNumberingDetails
        it('Test-4.1---getContainerNumber---FM', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getContainerNumber');
            let result = autonumber_helperFunctions.getContainerNumber(slateAncestorFM, autoNumberingDetails);
            expect(result).toBe('F')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-4.2---getContainerNumber---BM', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getContainerNumber');
            let result = autonumber_helperFunctions.getContainerNumber(slateAncestorBM, autoNumberingDetails);
            expect(result).toBe('B')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-4.3---getContainerNumber---Part', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getContainerNumber');
            let result = autonumber_helperFunctions.getContainerNumber(slateAncestorPart, autoNumberingDetails);
            expect(result).toBe('P1')
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-4.4---getContainerNumber---Chapter', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getContainerNumber');
            let result = autonumber_helperFunctions.getContainerNumber(slateAncestorChapter, autoNumberingDetails);
            expect(result).toBe(1)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-4.5---getContainerNumber---Chapter with Module', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getContainerNumber');
            let result = autonumber_helperFunctions.getContainerNumber(slateAncestorChapterwithMod, autoNumberingDetails);
            expect(result).toBe(2)
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
            expect(result).toBe('Fig')
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
    })
    describe('Test-7 getNumberData-----------------', () => {
        let element2 = {
            displayedlabel: 'Figure',
            contentUrn: "urn:pearson:entity:a4719e78-a66b-4356-ac62-7591a42d070d",
            figuretype: "image"
        }
        it('Test-7.1---getNumberData---default cases', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getNumberData');
            let result = autonumber_helperFunctions.getNumberData("backMatter", element2, mockIndexedElements)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-7.2---getNumberData---default cases', () => {
            const spyFunction = jest.spyOn(autonumber_helperFunctions, 'getNumberData');
            let result = autonumber_helperFunctions.getNumberData("", element2, mockIndexedElements)
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
    })
})