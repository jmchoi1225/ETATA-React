import './main.css';

import React, {useState, useEffect} from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {Link} from 'react-router-dom'

import GroupList from './component/groupList';
import {Timetable, Timetables} from './component/timetable';
import BigTimetable from './component/bigTimetable';
import FindTimetable from './component/findTimetable'
import SelectedTimetables from './component/selectedTimetables';
import FirstPick from './component/firstPick';
import { Course } from '../domain/group';

const Main = (props) => {
    const [grouplist, setGrouplist] = useState();
    const [bigTimetable,setBigTimetable] = useState();
    const [selectedTimetables, setSelectedTimetables] = useState([]);
    const [firstPick, setFirstPick] = useState();
    
    useEffect(()=>{
        setGrouplist(props.grouplist)
    }, [props.grouplist])

    useEffect(()=>{
        console.log(grouplist)
    }, [grouplist])

    const _seeDetails = (timetable) => {
        setBigTimetable(timetable);
    }

    const _addToSelectedTimetables = (timetable) =>{
        let included = false;
        let newState = selectedTimetables.map(t=>{
            if(t==timetable) included = true;
            return t;
        });
        if(!included) newState.push(timetable)
        
        setSelectedTimetables(newState)
    }

    const _changeFirstPick = () => {
        if(grouplist){
            props._changeGroups(grouplist.map((group,g)=>{
                for(let r =0; r<3; r++){
                    for(let i = 0; i< group.crsLength[r]; i++){
                        if(group.courses[r][i].id==firstPick.courses[g].id){
                            group.firstIdx = {"rank" : r,"idx" : i}
                            console.log(group)
                            return group
                        }
                    }
                }
                return group;
            }))
        }
    }

    return(
        <DndProvider backend={HTML5Backend}>
            <div className = "header">
                <h1>ETATA</h1>
            </div>
            <div className = "container">
                <div className = "leftColumn">
                    <GroupList grouplist = {grouplist}/>    
                    <BigTimetable timetable = {bigTimetable}/>
                    <div className = 'bottomColumn'>
                        <FirstPick
                            timetable = {firstPick}
                            _seeDetails = {_seeDetails}
                            _changeFirstPick = {setFirstPick}
                        />
                        <SelectedTimetables
                            timetables = {selectedTimetables}
                            _seeDetails = {_seeDetails}
                            _addToSelectedTimetables = {_addToSelectedTimetables}
                        />
                    </div>   
                </div>
                <div className= "rightColumn">
                    <FindTimetable grouplist = {grouplist} _seeDetails = {_seeDetails}/>
                    <div className = "registrationButton">
                        <Link to = '/registration'>
                            <button onClick = {_changeFirstPick}>수강신청 도우미</button>
                        </Link>
                    </div>
                </div>
            </div>        
        </DndProvider>
    )
}

export default Main