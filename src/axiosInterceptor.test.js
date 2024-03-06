import axios from 'axios';
import { errorHandler, interceptor } from './axiosInterceptor.js';

describe('errorHandler', () => {
    it('should log "Invalid Request" for status code 400', () => {
        const err = { response: { status: 400 } };
        console.log = jest.fn();
        errorHandler(err);
        expect(console.log).toHaveBeenCalledWith('Invalid Request');
    });

    it('should log "Unauthorized" and call redirect for status code 401', () => {
        const err = { response: { status: 401 } };
        console.log = jest.fn();
        errorHandler(err);
        expect(console.log).toHaveBeenCalledWith('Unauthorized');
    });

    it('should log "This is Approved Content.Please create new version." for status code 403', () => {
        const err = { response: { status: 403 } };
        console.log = jest.fn();
        errorHandler(err);
        expect(console.log).toHaveBeenCalledWith('This is Approved Content.Please create new version.');
    });

    it('should log "Server Error: Please check you token" for status code 500 and call redirect if response data contains "401" or "UNAUTHORIZED"', () => {
        const err = { response: { status: 500, data: "UNAUTHORIZED" } };
        console.log = jest.fn();
        errorHandler(err);
        expect(console.log).toHaveBeenCalledWith('Server Error: Please check you token', err.response);
    });

    it('should log "Unwanted Error" for any other status code', () => {
        const err = { response: { status: 404 } };
        console.log = jest.fn();
        errorHandler(err);
        expect(console.log).toHaveBeenCalledWith('Unwanted Error');
    });
});

describe('interceptor', () => {
    it('should set defaults and intercept responses using errorHandler', () => {
        axios.defaults.withCredentials = false;
        interceptor();
        expect(axios.defaults.withCredentials).toBe(true);

    });
});
