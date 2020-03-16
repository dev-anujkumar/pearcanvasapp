import React from 'react';
import {matchHTMLwithRegex,encodeHTMLInWiris} from '../../src/constants/utility.js';



describe('Testing Function - matchHTMLwithRegex', () => {
    it('Case 1- with Html - false',()=>{
        let htmlData = <img align="middle" class="temp_Wirisformula" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAPCAYAAACSol3eAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAABGJhU0UAAAAOJ5y/mQAAAZpJREFUeNpjYMAOyoD4BBBvAeJjQDwBiDkZBiFQAWIuJD7IoUupbAcjLRzOC8SfgVidgDozIP4PxKZEmHkaqpYQPkmqY0EacgmoWQjEB4B4ARHmJUDV4wMgcxJJdehGIJ6ER14EiJ8AsRAQPwViYQLmcUDV41InDDWHk1AUtkHT5SRoVK4B4kV49IAyYBeU3QPEpUR4vhuqD5d53fjS4mogng3EWlBfBwHxByC+BcRzcehjBuI7QKwE5StD+UwEHKqEQx2IfxvJPAywF4jnYRGvhibsRhz6fKBFGTLYBsReRIQqSJ03mhiIvxWXBk8g/gXEsljkYqEOdcNjmRcRjscGsDkKm+PhoB+Ir+CQqwLiF0DMgkVOGRpNTASSAy7AhKZOiVCyWYonBA7iSfSgjFOCJ0N0EhGqyBmxm1BGBIXobizioCi9DM1Y6ICTQBEDK7I4CDhUGKpOkIB5YGADxO+BmAcpSuKB+AKe6EvEkfnQK4E4IkJ1AbSymE9MoV4AzfmrgHgHENdCiyxc4BQVq0FTEqpfmgFmSg0AAMaKY79jtweTAAAAcnRFWHRNYXRoTUwAPG1hdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwiPjxtbz4mI3gyMjAyOzwvbW8+PG1vPiYjeDIyMDY7PC9tbz48bW8+JiN4MjIwNzs8L21vPjwvbWF0aD4AQV47AAAAAElFTkSuQmCC" data-temp-mathml="«math xmlns=¨http://www.w3.org/1998/Math/MathML¨»«mo»§#8706;«/mo»«mo»§#8710;«/mo»«mo»§#8711;«/mo»«/math»" alt="partial differential increment nabla" role="math" style="max-width: none;" height="19" width="42"></img>
        let expectedData = false;
        let returnData = matchHTMLwithRegex(htmlData);

        expect(returnData).toBe(expectedData);
    })
    it('Case 2- without Html',()=>{
        let htmlData = ""
        let expectedData = false;
        let returnData = matchHTMLwithRegex(htmlData);

        expect(returnData).toBe(expectedData);
    })
    it('Case 3- with Html - true',()=>{
        let htmlData = "<p></p>"
        let expectedData = true;
        let returnData = matchHTMLwithRegex(htmlData);

        expect(returnData).toBe(expectedData);
    })

})

describe('Testing Function - encodeHTMLInWiris', () => {
    it('Case 1- When Wiris content is present',()=>{
        let strData = '<p><img align="middle" class="temp_Wirisformula" src="data:image/png;base64,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" data-temp-mathml="«math xmlns=¨http://www.w3.org/1998/Math/MathML¨ class=¨¨»«mi»m«/mi»«mi»a«/mi»«mi»t«/mi»«mi»h«/mi»«mi»M«/mi»«mi»L«/mi»«mo»&amp;nbsp;«/mo»«mi»t«/mi»«mi»e«/mi»«mi»x«/mi»«mi»t«/mi»«mo»-«/mo»«mi mathvariant=¨normal¨»π«/mi»«mo»∞«/mo»«mo»∅«/mo»«mo»∆«/mo»«mo»∂«/mo»«/math»" alt="m a t h M L space t e x t minus straight pi infinity empty set increment partial differential" role="math"></p>'
        let expectedData = '<p><img align="middle" class="temp_Wirisformula" src="data:image/png;base64,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" data-temp-mathml="«math xmlns=¨http://www.w3.org/1998/§#924;ath/§#924;ath§#924;L¨ class=¨¨»«mi»m«/mi»«mi»a«/mi»«mi»t«/mi»«mi»h«/mi»«mi»§#924;«/mi»«mi»L«/mi»«mo»§#160;«/mo»«mi»t«/mi»«mi»e«/mi»«mi»x«/mi»«mi»t«/mi»«mo»-«/mo»«mi mathvariant=¨normal¨»§#960;«/mi»«mo»§#8734;«/mo»«mo»§#8709;«/mo»«mo»∆«/mo»«mo»§#8706;«/mo»«/math»"  role="math"></p>';
        let returnData = encodeHTMLInWiris(strData);

        expect(returnData).toBe(expectedData);
    })
    it('Case 2- When Wiris content is  not present',()=>{
        let strData = '<p>fdsdfsf</p>'
        let expectedData = '<p>fdsdfsf</p>';
        let returnData = encodeHTMLInWiris(strData);

        expect(returnData).toBe(expectedData);
    })
    it('Case 3- When str is blank',()=>{
        let strData = ''
        let expectedData = undefined;
        let returnData = encodeHTMLInWiris(strData);

        expect(returnData).toBe(expectedData);
    })
})