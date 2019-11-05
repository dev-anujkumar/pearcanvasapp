
import {showBlocker, hideBlocker, showBlockerSectionBreak, hideBlockerSectionBreak, showTocBlocker, showHeaderBlocker, hideTocBlocker, disableHeader} from '../../src/js/toggleLoader.js';

describe('Testing toggleLoader file', () => {
    it('function testing showBlocker', () =>{
        showBlocker()
    })
    it('function testing hideBlocker', () =>{
        hideBlocker()
    })
    it('function testing showBlockerSectionBreak', () =>{
        showBlockerSectionBreak()
    })
    it('function testing hideBlockerSectionBreak', () =>{
        hideBlockerSectionBreak()
    })
    it('function testing showTocBlocker', () =>{
        showTocBlocker()
    })
    it('function testing showHeaderBlocker', () =>{
        showHeaderBlocker()
    })
    it('function testing hideTocBlocker', () =>{
        hideTocBlocker()
    })
    
    it('function testing disableHeader', () =>{
        disableHeader()
    })

});
