import React from 'react';
import config from '../../config/config';

export function SlateFooter(props) {
    return (
        <div>
            {
                config.page === config.totalPageCount || props.elements.length < config.pageLimit ? <div className='slate-footer'></div> : <div class="loaderContainer"><div class="moreloader"></div></div>
            }
        </div>
    )
}