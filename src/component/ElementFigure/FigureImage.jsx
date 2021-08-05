import React from 'react'
import TinyMceEditor from "../tinyMceEditor";

const TextField = (props) => {
    return (
        <div className='textfield-container'>
            <input placeholder=" " />
            <label className='textfield-label'>{props.label}</label>
            <div className='textfield-border-bottom'></div>
        </div>
    )
}

const FigureImage = () => {
    return (
        <>
            <div className='image-header'>
                <TextField label='Label' />
                <TextField label='Number' />
            </div>
        </>
    )
}

export default FigureImage
