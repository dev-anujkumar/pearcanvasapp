import React, { Component } from 'react';

export function SmalllLoader() {
    return (
        <div className='--hr-loading sm'>
            <span className='--sm-hr-loading'>Loading content</span>
            <span className='--lg-hr-loading'>Loading content</span>
        </div>
    )
}
export function LargeLoader() {
    return (
        <div className='--hr-loading lg'>
            <span className='--sm-hr-loading'>Loading content</span>
            <span className='--lg-hr-loading'>Loading content</span>
            <span className='--lg-hr-loading'>Loading content</span>
        </div>
    )
}