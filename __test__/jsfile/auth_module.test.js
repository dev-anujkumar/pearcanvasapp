jest.mock('../../src/config/config.js');
let config_object = {
    WRAPPER_URL : 'http',
    IDENTITY_URL : 'http',
}
const WRAPPER_URL = config_object.WRAPPER_URL;
const IDENTITY_URL = config_object.IDENTITY_URL;
let environment = config_object.NODE_ENV;


let session_token = "";
var BASE_URL;
config_object.ssoToken = '12314213123123'

describe('Testing Auth if else conditions', () => {
    it('config_object.IDENTITY_URL', () => {
        config_object.IDENTITY_URL = jest.fn()
    })

    it('Develop environment testing', () => {
        config_object.IDENTITY_URL = jest.fn()
    })
    it('Develop environment development testing', () => {
        config_object.NODE_ENV = 'development'
    })

    
});