export const OnCopyContext=(e,toggleFunction,isSb)=> {

    if (e.currentTarget.classList.contains('activeTagBgColor')) {
        const parentPosition = getParentPosition(e.currentTarget);
        const scrollTop = document.getElementById('slateWrapper').scrollTop;

        const xOffSet = isSb ? -30 : 0;
        const yOffSet = isSb ? 5 : 10
        const copyClickedX = e.clientX - parentPosition.x + xOffSet;
        const copyClickedY = e.clientY - parentPosition.y + scrollTop + yOffSet;
        toggleFunction(true,copyClickedX,copyClickedY)
        e.preventDefault();
    }
}

const getParentPosition = (el) => {
    var xPos = 0;
    var yPos = 0;

    while (el) {
        if (el.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return { x: xPos, y: yPos }
}