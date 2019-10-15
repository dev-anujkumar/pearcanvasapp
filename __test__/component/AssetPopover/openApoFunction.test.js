import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import ApiResults from '../../../src/component/AssetPopover/ApiResults';
import {openApoSearchFunction, authorAssetPopOver, saveAssetLinkedMedia, clearAssetPopoverLink} from '../../../src/component/AssetPopover/openApoFunction';

const getAssetPopoverId = new stub();
const getCurrentlyLinkedImage = new stub();
const returnValue = jest.fn();

describe('Testing openApoFunction files functions', () => {
    it('testing openApoSearchFunction function', () => {
        let apoObject = {
            title : {
                text : 'i'
            }
        }
        openApoSearchFunction(apoObject)
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
    }),
    it('testing saveAssetLinkedMedia function', () => {
        let apoObject = {
            title : {
                text : 'i'
            },
            assetId : 'xyz'
        }
        let imageObj = {
            "versionUrn": "urn:pearson:work:655702ea-43c4-49ac-81d4-173ec723ac12",
            "entityUrn": "urn:pearson:entity:600d4b18-d97d-4981-8d20-78d4f3c3cb06",
            "title": "Figure Image- interactive",
            "subTile": "",
            "path": "https://cite-media-stg.pearson.com/legacy_paths/ab9c96cf-36eb-4752-8eac-d968b7d8b2ee/MDM_EPM.jpg",
            "imageId": "urn:pearson:work:6f0a3911-30d4-4735-9355-249560f14a9c",
            "containerContentUrn": "urn:pearson:entity:cc8d16d5-4b68-4070-9277-930c70fe19d6"
        }

        let samplediv = document.createElement('abbr')
        samplediv.setAttribute('asset-id', 'xyz' );
        samplediv.innerHTML = "test"
        document.body.appendChild(samplediv)
        saveAssetLinkedMedia(apoObject, imageObj)
    })//,
    it('testing saveAssetLinkedMedia function else part', () => {
        let apoObject = {}
        let imageObj = {
            "versionUrn": "urn:pearson:work:655702ea-43c4-49ac-81d4-173ec723ac12",
            "entityUrn": "urn:pearson:entity:600d4b18-d97d-4981-8d20-78d4f3c3cb06",
            "title": "Figure Image- interactive",
            "subTile": "",
            "path": "https://cite-media-stg.pearson.com/legacy_paths/ab9c96cf-36eb-4752-8eac-d968b7d8b2ee/MDM_EPM.jpg",
            "imageId": "urn:pearson:work:6f0a3911-30d4-4735-9355-249560f14a9c",
            "containerContentUrn": "urn:pearson:entity:cc8d16d5-4b68-4070-9277-930c70fe19d6"
        }
        let samplediv = document.createElement('abbr');
        samplediv.setAttribute('id', 'asset-popover-attacher' );
        samplediv.innerHTML = "test";
        document.body.appendChild(samplediv);
        saveAssetLinkedMedia(apoObject, imageObj);
    }),
    it('testing clearAssetPopoverLink else part', () => {
        let samplediv = document.createElement('abbr');
        samplediv.setAttribute('asset-id', 'xyz' );
        samplediv.innerHTML = "test";
        document.body.appendChild(samplediv);
        let apoId = 'xyz';
        clearAssetPopoverLink(apoId)
    })
});