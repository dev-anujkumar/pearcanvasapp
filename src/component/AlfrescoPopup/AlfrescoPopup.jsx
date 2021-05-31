import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuItem from '@material-ui/core/MenuItem';
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

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: '0 24px',
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    dropdownItem: {
        height: '40px',
        width: '350px',
        fontWeight: '500'
    }
}));

const MenuProps = {
    PaperProps: {
      style: {
        width: 360,
        height: 208
      },
    },
  };

function AlfrescoPopup(props) {
    const [open, setOpen] = React.useState(true);
    const [selectedOption, setOption] = React.useState('');
    const [projectMetadata, setMetaData] = React.useState()
    const classes = useStyles();

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
        let payloadObj = { 
            launchAlfrescoPopup: false
        }
        handleClose()
        props.alfrescoPopup(payloadObj)
        let messageObj = { citeName: alfrescoData.title, citeNodeRef: alfrescoData.guid, elementId: props.alfrescoElementId }
        sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
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
                        <span className='small-title'>Location in Alfresco</span>
                    </DialogContentText>
                </DialogContent>
                <FormControl variant="filled" className={classes.formControl}>
                    {selectedOption === '' &&
                        <InputLabel id="filled-age-native-simple">Select One</InputLabel>
                    }
                    <Select
                        value={selectedOption}
                        onChange={handleChange}
                        labelId="filled-age-native-simple"
                        IconComponent={ExpandMoreIcon}
                        MenuProps={MenuProps}
                    >
                        {props.alfrescoListOption.map((values, index) => (
                        <MenuItem 
                            key={index} 
                            value={values.entry.id}
                            className={classes.dropdownItem}
                        ><span className='dropdown-items'>{values.entry.site.title}</span></MenuItem>
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

const mapStateToProps = (state) => {
    return {
        alfrescoElementId : state.alfrescoReducer.elementId
    }
}
export default connect(
    mapStateToProps,
    mapActionToProps
)(AlfrescoPopup);