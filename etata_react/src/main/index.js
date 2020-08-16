import './main.css';
import {Group} from '../domain/group';
import GroupList from './component/groupList';
import {Timetable, Timetables, BigTimetable} from './component/timetable';
import FindTimetable from './component/findTimetable'
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

const Main = (props) => {
    const [grouplist, setGrouplist] = useState();
    const [bigTimetable,setBigTimetable] = useState();
    
    useEffect(()=>{
        setGrouplist(props.grouplist)
    }, [props.grouplist])

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
                    <GroupList grouplist = {grouplist}/>    
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
                    <FindTimetable grouplist = {grouplist} _seeDetails = {_seeDetails}/>
                </div>
            </div>        
        </>
    )
}

export default Main