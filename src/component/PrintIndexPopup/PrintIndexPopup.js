import React, { useState } from 'react';
import { Divider,
         Box,
         Drawer,
         TextField,
         styled
         } from '@material-ui/core';
import {Close, ErrorOutline} from '@material-ui/icons'
import { useSelector, useDispatch} from 'react-redux';
import { printIndexPopup } from './PrintIndex_Action';
import '../../styles/PrintIndexPopup/PrintIndexPopup.css';
// import '../../styles/GlossaryFootnotePopup/GlossaryFootnotePopup.css';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


export default function PrintIndexPopup(){
  const [indexEntry, setIndexEntry] = useState('');
  const [subEntry, setSubEntry] = useState('');

  const state = useSelector(state => state.printIndexValue);
  const dispatch = useDispatch();

  const handleDrawerClose = value => {
    dispatch(printIndexPopup(value));
  };

  const changeIndexEntry = e => {
    setIndexEntry(e.target.value);
  }

  const changeSubEntry = e => {
    setSubEntry(e.target.value);
  }
  
    return (
      <div>
        <Drawer
          anchor='right'
          variant="persistent"
          open={state.popUpStatus}
        >
          <DrawerHeader>
            <span className="printIndex-label">Index Settings</span>
            <Close onClick={() => handleDrawerClose(false)}/> 
          </DrawerHeader>
          <Divider />
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              width: 300
            }}
          >
            <div>
              <ErrorOutline />
              <span>This data is used for print only</span>
            </div>
            <div>
              <TextField
                id="indexEntry"
                label="Index Entry"
                defaultValue=""
                variant="filled"
                margin="normal"
                size="normal"
                value={indexEntry}
                onChange={changeIndexEntry}
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
              />
            </div>
            <div>
              <span className="printIndx-cancel-button" onClick={() =>{}}>Cancel</span>
              <span className="printIndex-save-button" disabled={false} onClick={() => {}}>Save</span>
            </div>
          </Box>
        </Drawer>
      </div>
    );
}