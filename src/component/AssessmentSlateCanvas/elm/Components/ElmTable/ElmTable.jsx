import React, { Component } from 'react';
import './ElmTable.css';
import { connect } from 'react-redux';

var sortFlag = true;
var projectDetails = require('../../../../../js/constants/projectData').projectDetails;
var svg;

class ElmTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableValue: [],
            isActive: null,
            addFlag: false,
            noDataFound: false,
            currentUrn : this.props.apiData.versionUrn,
            parentUrn : null
        },
        this.preparedData = [];
        this.setSort();
    }
    componentWillMount() {
        this.firstName = this.getCookie('BOOK_TITLE');
        this.renderTableData(this.props)
    }

    renderTableData = (currentProps)=>{
        if (!currentProps.errFlag && currentProps.apiData) {
            this.filterData(currentProps.getCurrentSlateObject.getCurrentSlateParent, currentProps.apiData);
        }

        setTimeout(() => {
            if(!this.state.tableValue.length){
                this.getResourcefromFilterData(currentProps.apiData);
            }
        },0) 
    }

    componentWillReceiveProps(nextProps){
        if(JSON.stringify(nextProps.apiData) !== JSON.stringify(this.props.apiData)){
            this.renderTableData(nextProps);
        }
    }

    filterData = (urn, apiData, parentUrn = this.state.currentUrn) => {
        this.preparedData = [];
        this.setState({addFlag: false, isActive : null});
        if(urn === parentUrn){
            this.getResourcefromFilterData(apiData)
        }
        else if(apiData.contents){
            apiData = apiData.contents;

            apiData.frontMatter && apiData.frontMatter.forEach((data) => {
                this.filterSubData(data, urn, parentUrn)
            })
    
            apiData.bodyMatter && apiData.bodyMatter.forEach((data) => {
                this.filterSubData(data, urn, parentUrn)
            })
    
            apiData.backMatter && apiData.backMatter.forEach((data) => {
                this.filterSubData(data, urn, parentUrn)
            })
        }
        else if(!(apiData.contents || this.preparedData.length)){
            this.getResourcefromFilterData(apiData)
        }


        // if(!this.preparedData.length){
        //     this.getResourcefromFilterData();
        // }

    }

    filterSubData = (data, urn, parentUrn) => {

        if (data.versionUrn === urn) {
            return this.getResourcefromFilterData(data,parentUrn)
        }
        else {
            if (data.contents)
                this.filterData(urn, data, data.versionUrn)
            else
                return ;
        }
    }

    getResourcefromFilterData = (data,parentUrn) => {

        if (data.alignments && data.alignments.resourceCollections && data.alignments.resourceCollections.length) {
            data.alignments.resourceCollections.forEach((resource) => {
                if (resource.resources && resource.resources.length) {
                    resource.resources.forEach((assesments) => {
                        this.preparedData.push({ "type": assesments.type, "urn": assesments.urn })
                    })
                }
            })
        }
        if (data.contents && data.contents.bodyMatter && data.contents.bodyMatter.length) {
            data.contents.bodyMatter.forEach((data) => {
                this.preparedData.push({ "type": data.label, "urn": data.versionUrn, "title": data.unformattedTitle ? data.unformattedTitle.en : data.versionUrn})
            })
        }

        return this.setState({ tableValue: this.preparedData, parentUrn : parentUrn, parentTitle : (data.unformattedTitle && data.unformattedTitle.en) ? data.unformattedTitle.en : this.firstName })

    }

    getCookie = (name) => {
        let { PROJECT_URN } = projectDetails;
        let cookieArray = document.cookie.split(';')
        let matchedCookie = '';
        for(var i=0; i<cookieArray.length; i++) {
            let isExist = cookieArray[i].includes(PROJECT_URN);
            if(isExist) {
                matchedCookie = cookieArray[i];
                break;
            }
        }
        let cookieArray1 = matchedCookie.split('=')[1].split(',');
        let matchedCookie1 = '';
        for(var i=0; i<cookieArray1.length; i++) {
            let isExist = cookieArray1[i].includes(name);
            if(isExist) {
                matchedCookie1 = cookieArray1[i];
                break;
            }
        }
        return matchedCookie1.split(":'")[1] ? matchedCookie1.split(":'")[1].replace(/\'/gi, ''): '';
    }

    showNewValueList = (e, versionUrn) => {
        this.filterData(versionUrn,this.props.apiData);
    }
    addAssessment = (addedValue) => {
        this.setState({addFlag: true});
        this.currentAssessmentSelected = {...addedValue};
    }
    navigateBack = () => {
        this.filterData(this.state.parentUrn,this.props.apiData);
    }

    setSort = () => {
            if(sortFlag){
                svg = <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 31.49 31.49" style={{backgroundColor:'white'}} xmlSpace="preserve" width="15" height="10" transform="rotate(90)">
            <path fill="#1E201D" d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111
                C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587
                c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"/>
            </svg>
            }
            else{
                svg = <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 31.49 31.49" style={{backgroundColor:'white'}} xmlSpace="preserve" width="15" height="10" transform="rotate(-90)">
            <path fill="#1E201D" d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111
                C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587
                c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"/>
            </svg>
            }
        this.setState({ tableValue: this.state.tableValue.sort(this.dynamicSort("title")).reverse() ,addFlag: false, isActive : null });
        // }
        sortFlag = !sortFlag;
    }

    dynamicSort = (property, event) => {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result;
            var first = (a[property]?a[property]:a.urn).toLowerCase();
            var second = (b[property]?b[property]:b.urn).toLowerCase();
            if (sortFlag) {
                result = (first < second) ? -1 : (first > second) ? 1 : 0;
            }
            else {
                result = (first > second) ? -1 : (first > second) ? 1 : 0;
            }
            return result * sortOrder;
        }
    }
    sendPufAssessment = () => {
        let obj = {
            id : this.currentAssessmentSelected.urn,
            title : "dummy",
            assessmentFormat : "puf",
            usagetype : this.props.usageTypeMetadata
        }
        this.props.addPufFunction(obj);
        this.props.closeElmWindow();
    }

    toggleActive = i => {
          this.setState({
            isActive: i
          });
      }

    getFolderLabel = label =>{
        switch(label){
            case 'chapter' : return 'C'
            case 'module' : return 'M'  
            case 'part' : return 'P'  
            case 'section' : return 'S'  
            case 'assessment' : return 'AS'
            case 'container-introduction':return 'IS';
            case 'introductry-slate': return 'IS';
            default : return 'NA'       
        }
    }

    render() {
        if(this.props.errFlag){
            return(
                <div>
                    <div className='table-header'>
                        {(this.state.parentUrn > 1) ?
                            <svg onClick={this.navigateBack} style={{verticalAlign: 'middle', cursor: 'pointer'}} fill='rgb(86, 83, 83)' transform="rotate(-90)" width="15" height="15" viewBox="0 0 24 24">
                                <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
                                <path d="M0 0h24v24H0z" fill="none"></path>
                            </svg> : null}
                        <p className="title-header">{this.state.parentTitle}</p>
                    </div>
                    <div style={{textAlign: 'center', marginTop: '5%'}}>
                        <p style={{marginTop: '2%'}}>
                            {this.props.errorStatus==404 ? <i>This project has no PUF assessments currently. Please add a PUF assessment to this project first</i> : <i>**Error occured, Please try again!!!</i>}
                        </p>
                    </div>
                </div>
            );
        }
        else if(!this.props.errFlag){
            return(
                <div>
                    <div className='table-header'>
                        {(this.state.parentUrn) ?
                            <svg onClick={this.navigateBack} style={{verticalAlign: 'middle', cursor: 'pointer'}} fill='rgb(86, 83, 83)' transform="rotate(-90)" width="15" height="15" viewBox="0 0 24 24">
                                <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
                                <path d="M0 0h24v24H0z" fill="none"></path>
                            </svg> : null}
                        <p className="title-header">{this.state.parentTitle}</p>
                    </div>
                    <div className='mainDiv'>
                        <table className='tableClass'>
                            <thead>
                                <th className='rowClass'>
                                    <td className='tdClass' style={{display:'inline-block', width: '6.5%', color: 'black'}}>Title</td>
                                    <button style={{height:'10px', width: '0px'}} onClick={() => this.setSort()}>
                                        {svg}
                                    </button>
                                </th>
                                {/* <th className='rowClass'>
                                    <td className='tdClass'>ID</td>
                                </th> */}
                            </thead>
                            {this.state.tableValue.map((item, index) => {
                                if (item.type == "assessment" && item.urn.includes("work")) {
                                    return (
                                        <tr className='rowClass' style={this.state.isActive === index ? { backgroundColor: '#dbf2e0' } : { backgroundColor: 'white' }} key={index} onClick={() => this.toggleActive(index)}>
                                            <td className='tdClass' key={index} onClick={() => this.addAssessment(item)}>

                                                <svg style={{marginRight : "6px"}} width="20" height="17" viewBox="0 0 24 24" version="1.1">
                                                    <g id="surface1">
                                                        <path className=" cls-3" d="M 2.390625 0 L 21.609375 0 C 22.929688 0 24 1.070312 24 2.390625 L 24 21.609375 C 24 22.929688 22.929688 24 21.609375 24 L 2.390625 24 C 1.070312 24 0 22.929688 0 21.609375 L 0 2.390625 C 0 1.070312 1.070312 0 2.390625 0 Z M 2.390625 0 " />
                                                        <path className=" cls-2" d="M 2.390625 0 L 21.609375 0 C 22.929688 0 24 1.070312 24 2.390625 L 24 21.609375 C 24 22.929688 22.929688 24 21.609375 24 L 2.390625 24 C 1.070312 24 0 22.929688 0 21.609375 L 0 2.390625 C 0 1.070312 1.070312 0 2.390625 0 Z M 2.390625 0 " />
                                                        <path className=" cls-1" d="M 7.929688 3.855469 L 19.929688 3.855469 L 19.929688 5.570312 L 7.929688 5.570312 L 7.929688 3.855469 " />
                                                        <path className=" cls-1" d="M 7.929688 10.429688 L 7.929688 8.71875 L 19.929688 8.71875 L 19.929688 10.429688 L 7.929688 10.429688 " />
                                                        <path className=" cls-1" d="M 5.355469 3.429688 C 6.066406 3.429688 6.644531 4.003906 6.644531 4.714844 C 6.644531 5.425781 6.066406 6 5.355469 6 C 4.648438 6 4.070312 5.425781 4.070312 4.714844 C 4.070312 4.003906 4.648438 3.429688 5.355469 3.429688 " />
                                                        <path className=" cls-1" d="M 5.355469 8.289062 C 6.066406 8.289062 6.644531 8.863281 6.644531 9.574219 C 6.644531 10.285156 6.066406 10.859375 5.355469 10.859375 C 4.648438 10.859375 4.070312 10.285156 4.070312 9.574219 C 4.070312 8.863281 4.648438 8.289062 5.355469 8.289062 " />
                                                        <path className=" cls-1" d="M 7.929688 15.28125 L 7.929688 13.570312 L 19.929688 13.570312 L 19.929688 15.28125 L 7.929688 15.28125 " />
                                                        <path className=" cls-1" d="M 6.644531 14.425781 C 6.644531 15.136719 6.066406 15.710938 5.355469 15.710938 C 4.648438 15.710938 4.070312 15.136719 4.070312 14.425781 C 4.070312 13.714844 4.648438 13.140625 5.355469 13.140625 C 6.066406 13.140625 6.644531 13.714844 6.644531 14.425781 Z M 6.644531 14.425781 " />
                                                        <path className=" cls-1" d="M 7.929688 20.144531 L 7.929688 18.429688 L 19.929688 18.429688 L 19.929688 20.144531 L 7.929688 20.144531 " />
                                                        <path className=" cls-1" d="M 6.644531 19.285156 C 6.644531 19.996094 6.066406 20.570312 5.355469 20.570312 C 4.648438 20.570312 4.070312 19.996094 4.070312 19.285156 C 4.070312 18.574219 4.648438 18 5.355469 18 C 6.066406 18 6.644531 18.574219 6.644531 19.285156 Z M 6.644531 19.285156 " />
                                                    </g>
                                                </svg>

                                                <b className="elm-text-assesment">{item.urn}</b></td>
                                        </tr>
                                    );
                                }
                                else {
                                    return (
                                        <tbody>
                                            {(this.props.openedFrom == 'slateAssessment') && (item.type !== 'figure') && <tr className='rowClass'>
                                                <td className='tdClass' key={index} onClick={(e) => { this.showNewValueList(e, item.urn) }}>
                                                <div className="descBox">{this.getFolderLabel(item.type)} <span className="folder-icon"></span> </div>
                                                <b className="elm-text-folder">{item.title}</b></td>
                                            </tr>}
                                        </tbody>
                                    )
                                }
                            })}
                        </table>
                    </div>
                    <div className="puf-footer">
                        <button className="puf-button" onClick={this.props.closeElmWindow}>CANCEL</button>
                        <button className={`puf-button add-button ${this.state.addFlag ? 'add-button-enabled' : ''}`} disabled={!this.state.addFlag} onClick ={this.sendPufAssessment}>ADD</button>
                    </div>
                </div>
            );
        }
    }
}


export default connect((state)=>{

    return {
        getCurrentSlateObject: state.prepareAllSlates.slateObj
    }

})(ElmTable);