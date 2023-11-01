import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogTitle, FormControl, Select, MenuItem, InputLabel, DialogContent, DialogContentText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import '../../styles/AlfrescoPopup/AlfrescoPopup.css'
import config from '../../config/config'
import { sendDataToIframe, PRIMARY_BUTTON, SECONDARY_BUTTON } from '../../constants/utility';
import axios from 'axios';
import { alfrescoPopup, saveSelectedAlfrescoElement } from "../AlfrescoPopup/Alfresco_Action";
import { connect } from 'react-redux';

const CustomizedFormControl = styled(FormControl)`
    margin: 0px 24px;
    min-width: 120px;
`;

const CustomizedMenuItem = styled(MenuItem)`
    height: 40px;
    width: 350px;
    font-weight: 500;
`;

const MenuProps = {
    PaperProps: {
        sx: {
            width: 360,
            height: 208,
            '@media (max-width: 1822px)': {
                top: '416px !important',
            },
            '@media (max-width: 1708px)': {
                top: '388px !important',
            },
            '@media (max-width: 1581px)': {
                top: '344px !important',
            },
            '@media (max-width: 1367px)': {
                top: '307px !important',
            },
            '@media (max-width: 1242px)': {
                top: '278px !important',
            },
            '@media (max-width: 1280px)': {
                top: '281px !important',
            },
            '@media (width: 1422px)': {
                top: '315px !important',
            },
            '@media (width: 1600px)': {
                top: '358px !important',
            },
            '@media (width: 1163px)': {
                top: '254px !important',
            },
            '@media (width: 1024px)': {
                top: '219px !important',
            },
        },
    },
};

