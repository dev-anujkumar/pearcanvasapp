import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.css";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import "tinymce/plugins/paste";
import config from '../../src/config/config';
import { insertMediaSelectors, FormatSelectors } from '../../src/config/EditorConfig.js';
jest.mock('../../src/js/TinyMceUtility.js', () => ({
    handleC2MediaClick:()=>{}
}))
config.userId= 'c5test01';
describe('Testing TinyMceEditor - EditorConfig', () => {

    it('Test - insertMediaSelectors - List Element',()=>{
        let params = {
            editor:{},
            permissions:{},
            element:{
                type:"element-list"
            }
        }
        const dropdownMenu = insertMediaSelectors(params);
        dropdownMenu[0].onAction();
        expect(dropdownMenu[0].text).toBe('Image');
    });
    it('Test - insertMediaSelectors - Other Element',()=>{
        let params = {
            editor:{},
            permissions:{},
            element:{
                type:"stanza"
            }
        }
        const dropdownMenu = insertMediaSelectors(params);
        dropdownMenu[0].onAction();
        expect(dropdownMenu[0].text).toBe('Image');
    });
    it('Test - FormatSelectors - Other Element',()=>{
        let callback = (arg)=>{
            return arg
        }
        const dropdownMenu = FormatSelectors(callback);
        dropdownMenu[0].onAction();
        expect(dropdownMenu[0].type).toBe('menuitem');
    });
})