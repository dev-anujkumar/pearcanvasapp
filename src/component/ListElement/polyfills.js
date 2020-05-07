/**
 * Module - polyfills
 * Description - contain polyfills for jQuery dependencies
 */

const _window_ = window

// matches polyfill
_window_.Element && function (ElementPrototype) {
    ElementPrototype.matches = ElementPrototype.matches ||
        ElementPrototype.matchesSelector ||
        ElementPrototype.webkitMatchesSelector ||
        ElementPrototype.msMatchesSelector ||
        function (selector) {
            var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;
            while (nodes[++i] && nodes[i] != node);
            return !!nodes[i];
        }
}(Element.prototype);

// matches polyfill for Text
_window_.Text && function (TextPrototype) {
    TextPrototype.matches = TextPrototype.matches ||
        TextPrototype.matchesSelector ||
        TextPrototype.webkitMatchesSelector ||
        TextPrototype.msMatchesSelector ||
        function (selector) {
            var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;
            while (nodes[++i] && nodes[i] != node);
            return !!nodes[i];
        }
}(Text.prototype);

// closest polyfill
_window_.Element && function (ElementPrototype) {
    ElementPrototype.closest = ElementPrototype.closest ||
        function (selector) {
            var el = this;
            while (el.matches && !el.matches(selector)) el = el.parentNode;
            return el.matches ? el : null;
        }
}(Element.prototype);

// closest polyfill for Text
_window_.Text && function (TextPrototype) {
    TextPrototype.closest = TextPrototype.closest ||
        function (selector) {
            var el = this;
            while (el.matches && !el.matches(selector)) el = el.parentNode;
            return el.matches ? el : null;
        }
}(Text.prototype);

// parents polyfill
_window_.Element && function (ElementPrototype) {
    ElementPrototype.parents = ElementPrototype.parents ||
        function (selector) {
            var el = this.parentNode;
            while (el.matches && !el.matches(selector)) el = el.parentNode;
            return el.matches ? el : null;
        }
}(Element.prototype);

// parents polyfill for Text
_window_.Text && function (TextPrototype) {
    TextPrototype.parents = TextPrototype.parents ||
        function (selector) {
            var el = this.parentNode;
            while (el.matches && !el.matches(selector)) el = el.parentNode;
            return el.matches ? el : null;
        }
}(Text.prototype);

// children(selector) polyfill
_window_.Element && function (ElementPrototype) {
    ElementPrototype.findChildren = ElementPrototype.findChildren ||
        function (selector) {
            let childrens = this.children.length ? [...this.children] : []
            return childrens.filter((elem) => elem.matches(selector))
        }
}(Element.prototype);

// removeClass() polyfill
_window_.Element && function (ElementPrototype) {
    ElementPrototype.removeAllClass = ElementPrototype.removeAllClass ||
        function () {
            let classes = [...this.classList];
            classes.forEach((selector) => {
                this.classList.remove(selector);
            });
        }
}(Element.prototype);

// css polyfill
_window_.Element && function (ElementPrototype) {
    ElementPrototype.getCss = ElementPrototype.getCss ||
        function (selector) {
            // getComputedStyle for modern browsers, currentStyle for IE
            var style = window.getComputedStyle ? getComputedStyle(this, null) : el.currentStyle;
            return style[selector];
        }
}(Element.prototype);