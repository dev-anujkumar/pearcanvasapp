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
        getAttribute: jest.fn(),
        outerHTML:"<p>TEST<p/>"
    }],
    outerHTML:"<p>TEST<p/>"
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
    }],
    outerHTML:"<p>TEST<p/>"
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

export const elementsData = [
    {
        "html": '<p class="paragraphNumeroUno">It is a <strong>long-established</strong> fact that a <sup>reader</sup> will be <strong>distracted</strong> by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English</p>',
        "tagName": "P"
    },
    {
        "html": '<p><img src="blob:https://local-dev.pearson.com/b559dfbb-9fc2-4135-a240-823cdf1aa738"></p>',
        "tagName": "IMG"
    },
    {
        "html": '<p class="paragraphNumeroUno">Sdasdas</p>',
        "tagName": "P"
    }
]

export const pasteElementNodeData = {
    childNodes:[{outerHTML:'<p class="paragraphNumeroUno">It is a <strong>long-established</strong> fact that a <sup>reader</sup> will be <strong>distracted</strong> by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English</p>'},{outerHTML:'<p><img src="blob:https://local-dev.pearson.com/b559dfbb-9fc2-4135-a240-823cdf1aa738"></p>'},{outerHTML:'<p class="paragraphNumeroUno">Sdasdas</p></div>'},{data:"\n  \n\n\n"}]
}