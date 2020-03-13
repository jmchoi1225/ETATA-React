import React from 'react';
import Group from './component/group'
import Timetable from '../class/timetable'
import './registration.css'

//need to do undo & redo buttons

export default class Registration extends React.Component{
    constructor(props){
        super(props);
        this.sameTime = this._findSameTime()
        this.state = {
            overlapCount : this._initiateOverlapCount()
        }
        this._processOverlap = this._processOverlap.bind(this);
    }

    _findSameTime(){
        const groups = this.props.groups;
        let timetable = new Timetable();

        return timetable._getSameTime(groups);
    }

    _initiateOverlapCount(){
        const groups = this.props.groups;
        const overlapCount = new Array(groups.length);
        for(let g = 0; g < groups.length; g++){
            overlapCount[g] = new Array(3);
            for(let rank = 0; rank <3; rank++){
                overlapCount[g][rank] = new Array(groups[g].crsLength[rank]).fill(0);
            }
        }
        return overlapCount;
    }

    _processOverlap(groupIdx,crsIdx){
        const overlapCrs = this.sameTime[groupIdx][crsIdx["rank"]][crsIdx["idx"]];
        let overIdx = 0;
        this.setState(state =>{
            const newOverlapCount = state.overlapCount.map((group,g) =>{
                return group.map((rank,r)=>{
                    return rank.map((crsOverlapCount,i)=>{
                        if(g==overlapCrs[overIdx]["group"] && r == overlapCrs[overIdx]["rank"] && i == overlapCrs[overIdx]["idx"]){
                            
                            return crsOverlapCount +1; 
                        }
                        else return crsOverlapCount;
                    })
                })
            })
            return {overlapCount : newOverlapCount};
        })
    }

    render(){
        return(
            <>
            <div id = "header">
                <h4>ETATA</h4>
            </div>
            <div id = "content">
                <div id = "undoNredo">
                    <button id = "undo">undo</button>
                    <button id = "redo">redo</button>
                </div>
                {this.props.groups.map((group, idx)=>{
                    return <Group group = {group} overlapCount = {this.state.overlapCount[idx]} _processOverlap = {this._processOverlap} index = {idx} key = {idx}/>
                })}
            </div>
            </>
        );
    }
}