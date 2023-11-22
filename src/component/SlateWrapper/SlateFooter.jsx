import React from 'react';
import config from '../../config/config';
import {isOwnerRole} from '../../constants/utility';

export function SlateFooter(props) {
    const {projectSharingRole, isSubscribed}=props
    return (
        <div>
            {
                Number(config.page + 1) >= config.totalPageCount || props.elements.length < config.pageLimit ? <div className={`slate-footer ${isOwnerRole(projectSharingRole, isSubscribed) ? ' ownerSlateBackGround' : ''}`}></div> : <div className="loaderContainer"><div className="moreloader"></div></div>
            }
        </div>
    )
}
