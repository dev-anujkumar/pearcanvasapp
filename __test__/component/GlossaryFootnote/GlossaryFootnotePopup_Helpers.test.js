import * as glossaryFootnotePopupHelpers from "../../../src/component/GlossaryFootnotePopup/GlossaryFootnotePopup_Helpers.js";

let e = {
    target: {
        id: "glossary-1"
    },
    keyCode: 9,
    preventDefault: () => jest.fn()
}

describe("Testing Glossary Footnote Popup Helpers", () => {
    describe("Testing handleKeyDownHelper", () => {
        document.getElementById = (value) => {
            switch (value) {
                case "glossary-save-button":
                    return {
                        tabIndex: "0",
                        classList: {
                            contains: () => false,
                            add: () => jest.fn(),
                            remove: () => jest.fn()
                        },
                        contains: () => false,
                        focus: () => jest.fn(),
                        blur: () => jest.fn(),
                        click: () => jest.fn()
                    }
                case "glossary-cancel-button":
                    return {
                        tabIndex: "0",
                        classList: {
                            contains: () => true,
                            add: () => jest.fn(),
                            remove: () => jest.fn()
                        },
                        contains: () => true,
                        focus: () => jest.fn(),
                        blur: () => jest.fn(),
                        click: () => jest.fn()
                    }
                default:
                    return {
                        tabIndex: "0",
                        classList: {
                            contains: () => true,
                            add: () => jest.fn(),
                            remove: () => jest.fn()
                        },
                        contains: () => true,
                        focus: () => jest.fn(),
                        blur: () => jest.fn(),
                        click: () => jest.fn()
                    }
            }
        }
        it("e.keyCode === 9", () => {
            let event = {
                ...e,
                keyCode: 9
            }
            const spyhandleKeyDownHelper = jest.spyOn(glossaryFootnotePopupHelpers, 'handleKeyDownHelper')
            glossaryFootnotePopupHelpers.handleKeyDownHelper(event)
            expect(spyhandleKeyDownHelper).toHaveBeenCalled()
            spyhandleKeyDownHelper.mockClear()
        })
        describe("e.keyCode === 13", () => {
            let event = {
                ...e,
                keyCode: 13
            }
            it("isPrimaryButtonFocused", () => {
                document.getElementById = (value) => {
                    switch (value) {
                        case "glossary-save-button":
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => true,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                contains: () => true,
                                focus: () => jest.fn(),
                                blur: () => jest.fn(),
                                click: () => jest.fn()
                            }
                        case "glossary-cancel-button":
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => false,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                contains: () => false,
                                focus: () => jest.fn(),
                                blur: () => jest.fn(),
                                click: () => jest.fn()
                            }
                        default:
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => true,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                contains: () => true,
                                focus: () => jest.fn(),
                                blur: () => jest.fn(),
                                click: () => jest.fn()
                            }
                    }
                }
                const spyhandleKeyDownHelper = jest.spyOn(glossaryFootnotePopupHelpers, 'handleKeyDownHelper')
                glossaryFootnotePopupHelpers.handleKeyDownHelper(event)
                expect(spyhandleKeyDownHelper).toHaveBeenCalled()
                spyhandleKeyDownHelper.mockClear()
            })
            it("isSecondaryButtonFocused", () => {
                document.getElementById = (value) => {
                    switch (value) {
                        case "glossary-save-button":
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => false,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                contains: () => false,
                                focus: () => jest.fn(),
                                blur: () => jest.fn(),
                                click: () => jest.fn()
                            }
                        case "glossary-cancel-button":
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => true,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                contains: () => true,
                                focus: () => jest.fn(),
                                blur: () => jest.fn(),
                                click: () => jest.fn()
                            }
                        default:
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => true,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                contains: () => true,
                                focus: () => jest.fn(),
                                blur: () => jest.fn(),
                                click: () => jest.fn()
                            }
                    }
                }
                const spyhandleKeyDownHelper = jest.spyOn(glossaryFootnotePopupHelpers, 'handleKeyDownHelper')
                glossaryFootnotePopupHelpers.handleKeyDownHelper(event)
                expect(spyhandleKeyDownHelper).toHaveBeenCalled()
                spyhandleKeyDownHelper.mockClear()
            })
        })
        it("e.keyCode === 27", () => {
            let event = {
                ...e,
                keyCode: 27
            }
            const spyhandleKeyDownHelper = jest.spyOn(glossaryFootnotePopupHelpers, 'handleKeyDownHelper')
            glossaryFootnotePopupHelpers.handleKeyDownHelper(event)
            expect(spyhandleKeyDownHelper).toHaveBeenCalled()
            spyhandleKeyDownHelper.mockClear()
        })
        it("e.keyCode === 37", () => {
            let event = {
                ...e,
                keyCode: 37
            }
            document.getElementById = (value) => {
                switch (value) {
                    case "glossary-save-button":
                        return {
                            tabIndex: "0",
                            classList: {
                                contains: () => true,
                                add: () => jest.fn(),
                                remove: () => jest.fn()
                            },
                            contains: () => true,
                            focus: () => jest.fn(),
                            blur: () => jest.fn(),
                            click: () => jest.fn()
                        }
                    case "glossary-cancel-button":
                        return {
                            tabIndex: "0",
                            classList: {
                                contains: () => false,
                                add: () => jest.fn(),
                                remove: () => jest.fn()
                            },
                            contains: () => false,
                            focus: () => jest.fn(),
                            blur: () => jest.fn(),
                            click: () => jest.fn()
                        }
                    default:
                        return {
                            tabIndex: "0",
                            classList: {
                                contains: () => true,
                                add: () => jest.fn(),
                                remove: () => jest.fn()
                            },
                            contains: () => true,
                            focus: () => jest.fn(),
                            blur: () => jest.fn(),
                            click: () => jest.fn()
                        }
                }
            }
            const spyhandleKeyDownHelper = jest.spyOn(glossaryFootnotePopupHelpers, 'handleKeyDownHelper')
            glossaryFootnotePopupHelpers.handleKeyDownHelper(event)
            expect(spyhandleKeyDownHelper).toHaveBeenCalled()
            spyhandleKeyDownHelper.mockClear()
        })
        it("e.keyCode === 39", () => {
            let event = {
                ...e,
                keyCode: 39
            }
            document.getElementById = (value) => {
                switch (value) {
                    case "glossary-save-button":
                        return {
                            tabIndex: "0",
                            classList: {
                                contains: () => false,
                                add: () => jest.fn(),
                                remove: () => jest.fn()
                            },
                            contains: () => false,
                            focus: () => jest.fn(),
                            blur: () => jest.fn(),
                            click: () => jest.fn()
                        }
                    case "glossary-cancel-button":
                        return {
                            tabIndex: "0",
                            classList: {
                                contains: () => true,
                                add: () => jest.fn(),
                                remove: () => jest.fn()
                            },
                            contains: () => true,
                            focus: () => jest.fn(),
                            blur: () => jest.fn(),
                            click: () => jest.fn()
                        }
                    default:
                        return {
                            tabIndex: "0",
                            classList: {
                                contains: () => true,
                                add: () => jest.fn(),
                                remove: () => jest.fn()
                            },
                            contains: () => true,
                            focus: () => jest.fn(),
                            blur: () => jest.fn(),
                            click: () => jest.fn()
                        }
                }
            }
            const spyhandleKeyDownHelper = jest.spyOn(glossaryFootnotePopupHelpers, 'handleKeyDownHelper')
            glossaryFootnotePopupHelpers.handleKeyDownHelper(event)
            expect(spyhandleKeyDownHelper).toHaveBeenCalled()
            spyhandleKeyDownHelper.mockClear()
        })
    })
    describe("Testing handleMouseDownHelper", () => {
        let event = {
            target: {
                id: "random-id"
            }
        }
        describe("Testing IF Condition", () => {
            it("clickedOnAudioImageButtons - glossaryAudioButton.contains(e.target) is true", () => {
                document.getElementById = (value) => {
                    switch (value) {
                        case "glossary-audio":
                            return {
                                contains: () => true
                            }
                        case "glossary-figure-image":
                            return {
                                contains: () => false
                            }
                        case "glossary-save-button":
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => true,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                blur: () => jest.fn(),
                                focus: () => jest.fn()
                            }
                        case "glossary-cancel-button":
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => true,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                blur: () => jest.fn(),
                                focus: () => jest.fn()
                            }
                        default:
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => true,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                blur: () => jest.fn(),
                                focus: () => jest.fn(),
                                contains: () => true
                            }
                    }
                }
                const spyhandleMouseDownHelper = jest.spyOn(glossaryFootnotePopupHelpers, 'handleMouseDownHelper')
                glossaryFootnotePopupHelpers.handleMouseDownHelper(event)
                expect(spyhandleMouseDownHelper).toHaveBeenCalled()
                spyhandleMouseDownHelper.mockClear()
            })
            it("clickedOnAudioImageButtons - glossaryFigureImageButton.contains(e.target) is true", () => {
                document.getElementById = (value) => {
                    switch (value) {
                        case "glossary-audio":
                            return {
                                contains: () => false
                            }
                        case "glossary-figure-image":
                            return {
                                contains: () => true
                            }
                        case "glossary-save-button":
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => true,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                blur: () => jest.fn(),
                                focus: () => jest.fn()
                            }
                        case "glossary-cancel-button":
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => true,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                blur: () => jest.fn(),
                                focus: () => jest.fn()
                            }
                        default:
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => true,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                blur: () => jest.fn(),
                                focus: () => jest.fn(),
                                contains: () => true
                            }
                    }
                }
                const spyhandleMouseDownHelper = jest.spyOn(glossaryFootnotePopupHelpers, 'handleMouseDownHelper')
                glossaryFootnotePopupHelpers.handleMouseDownHelper(event)
                expect(spyhandleMouseDownHelper).toHaveBeenCalled()
                spyhandleMouseDownHelper.mockClear()
            })
            it("clickedOnEditor - glossaryEditor.contains(e.target) is true", () => {
                document.getElementById = (value) => {
                    switch (value) {
                        case "glossary-audio":
                            return {
                                contains: () => false
                            }
                        case "glossary-figure-image":
                            return {
                                contains: () => false
                            }
                        case "glossary-editor":
                            return {
                                contains: () => true
                            }
                        case "glossary-editor-attacher":
                            return {
                                contains: () => false
                            }
                        case "glossary-save-button":
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => true,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                blur: () => jest.fn(),
                                focus: () => jest.fn()
                            }
                        case "glossary-cancel-button":
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => true,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                blur: () => jest.fn(),
                                focus: () => jest.fn()
                            }
                        default:
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => true,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                blur: () => jest.fn(),
                                focus: () => jest.fn(),
                                contains: () => true
                            }
                    }
                }
                const spyhandleMouseDownHelper = jest.spyOn(glossaryFootnotePopupHelpers, 'handleMouseDownHelper')
                glossaryFootnotePopupHelpers.handleMouseDownHelper(event)
                expect(spyhandleMouseDownHelper).toHaveBeenCalled()
                spyhandleMouseDownHelper.mockClear()
            })
            it("clickedOnEditor - glossaryEditorAttacher.contains(e.target) is true", () => {
                document.getElementById = (value) => {
                    switch (value) {
                        case "glossary-audio":
                            return {
                                contains: () => false
                            }
                        case "glossary-figure-image":
                            return {
                                contains: () => false
                            }
                        case "glossary-editor":
                            return {
                                contains: () => false
                            }
                        case "glossary-editor-attacher":
                            return {
                                contains: () => true
                            }
                        case "glossary-save-button":
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => true,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                blur: () => jest.fn(),
                                focus: () => jest.fn()
                            }
                        case "glossary-cancel-button":
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => true,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                blur: () => jest.fn(),
                                focus: () => jest.fn()
                            }
                        default:
                            return {
                                tabIndex: "0",
                                classList: {
                                    contains: () => true,
                                    add: () => jest.fn(),
                                    remove: () => jest.fn()
                                },
                                blur: () => jest.fn(),
                                focus: () => jest.fn(),
                                contains: () => true
                            }
                    }
                }
                const spyhandleMouseDownHelper = jest.spyOn(glossaryFootnotePopupHelpers, 'handleMouseDownHelper')
                glossaryFootnotePopupHelpers.handleMouseDownHelper(event)
                expect(spyhandleMouseDownHelper).toHaveBeenCalled()
                spyhandleMouseDownHelper.mockClear()
            })
        })
        describe("Testing ELSE IF Conditions", () => {
            it("Testing clickedOnPrimaryButton - primaryButton.contains(e.target) is true", () => {
                document.getElementById = (value) => {
                    if (value === "glossary-save-button") {
                        return {
                            contains: () => true,
                            tabIndex: "0",
                            classList: {
                                contains: () => false,
                                add: () => jest.fn(),
                                remove: () => jest.fn()
                            },
                            blur: () => jest.fn(),
                            focus: () => jest.fn()
                        }
                    } else {
                        return {
                            contains: () => false,
                            tabIndex: "0",
                            classList: {
                                contains: () => false,
                                add: () => jest.fn(),
                                remove: () => jest.fn()
                            },
                            blur: () => jest.fn(),
                            focus: () => jest.fn()
                        }
                    }
                }
                const spyhandleMouseDownHelper = jest.spyOn(glossaryFootnotePopupHelpers, 'handleMouseDownHelper')
                glossaryFootnotePopupHelpers.handleMouseDownHelper(event)
                expect(spyhandleMouseDownHelper).toHaveBeenCalled()
                spyhandleMouseDownHelper.mockClear()
            })
            it("Testing clickedOnSecondaryButton - secondaryButton.contains(e.target) is true", () => {
                document.getElementById = (value) => {
                    if (value === "glossary-cancel-button") {
                        return {
                            contains: () => true,
                            tabIndex: "0",
                            classList: {
                                contains: () => false,
                                add: () => jest.fn(),
                                remove: () => jest.fn()
                            },
                            blur: () => jest.fn(),
                            focus: () => jest.fn()
                        }
                    } else {
                        return {
                            contains: () => false,
                            tabIndex: "0",
                            classList: {
                                contains: () => false,
                                add: () => jest.fn(),
                                remove: () => jest.fn()
                            },
                            blur: () => jest.fn(),
                            focus: () => jest.fn()
                        }
                    }
                }
                const spyhandleMouseDownHelper = jest.spyOn(glossaryFootnotePopupHelpers, 'handleMouseDownHelper')
                glossaryFootnotePopupHelpers.handleMouseDownHelper(event)
                expect(spyhandleMouseDownHelper).toHaveBeenCalled()
                spyhandleMouseDownHelper.mockClear()
            })
        })
        describe("Testing ELSE Condition", () => {
            it("Testing focusPopupButtons", () => {
                document.getElementById = () => {
                    return {
                        contains: () => false,
                        tabIndex: "0",
                        classList: {
                            contains: () => false,
                            add: () => jest.fn(),
                            remove: () => jest.fn()
                        },
                        blur: () => jest.fn(),
                        focus: () => jest.fn()
                    }
                }
                const spyhandleMouseDownHelper = jest.spyOn(glossaryFootnotePopupHelpers, 'handleMouseDownHelper')
                glossaryFootnotePopupHelpers.handleMouseDownHelper(event)
                expect(spyhandleMouseDownHelper).toHaveBeenCalled()
                spyhandleMouseDownHelper.mockClear()
            })
        })
    })
})