export const node1 = {
    tagName: "OL",
    classList: {
        add: jest.fn()
    },
    innerHTML: "TEST",
    setAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    firstElementChild: {
        tagName: "LI",
        classList: {
            add: jest.fn()
        },
        innerHTML: "TEST",
        setAttribute: jest.fn(),
        removeAttribute: jest.fn(),
        previousSibling: {
            tagName: "OL"
        },
        nextElementSibling: {
            tagName: "OL",
            classList: {
                add: jest.fn()
            },
            children: [{
                tagName: "li",
                classList: {
                    add: jest.fn()
                },
                innerHTML: "DUMMY",
                removeAttribute: jest.fn()
            }],
            innerHTML: "TEST",
            setAttribute: jest.fn(),
            getAttribute: jest.fn().mockImplementationOnce = () => {
                return 'list-style-type:lower-alpha;'
            }
        }
    },
    children: [{
        tagName: "li",
        classList: {
            add: jest.fn()
        },
        innerHTML: "DUMMY",
        removeAttribute: jest.fn()
    }, {
        tagName: "li",
        classList: {
            add: jest.fn()
        },
        innerHTML: "DUMMY",
        removeAttribute: jest.fn(),
        previousElementSibling: {
            tagName: "p"
        }
    }]
}

export const node2 = {
    tagName: "OL",
    classList: {
        add: jest.fn()
    },
    innerHTML: "TEST",
    setAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    firstElementChild: {
        tagName: "P",
        classList: {
            add: jest.fn()
        },
        innerHTML: "TEST",
        setAttribute: jest.fn(),
        removeAttribute: jest.fn(),
        nextElementSibling: {
            tagName: "OL",
            classList: {
                add: jest.fn()
            },
            children: [{
                tagName: "li",
                classList: {
                    add: jest.fn()
                },
                innerHTML: "DUMMY",
                removeAttribute: jest.fn()
            }],
            innerHTML: "TEST",
            setAttribute: jest.fn(),
            getAttribute: jest.fn().mockImplementationOnce = () => {
                return 'list-style-type:lower-alpha;'
            }
        }
    },
    children: [{
        tagName: "li",
        classList: {
            add: jest.fn()
        },
        innerHTML: "DUMMY",
        removeAttribute: jest.fn()
    }, {
        tagName: "li",
        classList: {
            add: jest.fn()
        },
        innerHTML: "DUMMY",
        removeAttribute: jest.fn(),
        previousElementSibling: {
            tagName: "p"
        }
    }]
}

export const node3 = {
    tagName: "OL",
    classList: {
        add: jest.fn()
    },
    innerHTML: "TEST",
    setAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    firstElementChild: {
        tagName: "LI",
        classList: {
            add: jest.fn()
        },
        innerHTML: "TEST",
        setAttribute: jest.fn(),
        removeAttribute: jest.fn(),
        nextElementSibling: {
            tagName: "OL",
            classList: {
                add: jest.fn()
            },
            children: [{
                tagName: "li",
                classList: {
                    add: jest.fn()
                },
                innerHTML: "DUMMY",
                removeAttribute: jest.fn()
            }],
            innerHTML: "TEST",
            setAttribute: jest.fn(),
            getAttribute: jest.fn().mockImplementationOnce = () => {
                return 'list-style-type:lower-alpha;'
            }
        }
    },
    children: [{
        tagName: "li",
        classList: {
            add: jest.fn()
        },
        innerHTML: "DUMMY",
        removeAttribute: jest.fn()
    }, {
        tagName: "li",
        classList: {
            add: jest.fn()
        },
        innerHTML: "DUMMY",
        removeAttribute: jest.fn(),
        previousElementSibling: {
            tagName: "p"
        }
    }]
}

export const node4 = {
    tagName: "UL",
    classList: {
        add: jest.fn()
    },
    innerHTML: "TEST",
    setAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    firstElementChild: {
        tagName: "LI",
        parentElement: {
            tagName: "UL"
        },
        classList: {
            add: jest.fn()
        },
        innerHTML: "TEST",
        setAttribute: jest.fn(),
        removeAttribute: jest.fn()
    },
    nextElementSibling: {
        tagName: "LI",
        parentElement: {
            tagName: "OL"
        },
        classList: {
            add: jest.fn()
        },
        setAttribute: jest.fn(),
        removeAttribute: jest.fn()
    }
}