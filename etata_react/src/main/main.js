import './main.css';
import '../class/group';
import GroupList from './component/groupList';
import {Timetable, Timetables, BigTimetable} from './component/timetable';
import FindTimetable from './component/findTimetable'
import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Main = (props) => {
    const [bigTimetable,setBigTimetable] = useState();
    
    const _seeDetails = (timetable) => {
        setBigTimetable(timetable);
    }
    
    return(
        <>
            <div className = "header">
                <h1>ETATA</h1>
            </div>
            <div className = "container">
                <div className = "leftColumn">
                    <GroupList groups = {props.groups}/>    
                    <BigTimetable timetable = {bigTimetable}/>
                    <div className = 'bottomColumn'>
                        <div id = "firstPick">
                            <Timetable _seeDetails = {_seeDetails}/>
                        </div>
                        <div id= "selectedTimetables">
                            <Timetables _seeDetails = {_seeDetails}/>
                        </div>
                    </div>   
                </div>
                <div className= "rightColumn">
                    <FindTimetable groups = {props.groups} _seeDetails = {_seeDetails}/>
                </div>
            </div>        
        </>
    )
}

export default Main