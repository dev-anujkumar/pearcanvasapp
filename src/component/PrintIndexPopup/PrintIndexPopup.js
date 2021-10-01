import React from 'react';
import { Divider,
         Box,
         Drawer,
         TextField,
         styled,
         } from '@material-ui/core';
import {Close, ErrorOutline} from '@material-ui/icons'
import { useSelector, useDispatch} from 'react-redux';
import { printIndexPopup } from './PrintIndex_Action';
import '../../styles/PrintIndexPopup/PrintIndexPopup.css';
import '../../styles/GlossaryFootnotePopup/GlossaryFootnotePopup.css';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function PrintIndexPopup(){
  const state = useSelector(state => state.printIndexValue);
  const dispatch = useDispatch();

  const handleDrawerClose = value => {
        dispatch(printIndexPopup(value));
  };
  
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
              sx={{ width: 300 }}
              role="presentation"
            >
                              

            </Box>
          </Drawer>
      </div>
    );
}