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

export const nodePara1 = [{
    tagName: "P",
    classList: {
        add: jest.fn()
    },
    innerHTML: "TEST",
    setAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    children: [{
        tagName: "IMG",
        getAttribute: jest.fn()
    }]
}]

export const nodePara2 = [{
    tagName: "P",
    classList: {
        add: jest.fn()
    },
    innerHTML: "TEST",
    setAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    children: [{
        tagName: "P",
        getAttribute: jest.fn()
    }]
}]

export const nodeUL = [{
    tagName: "UL",
    classList: {
        add: jest.fn()
    },
    innerHTML: "TEST",
    setAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    children: [{
        tagName: "P",
        getAttribute: jest.fn(),
        classList: {
            add: jest.fn()
        }
    }]
}]

export const nodeOL = [{
    tagName: "OL",
    hasAttribute: jest.fn(() => false),
    classList: {
        add: jest.fn()
    },
    innerHTML: "TEST",
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    children: [{
        tagName: "P",
        getAttribute: jest.fn(),
        classList: {
            add: jest.fn()
        }
    }]
}]

export const nodeOLWithStyle = [{
    tagName: "OL",
    style: 'numbered',
    hasAttribute: jest.fn(() => true),
    classList: {
        add: jest.fn()
    },
    innerHTML: "TEST",
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    children: [{
        tagName: "P",
        getAttribute: jest.fn(),
        removeAttribute: jest.fn(),
        classList: {
            add: jest.fn()
        },
        innerHTML: {
            replace: () => ({
                replace: () => ({
                    replace: jest.fn()
                })
            })
        }
    }]
}]

export const nodeIMG = [{
    tagName: "IMG",
    style: 'numbered',
    hasAttribute: jest.fn(() => true),
    src: "testing data",
    classList: {
        add: jest.fn()
    },
    innerHTML: "TEST",
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    children: [{
        tagName: "P",
        getAttribute: jest.fn(),
        removeAttribute: jest.fn(),
        classList: {
            add: jest.fn()
        },
        innerHTML: {
            replace: () => ({
                replace: () => ({
                    replace: jest.fn()
                })
            })
        }
    }]
}]

export const nodeHEADING = [{
    tagName: "H1",
    style: 'numbered',
    hasAttribute: jest.fn(() => true),
    src: "testing data",
    classList: {
        add: jest.fn()
    },
    innerHTML: "TEST",
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    children: [{
        tagName: "P",
        getAttribute: jest.fn(),
        removeAttribute: jest.fn(),
        classList: {
            add: jest.fn()
        },
        innerHTML: {
            replace: () => ({
                replace: () => ({
                    replace: jest.fn()
                })
            })
        }
    }]
}]