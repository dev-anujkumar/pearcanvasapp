import React from 'react';
import './Small_RoundedButton.css';
import approvedIcon from './Assets/approved.svg';
import unApprovedIcon from './Assets/unapproved.svg';

function SmallRoundedButton(props) {

    return (
        <div>

            <div className="small_button_wrapper">
                {
                    props.approval ?
                        <div className="small_rounded_btn"><img className="version-icon" src={approvedIcon}/><p class="button_title">Approved</p></div>
                        :
                        <div className="small_rounded_btn2"><img className="version-icon" src={unApprovedIcon}/><p class="button_title">UnApproved</p></div>
                }
            </div>
        </div>
    );
}
export default SmallRoundedButton;
