import React from 'react';


function Small_RoundedButton(props) {

    return (
        <div>
            {
                props.approval === true ? <div ><button className = "small_rounded_btn"> <img src = {Assets} className="assets1" ></img>Approved</button></div>: <button>UnApproved</button>
            }
        </div>

    );
}
export default Small_RoundedButton;
