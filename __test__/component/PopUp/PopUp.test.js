import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import PopUp from '../../../src/component/PopUp';


describe('Testing PopUp component', () => {
    it('render PopUp component ', () => {
        const props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            isLockPopup: true,
            withInputBox: true
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
        let wrapper = mount(<PopUp {...props}/>);
        expect(wrapper.find('.save-button').exists()).toBe(true);

    })
    it('onClick Event', () => {
        let togglePopup = jest.fn();
        const component = mount(<PopUp togglePopup={togglePopup} />);
        component.find('span.close').simulate('click');
        component.find('span#close-container').simulate('click');
        expect(component.instance().props.togglePopup).toHaveBeenCalled();
    })
    it('isLockReleasePopup', () => {
        const props = {
            isLockReleasePopup: true
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.isLockReleasePopup).toEqual(true);
    })
    it('tocdelete if saveButtonText == "Okay"',() => {
        const props = {
            tocDelete: true,
            saveButtonText: 'Okay' 
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.saveButtonText).toEqual('Okay');
        expect(component.instance().props.tocDelete).toEqual(true);
    })
    it('assessmentAndInteractive', () => {
        const props = {
            assessmentAndInteractive: true
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.assessmentAndInteractive).toEqual(true);
    })
    it('showDeleteElemPopup', () => {
        const props = {
            showDeleteElemPopup: true
        }
        const props1 = {
            showDeleteElemPopup: true,
            sectionBreak:true
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
        ReactDOM.render(<PopUp {...props1} />, div);
        ReactDOM.unmountComponentAtNode(div);
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.showDeleteElemPopup).toEqual(true);
    })
    it('isSplitSlatePopup',() => {
        const props = {
            isSplitSlatePopup:true,
            togglePopup:jest.fn()
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.cancel-button').simulate('click');
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.isSplitSlatePopup).toEqual(true);
    })
    it('sytaxHighlight',() => {
        const props = {
            sytaxHighlight:true,
            togglePopup:jest.fn()
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.cancel-button').simulate('click');
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.sytaxHighlight).toEqual(true);
    })
    it('removeConfirmation',() => {
        const props = {
            removeConfirmation:true
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.removeConfirmation).toEqual(true);

    })
    it('simulating click for isLockPopup',() => {
        let props = {
            togglePopup:jest.fn(),
            isLockPopup:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('#close-container').simulate('click');
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.isLockPopup).toEqual(true);
    })
    it('simulating click for showDeleteElemPopup',() => {
        let props = {
            togglePopup:jest.fn(),
            showDeleteElemPopup:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('#close-container').simulate('click');
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.showDeleteElemPopup).toEqual(true);
    });
    it('showDeleteElemPopup for OwnersSlate',() => {
        let props = {
            togglePopup:jest.fn(),
            showDeleteElemPopup:true,
            isOwnerSlate:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('#close-container').simulate('click');
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.showDeleteElemPopup).toEqual(true);
        expect(component.instance().props.isOwnerSlate).toEqual(true);
    });
    it('testCase for OwnersSlate',() => {
        let props = {
            togglePopup:jest.fn(),
            proceed:jest.fn(),
            isCurrentSlate:'owner'
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.lo-save-button').simulate('click');
        wrapper.find('.cancel-button').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.isCurrentSlate).toEqual('owner');
    });
    it('testCase for openRemovePopUp',() => {
        let props = {
            saveContent:jest.fn(),
            togglePopup:jest.fn(),
            openRemovePopUp:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.save-button').simulate('click');
        wrapper.find('.cancel-button').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.openRemovePopUp).toEqual(true);
    });
    it('testCase for isElmUpdatePopup',() => {
        let props = {
            updateElmAssessment:jest.fn(),
            togglePopup:jest.fn(),
            isElmUpdatePopup:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.save-button').simulate('click');
        wrapper.find('.cancel-button').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.isElmUpdatePopup).toEqual(true);
    });
    it('testCase for imageGlossary',() => {
        let props = {
            removeImageContent:jest.fn(),
            togglePopup:jest.fn(),
            imageGlossary:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.save-button').simulate('click');
        wrapper.find('.cancel-button').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.imageGlossary).toEqual(true);
    });
    it('testCase for isDeleteAssetPopup',() => {
        let props = {
            deleteAssetHandler:jest.fn(),
            togglePopup:jest.fn(),
            isDeleteAssetPopup:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.save-button').simulate('click');
        wrapper.find('.cancel-button').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.isDeleteAssetPopup).toEqual(true);
    });
    it('testCase for WordPastePopup',() => {
        let props = {
            handleCopyPastePopup:jest.fn(),
            WordPastePopup:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.powerpaste-cancel-button').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.WordPastePopup).toEqual(true);
    });
    it('testCase for LOPopup',() => {
        let props = {
            togglePopup:jest.fn(),
            yesButtonHandler:jest.fn(),
            LOPopup:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.lo-save-button').simulate('click');
        wrapper.find('.cancel-button').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.LOPopup).toEqual(true);
    });
    it('testCase for AssessmentPopup',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            AssessmentPopup:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.lo-save-button').simulate('click');
        wrapper.find('.cancel-button').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.AssessmentPopup).toEqual(true);
    });
    it('testCase for setDecorativePopup',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            setDecorativePopup:true,
            isAutoNumberingEnabled: true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.save-button').simulate('click');
        wrapper.find('.cancel-button').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.setDecorativePopup).toEqual(true);
    });
    it('testCase for UsagePopup',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            UsagePopup:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.lo-save-button').simulate('click');
        wrapper.find('.cancel-button').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.UsagePopup).toEqual(true);
    });
    it('testCase for importAndDropPopup',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            importAndDropPopup:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.dialog-buttons-upload-file').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.importAndDropPopup).toEqual(true);
    });
    it('testCase for importAndDropPopup click',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            importAndDropPopup:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.dialog-buttons-upload-file').simulate('click');
        wrapper.find('.cancel-button-import').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.importAndDropPopup).toEqual(true);
    });
    it('testCase for importAndDropPopup cancel',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            importAndDropPopup:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.dialog-buttons-upload-file').simulate('click');
        wrapper.find('.cancel-button-import').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.importAndDropPopup).toEqual(true);
    });
    it('testCase for importAndDropPopup start import',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            importAndDropPopup:true,
            toggleNextButton:jest.fn()
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.setState({fileToBeUploaded:{name:'name'}})
        wrapper.find('.dialog-buttons-upload-file').simulate('click');
        wrapper.find('.start-import-button').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.importAndDropPopup).toEqual(true);
    });
    it('testCase for importAndDropPopup click close',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            importAndDropPopup:true,
            toggleNextButton:jest.fn()
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.setState({fileToBeUploaded:{name:'name', size: 102400}})
        wrapper.find('.dialog-buttons-upload-file').simulate('click');
        wrapper.find('.close-icon-file-container').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.importAndDropPopup).toEqual(true);
    });
    it('testCase for importAndDropPopup drop file case',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            importAndDropPopup:true,
            toggleNextButton:jest.fn()
        }
        let wrapper = mount(<PopUp {...props}/>);
        const mockEvent = {dataTransfer: {files: [{name: 'Perception.docx', size: 104857600}, {}]}}
        wrapper.setState({fileToBeUploaded:{}, errorFileType: true})
        wrapper.find('.dialog-buttons-upload-file').simulate('click');
        wrapper.find('.file-container-error-file-type').simulate('drop', mockEvent);
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.importAndDropPopup).toEqual(true);
    });
    it('testCase for importAndDropPopup click on file upload box',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            importAndDropPopup:true,
            toggleNextButton:jest.fn()
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.file-container-text-link').simulate('click');
    });
    it('testCase for importAndDropPopup error message show',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            importAndDropPopup:true,
            toggleNextButton:jest.fn()
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.setState({errorFileEmpty: true})
    });
    it('testCase for importAndDropPopup drop file checkvalidation size 0',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            importAndDropPopup:true,
            toggleNextButton:jest.fn()
        }
        let wrapper = mount(<PopUp {...props}/>);
        const mockEvent = {dataTransfer: {files: [{name: 'Perception.docx', size: 0}, {}]}}
        wrapper.setState({fileToBeUploaded:{}, errorFileType: true})
        wrapper.find('.dialog-buttons-upload-file').simulate('click');
        wrapper.find('.file-container-error-file-type').simulate('drop', mockEvent);
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.importAndDropPopup).toEqual(true);
    });
    it('testCase for importAndDropPopup drop file checkvalidation size less than 10MB',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            importAndDropPopup:true,
            toggleNextButton:jest.fn()
        }
        let wrapper = mount(<PopUp {...props}/>);
        const mockEvent = {dataTransfer: {files: [{name: 'Perception.docx', size: 104857}, {}]}}
        wrapper.setState({fileToBeUploaded:{}, errorFileType: true})
        wrapper.find('.dialog-buttons-upload-file').simulate('click');
        wrapper.find('.file-container-error-file-type').simulate('drop', mockEvent);
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.importAndDropPopup).toEqual(true);
    });
    it('testCase for importAndDropPopup drop file validation',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            importAndDropPopup:true,
            toggleNextButton:jest.fn()
        }
        let wrapper = mount(<PopUp {...props}/>);
        const mockEvent = {dataTransfer: {files: [{name: 'Perception'}, {}]}}
        wrapper.setState({fileToBeUploaded:{}, errorFileType: true})
        wrapper.find('.dialog-buttons-upload-file').simulate('click');
        wrapper.find('.file-container-error-file-type').simulate('drop', mockEvent);
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.importAndDropPopup).toEqual(true);
    });
    it('testCase for importAndDropPopup drop empty event',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            importAndDropPopup:true,
            toggleNextButton:jest.fn()
        }
        let wrapper = mount(<PopUp {...props}/>);
        const mockEventEmpty = {dataTransfer: {files: []}}
        wrapper.setState({fileToBeUploaded:{}, errorFileType: true})
        wrapper.find('.dialog-buttons-upload-file').simulate('click');
        wrapper.find('.file-container-error-file-type').simulate('drop', mockEventEmpty);
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.importAndDropPopup).toEqual(true);
    });
    it('testCase for importAndDropPopup drag',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            importAndDropPopup:true,
            toggleNextButton:jest.fn()
        }
        let wrapper = mount(<PopUp {...props}/>);
        const mockEventEmpty = {dataTransfer: {files: []}}
        wrapper.setState({fileToBeUploaded:{}, errorFileType: true})
        wrapper.find('.dialog-buttons-upload-file').simulate('click');
        wrapper.find('.file-container-error-file-type').simulate('dragover', mockEventEmpty);
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.importAndDropPopup).toEqual(true);
    });
    xit('testCase for previewUploadedFilePopup cancel',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            previewUploadedFilePopup:true,
            proceed:jest.fn()
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.dialog-buttons-preview').simulate('click');
        wrapper.find('.disable-cancel-button-import').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.previewUploadedFilePopup).toEqual(true);
    });
    it('testCase for previewUploadedFilePopup',() => {
        let props = {
            togglePopup:jest.fn(),
            agree:jest.fn(),
            previewUploadedFilePopup:true,
            proceed:jest.fn()
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.setState({enableImport: true})
        wrapper.find('.dialog-buttons-preview').simulate('click');
        wrapper.find('.import-button-import-word').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.previewUploadedFilePopup).toEqual(true);
    });
    it('testCase for showBlockCodeElemPopup',() => {
        let props = {
            togglePopup:jest.fn(),
            showBlockCodeElemPopup:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.lo-save-button').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.showBlockCodeElemPopup).toEqual(true);
    });
    it('testCase for isApprovedSlate',() => {
        let props = {
            togglePopup:jest.fn(),
            isApprovedSlate:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.save-button').simulate('click');
        wrapper.find('.cancel-button').simulate('click');
        const component = mount(<PopUp {...props}/>);
        component.instance().isChecked=true
        expect(component.instance().props.isApprovedSlate).toEqual(true);
    });
    it('testCase for isSubscribersSlate',() => {
        let props = {
            togglePopup:jest.fn(),
            isCurrentSlate:"subscriber",
            proceed:jest.fn()
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.subscriberSlate-ok-button').simulate('click');
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.isCurrentSlate).toEqual("subscriber");
    });
    it('testCase for withCheckBox',() => {
        let props = {
            withCheckBox:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.OwnersSlateCheckBox').simulate('change');
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.withCheckBox).toEqual(true);
    });
    it('testCase for withCheckBox -> when its isSubscribed',() => {
        let props = {
            withCheckBox:true,
            isCurrentSlate:"subscriber"
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.OwnersSlateCheckBox').simulate('change');
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.withCheckBox).toEqual(true);
    });

    it('alfrescoExpansionPopup', () => {
        const props = {
            alfrescoExpansionPopup: true,
            alfrescoExpansionMetaData:{
                renderImages:[{
                    imgId: "123",
                    imgSrc: "src"
                }],
                headerText: 'Header',
                normalText: 'Normal'
            },
            openInNewWindow: jest.fn()
        }
        const component = mount(<PopUp {...props}/>);
        component.find('img').simulate('click');
        expect(component.instance().props.alfrescoExpansionPopup).toEqual(true);
    });

    it('importWordFilePopup', () => {
        const props = {
            importWordFilePopup: true,
            openInNewWindow: jest.fn(),
            proceed: jest.fn()
        }
        const component = mount(<PopUp {...props}/>);
        component.find('.start-import-button').simulate('click');
        expect(component.instance().props.importWordFilePopup).toEqual(true);
    });
    it('previewUploadedFilePopup', () => {
        const props = {
            previewUploadedFilePopup: true,
            openInNewWindow: jest.fn()
        }
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.previewUploadedFilePopup).toEqual(true);
    });
    it('testCase for handleCheckboxPopup',() => {
        let props = {
            warningPopupCheckbox:true,
            showDeleteElemPopup: true,
            handleCheckboxPopup:jest.fn()
        }
        const event = {
            target: { value: 'the-value' }
          };
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.popup-checkbox').simulate('change', event);
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.warningPopupCheckbox).toEqual(true);
    });

    it('testCase for handleListElementWarningPopupCheckbox',() => {
        let props = {
            listElementWarningPopupCheckbox:true,
            listConfirmation:true,
            handleListElementWarningPopupCheckbox:jest.fn()
        }
        const event = {
            target: { value: 'the-value' }
        };
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.popup-checkbox').simulate('change', event);
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.listElementWarningPopupCheckbox).toEqual(true);
    });

    it('testCase for handleDeleteWarningPopupCheckbox',() => {
        let props = {
            deleteWarningPopupCheckbox:true,
            isDeleteAssetPopup:true,
            handleDeleteWarningPopupCheckbox:jest.fn()
        }
        const event = {
            target: { value: 'the-value' }
        };
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.popup-checkbox').simulate('change', event);
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.deleteWarningPopupCheckbox).toEqual(true);
    });

    it('testCase for handleSetAsDecorativeWarningPopupCheckbox',() => {
        let props = {
            setAsDecorativePopUpCheckbox:true,
            setDecorativePopup:true,
            handleSetAsDecorativeWarningPopupCheckbox:jest.fn()
        }
        const event = {
            target: { value: 'the-value' }
        };
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.popup-checkbox').simulate('change', event);
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.setAsDecorativePopUpCheckbox).toEqual(true);
    });
    
    describe("Testing method handleKeyDown()", () => {
        it("Test handleKeyDown method for keyCode=13", () => {
            let props = {
                togglePopup:jest.fn(),
                showDeleteElemPopup:true,
                isOwnerSlate:true
            }
            let wrapper = mount(<PopUp {...props}/>);
            let instance = wrapper.find('PopUp').instance();
            let e = {
                keyCode: 13
            }
            instance.handleKeyDown(e);
            expect(wrapper.instance().props.showDeleteElemPopup).toEqual(true);
            expect(wrapper.instance().props.isOwnerSlate).toEqual(true);
        });
        it("Test handleKeyDown method for keyCode=27", () => {
            let props = {
                togglePopup:jest.fn(),
                showDeleteElemPopup:true,
                isOwnerSlate:true
            }
            let wrapper = mount(<PopUp {...props}/>);
            let instance = wrapper.find('PopUp').instance();
            let e = {
                keyCode: 27
            }
            instance.handleKeyDown(e);
            expect(wrapper.instance().props.showDeleteElemPopup).toEqual(true);
            expect(wrapper.instance().props.isOwnerSlate).toEqual(true);
        });
        it("Test handleKeyDown method for keyCode=37", () => {
            let props = {
                isSplitSlatePopup:true,
                togglePopup:jest.fn()
            }
            let wrapper = mount(<PopUp {...props}/>);
            let instance = wrapper.find('PopUp').instance();
            let e = {
                keyCode: 37
            }
            wrapper.setState({ focusedButton: 'primary' });
            instance.handleKeyDown(e);
            expect(wrapper.instance().props.isSplitSlatePopup).toEqual(true);
        });
        it("Test handleKeyDown method for keyCode=39", () => {
            let props = {
                isSplitSlatePopup:true,
                togglePopup:jest.fn()
            }
            let wrapper = mount(<PopUp {...props}/>);
            let instance = wrapper.find('PopUp').instance();
            let e = {
                keyCode: 39
            }
            wrapper.setState({ focusedButton: 'secondary' });
            instance.handleKeyDown(e);
            expect(wrapper.instance().props.isSplitSlatePopup).toEqual(true);
        });
        it('testCase for unlockSlateToggle',() => {
            let props = {
                handleUnlockSlate:jest.fn(),
                handleCancelUnlock:jest.fn(),
                unlockSlateToggle:true
            }
            let wrapper = mount(<PopUp {...props}/>);
            wrapper.find('.save-button').simulate('click');
            wrapper.find('.cancel-button').simulate('click');
            const component = mount(<PopUp {...props}/>);
            component.instance().isChecked=true
            expect(component.instance().props.unlockSlateToggle).toEqual(true);
        });
    });
})