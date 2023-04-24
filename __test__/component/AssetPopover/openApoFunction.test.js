import {openApoSearchFunction, authorAssetPopOver, clearAssetPopoverLink} from '../../../src/component/AssetPopover/openApoFunction';

describe('Testing openApoFunction files functions', () => {
    it('testing openApoSearchFunction function > if', () => {
        let apoObject = {
            title : {
                text : 'i'
            }
        }
        openApoSearchFunction(apoObject)
    }),
    it('testing openApoSearchFunction function > else', () => {
        let apoObject = {}
        openApoSearchFunction(apoObject)
    }),
    it('testing clearAssetPopoverLink function', () => {
        document.querySelector = () => {
            return {
                querySelector: () => {
                    return {}
                }
            }
        }
        let assetPopoverID = "test"
        clearAssetPopoverLink(assetPopoverID)
    }),
    it('testing authorAssetPopOver function', () => {
        let apoObject = {
            title : {
                text : 'i'
            }
        }
        let toggleApoPopup = true;
        authorAssetPopOver(toggleApoPopup, apoObject)
    }),
    it('testing authorAssetPopOver else part', () => {
        let toggleApoPopup = true;
        authorAssetPopOver(toggleApoPopup)
    })
});