import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import '../../styles/AlfrescoPopup/AlfrescoPopup.css'
import config from '../../config/config'
import { sendDataToIframe } from '../../constants/utility';
import axios from 'axios';
import {alfrescoPopup} from "../AlfrescoPopup/Alfresco_Action";
import { connect } from 'react-redux';
import { hideBlocker, hideTocBlocker } from '../../js/toggleLoader';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: '0 24px',
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function AlfrescoPopup(props) {
    const [open, setOpen] = React.useState(true);
    const [selectedOption, setOption] = React.useState('');
    const [projectMetadata, setMetaData] = React.useState()
    const classes = useStyles();

    const handleClose = () => {
        hideBlocker()
        hideTocBlocker()
        let payloadObj = { launchAlfrescoPopup: false, alfrescoPath: {} }
        props.alfrescoPopup(payloadObj)
        setOpen(false);
    };

    const handleChange = (event) => {
        const name = event.target.value
        setOption(name)
    };

    const sendSelectedData = () => {
        let alfrescoData = {
            gridId: null,
            name: selectedOption,
            nodeRef: "d6141287-3945-44ce-9504-5757a2311719",
            registerId: null,
            repoInstance: "https://staging.api.pearson.com/content/cmis/uswip-aws",
            repoName: "AWS US",
            siteVisibility: "PUBLIC"
        }
        let messageObj = { citeName: alfrescoData.name, citeNodeRef: alfrescoData.nodeRef }
        sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
        //handleClose()
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
                    'PearsonSSOSession': SSOToken,
                    'If-Match': request.eTag
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

    const mapValues = [
        '001_C5 Media POC - AWS US  (Mod)',
        'C5-Media-Poc-UK - AWS US  (Mod)',
        'CITE Patterns Content Design - AWS US  (Mod)',
        'CITE sandbox - AWS US  (Mod)',
        'CITE sandbox - AWS US  (Mod)',
        'elm-test-cite-mod - AWS US  (Mod)'
    ]

    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="popup-top-line"></div>
                <DialogTitle id="alert-dialog-title">{"Select Alfresco Site"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Location in Alfresco
                    </DialogContentText>
                </DialogContent>
                <FormControl variant="filled" className={classes.formControl}>
                    {selectedOption === '' &&
                        <InputLabel id="filled-age-native-simple">Select One</InputLabel>
                    }
                    <Select
                        native
                        value={selectedOption}
                        onChange={handleChange}
                        labelId="filled-age-native-simple"
                    >
                        <option aria-label="None" value="" />
                        {props.alfrescoListOption.map((values, index) => (
                            <option key={index} value={values.entry.id}>{values.entry.id}</option>
                        ))}
                    </Select>
                </FormControl>
                <DialogActions>
                    <Button variant="outlined" className="active-button-class" onClick={handleClose}>Cancel</Button>
                    <Button
                        variant="outlined"
                        disabled={selectedOption === ''}
                        className={selectedOption !== '' && 'active-button-class'}
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
    }
}

export default connect(
    null,
    mapActionToProps
)(AlfrescoPopup);