import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import {apoSearchCloseAction, removeAssetLinkAction, selectedFigureAction, apoSearchSaveAction, getCurrentlyLinkedImage, assetPopoverPopup, getAssetPopoverId, searchForFiguresAction} from '../../../src/component/AssetPopover/AssetPopover_Actions';

describe('Testing Actions', () => {
    it('testing apoSearchCloseAction function', () => {
        apoSearchCloseAction();
    }),
    it('testing removeAssetLinkAction function', () => {
        removeAssetLinkAction();
    }),
    it('testing selectedFigureAction function', () => {
        selectedFigureAction();
    }),
    it('testing apoSearchSaveAction function', () => {
        apoSearchSaveAction();
    }),
    it('testing getCurrentlyLinkedImage function', () => {
        let id = '123';
        let cb = jest.fn();
        getCurrentlyLinkedImage(id, cb);
    }),
    it('testing assetPopoverPopup function', () => {
        assetPopoverPopup();
    }),
    xit('testing getAssetPopoverId function', () => {
        let cb = jest.fn();
        getAssetPopoverId(cb);
    })
});
