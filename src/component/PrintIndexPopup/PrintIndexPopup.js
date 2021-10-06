import React, { useState } from 'react';
import { Divider,
         Box,
         Drawer,
        //  TextField,
         styled
         } from '@material-ui/core';
import {Close, ErrorOutline} from '@material-ui/icons'
// import { useSelector, useDispatch} from 'react-redux';
// import { printIndexPopup } from './PrintIndex_Action';
import '../../styles/PrintIndexPopup/PrintIndexPopup.css';
import TextField from '@material-ui/core/TextField';
// import '../../styles/GlossaryFootnotePopup/GlossaryFootnotePopup.css';


export default function PrintIndexPopup(props){
  const [indexEntry, setIndexEntry] = useState('');
  const [subEntry, setSubEntry] = useState('');

  // const state = useSelector(state => state.printIndexValue);
  // const dispatch = useDispatch();

  // const handleDrawerClose = value => {
  //   props.showPrintIndexPopup(value);
  // };

  const changeIndexEntry = e => {
    setIndexEntry(e.target.value);
  }

  const changeSubEntry = e => {
    setSubEntry(e.target.value);
  }
  
    return (
      <div className='index-container'>
        <div className="index-setting">
          <span className="printIndex-label">Index Settings</span>
          <span><Close onClick={() => props.showPrintIndexPopup(false)} /></span>
        </div>
        <div className="index-body">
          <div className="index-text">
            <ErrorOutline />
            <span>This data is used for print only</span>
          </div>
          <div>
            <TextField
              // id="filled-size-normal"
              label="Index Entry"
              defaultValue="1234"
              variant="filled"
              // margin="normal"
              // size="normal"
              value={indexEntry}
              onChange={changeIndexEntry}
              fullWidth 
              multiline={true}
              autoComplete="off"
            />
            <TextField
              id="filled-required"
              label="Sub-Entry (optional)"
              defaultValue=""
              variant="filled"
              margin="normal"
              size="normal"
              value={subEntry}
              onChange={changeSubEntry}
              fullWidth
            />
          </div>
          <div className="button-group">
            <span className="printIndx-cancel-button" onClick={() => props.showPrintIndexPopup(false,'')}>Cancel</span>
            <span className="printIndex-save-button" disabled={false} onClick={() => { }}>Save</span>
          </div>
        </div>

      </div>
    );
}