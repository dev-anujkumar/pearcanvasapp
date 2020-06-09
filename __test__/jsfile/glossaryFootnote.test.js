import { getGlossaryFootnoteId } from '../../src/js/glossaryFootnote';
import axios from 'axios';
jest.mock('../../src/config/config.js', () => ({
    slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
    ASSET_POPOVER_ENDPOINT:"https://contentapis-staging.pearsoncms.net/manifest-api/",
    REACT_APP_API_URL :"https://10.11.7.246:8443/cypress-api/",
    STRUCTURE_APIKEY:'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
    PRODUCTAPI_ENDPOINT:"https://contentapis-staging.pearsoncms.net/product-api/",
    projectUrn: "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef",
    parentEntityUrn : "bodyMatter",
    slateType: "assessment"
}))
jest.mock('axios');
describe("Testing glossaryFootnote.js file",() => {
    let elementId ='urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b';
    let enumType = 'footnote';
    let booleanValue = '';
    let callback = (res) => {
        if(res){
            booleanValue = true;
            expect(res).toEqual(true); 
        }
        else{
            booleanValue = false;
            expect(res).toEqual(false);  
        }
        jest.fn();
    };
    it('testing for getGlossaryFootnoteId function and expecting response to true',() =>{
        axios.post.mockImplementation(() => Promise.resolve(true));
        getGlossaryFootnoteId(elementId,enumType,callback);
        setTimeout(()=>{
            expect(booleanValue).toEqual(true);
        },1000)
        
    }) 
    it('testing for getGlossaryFootnoteId function and expecting response to false',() =>{
        axios.post.mockImplementation(() => Promise.resolve(false));
        getGlossaryFootnoteId(elementId,enumType,callback);
        setTimeout(()=>{
            expect(booleanValue).toEqual(false);
        },1000)
    }) 
    it('testing for getGlossaryFootnoteId function and expecting response in catch',() =>{
        axios.post.mockImplementation(() => Promise.reject(false));
        getGlossaryFootnoteId(elementId,enumType,callback);
        setTimeout(()=>{
            expect(booleanValue).toEqual(false);
        },1000)
    }) 
})
