import React from 'react';
import { alertIcon } from '../../images/ElementButtons/ElementButtons.jsx';
import { METADATA_ALERT_MESSAGE } from '../../constants/Element_Constants.js';

const MetadataAlertBox = () => {
  return (
    <div className='alertBox'>
      <span className='alert-Icon'>
        {alertIcon}
      </span>
      <div className='alertMessageBody'>
        <p className='alert-Message'>{METADATA_ALERT_MESSAGE}</p>
      </div>
    </div>
  );
};

export default MetadataAlertBox;