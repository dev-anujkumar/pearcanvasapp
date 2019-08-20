import React, { Component } from 'react'
import Button from '../ElementButtons/ElementButton';

export class Toolbar extends Component{
    constructor(props){
        super(props);
    
    
    }
    render(){
        return(
            <div className="Toolbar">
                <Button type="element-label" labelText="H1"/>
                <Button type="element-label" labelText="H2"/>
                <Button type="element-label" labelText="H3"/>
                <Button type="element-label" labelText="H4"/>
                <Button type="element-label" labelText="H5"/>
                <Button type="element-label" labelText="H6"/>             
            </div>
        );
    }




}