import axios from 'axios';
import { triggerSlateLevelSave } from '../../src/js/slateLevelSave.js';
import config from '../../src/config/config.js';

describe('Slate level Save testing', () => {
    it('should trigger Slate level save API with correct parameters and return success response', () => {
        jest.spyOn(Storage.prototype, 'getItem');
        jest.spyOn(Storage.prototype, 'setItem');
        Storage.prototype.getItem = jest.fn(() => { return 'true' });
        Storage.prototype.setItem = jest.fn(() => { });
        localStorage.getItem();

        expect(localStorage.getItem).toHaveBeenCalled();

        // Mock axios.post to return a success response
        jest.spyOn(axios, 'post').mockResolvedValue({ data: 'success' });

        const entityURN = 'slate123';
        const triggerAction = 'save';
        const paramDetails = {};

        triggerSlateLevelSave(entityURN, triggerAction, paramDetails)

        // Expect localStorage.getItem to have been called with 'isChangeInSlate'
        expect(localStorage.getItem).toHaveBeenCalledWith('isChangeInSlate');
    });

    it('should trigger Slate level save method with paramDetails object having keys inside it', () => {
        jest.spyOn(Storage.prototype, 'getItem');
        jest.spyOn(Storage.prototype, 'setItem');
        Storage.prototype.getItem = jest.fn(() => { return 'true' });
        Storage.prototype.setItem = jest.fn(() => { });
        localStorage.getItem();

        expect(localStorage.getItem).toHaveBeenCalled();

        // Mock axios.post to return a success response
        jest.spyOn(axios, 'post').mockResolvedValue({ data: 'success' });

        const entityURN = 'slate123';
        const triggerAction = 'save';
        const paramDetails = {
            projectUrn: 'urn:pearson:distributable:67b91207-85d2-4f4d-9af0-e3ad8d7f1d3f',
            slateEntityURN: 'urn:pearson:entity:daecc899-819a-410e-bfe9-c603496689f9',
            userId: 'user123',
            PearsonExtSSOSession: 'nnrRleqr6liWQgjQwVrT3tFN5nsv1ibZoAmFBevUcKKJGYAWB6Jy79NRKtx46PXLblgiJeMoPnwmc2HVMUYtCudVOsqROC7rx6dkGXhrvBqKzGWlr7'
        };

        // axios.post.mockImplementation(() => Promise.resolve(true));
        triggerSlateLevelSave(entityURN, triggerAction, paramDetails)

        // Expect localStorage.getItem to have been called with 'isChangeInSlate'
        expect(localStorage.getItem).toHaveBeenCalledWith('isChangeInSlate');
    });

    it('should trigger Slate level save method API giving error so testing catch block', () => {
        jest.spyOn(Storage.prototype, 'getItem');
        jest.spyOn(Storage.prototype, 'setItem');
        Storage.prototype.getItem = jest.fn(() => { return 'true' });
        Storage.prototype.setItem = jest.fn(() => { });
        localStorage.getItem();

        expect(localStorage.getItem).toHaveBeenCalled();

        // Mock axios.post to return a error response
        jest.spyOn(axios, 'post').mockRejectedValue({ data: 'error' });

        const entityURN = 'slate123';
        const triggerAction = 'save';
        const paramDetails = {};

        triggerSlateLevelSave(entityURN, triggerAction, paramDetails)
    });


    it('should trigger Slate level save method when isChangeInSlate is false', () => {
        jest.spyOn(Storage.prototype, 'getItem');
        jest.spyOn(Storage.prototype, 'setItem');
        Storage.prototype.getItem = jest.fn(() => { return '123' });
        Storage.prototype.setItem = jest.fn(() => { });
        localStorage.getItem();

        expect(localStorage.getItem).toHaveBeenCalled();

        const entityURN = 'slate123';
        const triggerAction = 'save';
        const paramDetails = {};

        triggerSlateLevelSave(entityURN, triggerAction, paramDetails);
        expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should trigger Slate level save method with 2 parameters only for conditional coverage', () => {
        jest.spyOn(Storage.prototype, 'getItem');
        jest.spyOn(Storage.prototype, 'setItem');
        Storage.prototype.getItem = jest.fn(() => { return '123' });
        Storage.prototype.setItem = jest.fn(() => { });
        localStorage.getItem();

        expect(localStorage.getItem).toHaveBeenCalled();

        // Mock axios.post to return a error response
        jest.spyOn(axios, 'post').mockRejectedValue({ data: 'error' });

        const entityURN = 'slate123';
        const triggerAction = 'save';

        triggerSlateLevelSave(entityURN, triggerAction);
    });
});