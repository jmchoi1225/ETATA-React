import './main.css';
import '../class/group';
import GroupList from './component/groupList';
import {Timetable, Timetables, BigTimetable} from './component/timetable';
import FindTimetable from './component/findTimetable'
import React from 'react';
import ReactDOM from 'react-dom';

export default class Main extends React.Component{
    render(){
        return(
            <>
                <div className = "header">
                    <h1>ETATA</h1>
                </div>
                <div className = "container">
                    <div className = "leftColumn">
                        <GroupList groups = {this.props.groups}/>    
                        <BigTimetable/>
                        <div className = 'bottomColumn'>
                            <div id = "firstPick">
                                <Timetable/>
                            </div>
                            <div id= "selectedTimetables">
                                <Timetables/>
                            </div>
                        </div>   
                    </div>
                    <div className= "rightColumn">
                        <FindTimetable/>
                    </div>
                </div>        
            </>
        )
    }
}