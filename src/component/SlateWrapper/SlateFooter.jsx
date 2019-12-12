import React from 'react';
import config from '../../config/config';

export function SlateFooter(props) {
    return (
        <div>
            {
                Number(config.page+1) >= config.totalPageCount || props.elements.length < config.pageLimit ? <div className='slate-footer'></div> : <div className="loaderContainer"><div className="moreloader"></div></div>
            }
        </div>
    )
}