function AlfrescoPopup(props) {
    const [open, setOpen] = React.useState(true);
    const [selectedOption, setOption] = React.useState('');
    const [projectMetadata, setMetaData] = React.useState()
    const focusedButton = React.useRef(SECONDARY_BUTTON);
    const primaryButton = React.useRef(null);
    const secondaryButton = React.useRef(null);
    const menuRef = React.useRef(null);

    useEffect(() => {
        /** Add Event Listner on Popup Buttons */
        document.addEventListener('keydown', handleKeyDown);

        /** Remove Event Listner on Popup Buttons */
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    /**Function to set currently focused button i.e primary or secondary */
    const setFocusedButton = (value) => {
        focusedButton.current = value;
    }

    /**Function to focus element by adding class to elements class list */
    const focusElement = (element, value) => {
        element?.classList?.add(value);
    }

    /**Function to remove focus of element by removing class from elements class list */
    const blurElement = (element, value) => {
        element?.classList?.remove(value);
    }

    /**Function to perform click event on element which is currently focused */
    const clickElement = (button) => {
        let element = (button === PRIMARY_BUTTON) ? primaryButton.current : secondaryButton.current;
        element?.click();
    }

    /**Function to handle keyboard event of Enter, Left & Right arrow keys */
    const handleKeyDown = (e) => {
        if(e.keyCode === 13 && (menuRef && !menuRef.current)) {
            clickElement(focusedButton.current);
        } else if (e.keyCode === 27) {
            clickElement(SECONDARY_BUTTON);
        } else if (e.keyCode === 37 && focusedButton && focusedButton.current && focusedButton.current === PRIMARY_BUTTON) {
            setFocusedButton(SECONDARY_BUTTON);
            blurElement(primaryButton.current, PRIMARY_BUTTON);
            focusElement(secondaryButton.current, SECONDARY_BUTTON);
        } else if (e.keyCode === 39 && focusedButton && focusedButton.current && focusedButton.current === SECONDARY_BUTTON && (primaryButton && primaryButton.current && primaryButton.current.classList && !primaryButton.current.classList.contains('disable'))) {
            setFocusedButton(PRIMARY_BUTTON);
            blurElement(secondaryButton.current, SECONDARY_BUTTON);
            focusElement(primaryButton.current, PRIMARY_BUTTON);
        }
    }

    const handleClose = () => {
        setOpen(false);
        props.handleCloseAlfrescoPicker()
    };

    const handleChange = (event) => {
        const name = event.target.value
        setOption(name)
    };

    const sendSelectedData = () => {
        let alfrescoData
        props.alfrescoListOption.map(values => {
            if (values.entry.id === selectedOption) {
            alfrescoData = values.entry.site
        }
        })
        let tempData = props.alfrescoPath
        tempData.alfresco = alfrescoData
        sendDataToIframe({ 'type': 'saveAlfrescoDataToConfig', 'message': tempData })
        let payloadObj = {launchAlfrescoPopup: false, 
            alfrescoPath: props.alfrescoPath
        }
        handleClose()
        props.alfrescoPopup(payloadObj)
        const editor = props.isInlineEditorOpen === true
        let alfrescoLocationData = props.locationData
        let locationSiteDataNodeRef = alfrescoLocationData?.nodeRef ? alfrescoLocationData.nodeRef : alfrescoLocationData?.guid
        locationSiteDataNodeRef = locationSiteDataNodeRef ? locationSiteDataNodeRef : alfrescoData.guid;
        const locationSiteDataTitle = alfrescoLocationData?.repositoryFolder ? alfrescoLocationData.repositoryFolder : alfrescoLocationData?.title
        let messageObj = {appName:'cypress', citeName: locationSiteDataTitle ? locationSiteDataTitle : alfrescoData.title, citeNodeRef: locationSiteDataNodeRef, elementId: props.alfrescoElementId, editor, calledFromGlossaryFootnote: props.calledFromGlossaryFootnote,  calledFromImageGlossaryFootnote: props.calledFromImageGlossaryFootnote, currentAsset: props.currentAsset}
        sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
        const messageDataToSave = {
            id: props.alfrescoElementId,
            calledFromGlossaryFootnote: props.calledFromGlossaryFootnote,
            editor: editor,
            citeNodeRef: locationSiteDataNodeRef,
            calledFromImageGlossaryFootnote: props.calledFromImageGlossaryFootnote
        }
        props.saveSelectedAlfrescoElement(messageDataToSave)
        let request = {
            eTag: props.alfrescoPath.etag,
            projectId: props.alfrescoPath.id,
            ...props.alfrescoPath,
            additionalMetadata: { ...alfrescoData },
            alfresco: { ...alfrescoData }
        };
        /*
            API to set alfresco location on dashboard
        */
        let url = config.PROJECTAPI_ENDPOINT + '/' + request.projectId + '/alfrescodetails';
        let SSOToken = request.ssoToken;
        return axios.patch(url, request.alfresco,
            {
                headers: {
                    'Accept': 'application/json',
                    'ApiKey': config.STRUCTURE_APIKEY,
                    'Content-Type': 'application/json',
                    'If-Match': request.eTag,
                    'myCloudProxySession': config.myCloudProxySession
                }
            })
            .then(function (response) {
                let tempData = { alfresco: alfrescoData };
                setMetaData(tempData)
            })
            .catch(function (error) {
                console.log("error", error)
            });
    }

    return (
        <div id="alfresco-picker">
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="popup-top-line"></div>
                <DialogTitle id="alert-dialog-title">{"Select Alfresco Site"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <span className='small-title'>Location in Alfresco</span>
                    </DialogContentText>
                </DialogContent>
                <CustomizedFormControl variant="filled">
                    {selectedOption === '' &&
                        <InputLabel id="filled-age-native-simple">Select One</InputLabel>
                    }
                    <Select
                        value={selectedOption}
                        onChange={handleChange}
                        labelId="filled-age-native-simple"
                        IconComponent={ExpandMoreIcon}
                        MenuProps={MenuProps}
                        onClose={() => {
                            setTimeout(() => {
                                if (document && document.activeElement) {
                                    document.activeElement.blur();
                                }
                            }, 0)
                        }}
                    >
                        {props.alfrescoListOption.map((values, index) => (
                        <CustomizedMenuItem 
                            ref={menuRef} 
                            key={index} 
                            value={values.entry.id}
                        ><span className='dropdown-items'>{values.entry.site.title}</span></CustomizedMenuItem>
                        ))}
                    </Select>
                </CustomizedFormControl>
                <DialogActions className="alfresco-popup-action-buttons">
                    <Button id={SECONDARY_BUTTON} ref={secondaryButton} variant="outlined" className="active-button-class secondary" onClick={handleClose}>Cancel</Button>
                    <Button
                        id={PRIMARY_BUTTON}
                        ref={primaryButton}
                        variant="outlined"
                        className={`select-button ${selectedOption !== '' ? '' : 'disable'}`}
                        onClick={sendSelectedData}>
                        Select
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapActionToProps = (dispatch) =>{
    return{
        alfrescoPopup: (payloadObj) => {
            dispatch(alfrescoPopup(payloadObj))
        },
        saveSelectedAlfrescoElement: (payloadObj) => {
            dispatch(saveSelectedAlfrescoElement(payloadObj))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        alfrescoElementId : state.alfrescoReducer.elementId,
        isInlineEditorOpen: state.alfrescoReducer.isInlineEditorOpen,
        locationData: state.alfrescoReducer.locationData,
        calledFromGlossaryFootnote: state.alfrescoReducer.calledFromGlossaryFootnote,
        calledFromImageGlossaryFootnote: state.alfrescoReducer.calledFromImageGlossaryFootnote,
        currentAsset: state.alfrescoReducer.currentAsset
    }
}
export default connect(
    mapStateToProps,
    mapActionToProps
)(AlfrescoPopup);
