window.Element.prototype.matches = null
window.Element.prototype.webkitMatchesSelector = null
window.Element.prototype.closest = null

// IMPORT - dependencies
require('../../../src/component/ListElement/polyfills.js')

describe('Polyfills Test Suit', () => {
    (function () {
        let __document = new DOMParser().parseFromString(`
        <div class='container-element' style="counter-increment:2">
            <span class='first-child editor-elem'></span>
            <span class='second-child editor-elem'></span>
        </div>`,
            'text/html')
        document.body.replaceWith(__document.body)
    })()

    it('test matches polyfill on non-text element', () => {
        expect(document.querySelector('.first-child').matches('.editor-elem')).toBe(true)
    })
    it('test closest polyfill on text element', () => {
        let text = new Text("sample text")
        document.querySelector('.first-child').appendChild(text)
        let matchedElm = text.closest('.first-child')
        expect(matchedElm.classList.contains('first-child')).toBe(true)
    })
    it('test closest polyfill on non-text element', () => {
        let matchedElm = document.querySelector('.first-child').closest('.first-child')
        expect(matchedElm.classList.contains('first-child')).toBe(true)
    })
    it('test parents polyfill on non-text element', () => {
        let matchedElm = document.querySelector('.first-child').parents('.container-element')
        expect(matchedElm.classList.contains('container-element')).toBe(true)
    })
    it('test parents polyfill on text element', () => {
        let text = new Text("sample child text")
        document.querySelector('.first-child').appendChild(text)
        let matchedElm = text.parents('.container-element')
        expect(matchedElm.classList.contains('container-element')).toBe(true)
    })
    it('test findChildren polyfill on non-text element', () => {
        expect(document.querySelector('.container-element').findChildren('.editor-elem').length).toBe(2)
    })
    it('test removeAllClass polyfill on non-text element', () => {
        let matchedElm = document.querySelector('.second-child')
        matchedElm.removeAllClass()
        expect(matchedElm.classList.length).toBe(0)
    })
    it('test getCss polyfill on non-text element', () => {
        expect(document.querySelector('.container-element').getCss('counter-increment')).toBe("2")
    })
})