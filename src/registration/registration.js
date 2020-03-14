import React, {useReducer}from 'react';
import Group from './component/group'
import Timetable from '../class/timetable'
import './registration.css'

//need to do undo & redo buttons

const copyToClipboard = str => {
    const el = document.createElement('textarea');  // Create a <textarea> element
    el.value = str;                                 // Set its value to the string that you want copied
    el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
    el.style.position = 'absolute';                 
    el.style.left = '-9999px';                      // Move outside the screen to make it invisible
    document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
    const selected =            
      document.getSelection().rangeCount > 0        // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0)     // Store selection if found
        : false;                                    // Mark as false to know no selection existed before
    el.select();                                    // Select the <textarea> content
    document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el);                  // Remove the <textarea> element
    if (selected) {                                 // If a selection existed before copying
      document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
      document.getSelection().addRange(selected);   // Restore the original selection
    }
};


export default class Registration extends React.Component{
    constructor(props){
        super(props);
        this.sameTime = this.__findSameTime()
        this.state = {
            finished : this.__initiateFinished(),
            curCourse : this.__initiateCurCourse(), //: array[group] = {"rank" : rank , "idx" : idx}
            overlapCount : this.__initiateOverlapCount(), //: 3D matrix [group][rank][idx]
            courseStatus : this.__initiateCourseStatus(), //: 3D matrix [group][rank][idx] = "default" || "success" || "fail"
        }
    }

    __findSameTime(){
        const groups = this.props.groups;
        let timetable = new Timetable();

        return timetable._getSameTime(groups);
    }

    __initiateFinished(){
        const groups = this.props.groups;
        const finished = new Array(groups.length).fill(false);
        return finished;
    }

    __initiateCurCourse(){
        const groups = this.props.groups;
        const finished = new Array(groups.length).fill(null);
        return finished;
    }

    __initiateOverlapCount(){
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

    __initiateCourseStatus(){
        const groups = this.props.groups;
        const courseStatus = new Array(groups.length);
        for(let g = 0; g < groups.length; g++){
            courseStatus[g] = new Array(3);
            for(let rank = 0; rank <3; rank++){
                courseStatus[g][rank] = new Array(groups[g].crsLength[rank]).fill("default");
            }
        }
        return courseStatus;
    }

    __getNewState(state, groupIdx, crsIdx, change){
        const newState = state.map((group,g) =>{
            if(crsIdx != undefined){
                if(g==groupIdx){
                    return group.map((rank,r)=>{
                        if(crsIdx["rank"] == r){
                            return rank.map((crs,i)=>{
                                if(crsIdx['idx']==i) return change
                                else return crs;
                            })
                        }
                        else return rank;
                    })
                }
                else return group;
            }else{
                if(g == groupIdx) return change;
                else return group;
            }
            
        })
        return newState;
    }

    __processOverlap = (groupIdx,crsIdx, undo) => {
        const overlapCrs = this.sameTime[groupIdx][crsIdx["rank"]][crsIdx["idx"]];
        let overIdx = 0;
        this.setState(state =>{
            const newOverlapCount = state.overlapCount.map((group,g) =>{
                return group.map((rank,r)=>{
                    return rank.map((crsOverlapCount,i)=>{
                        if(g==overlapCrs[overIdx]["group"] && r == overlapCrs[overIdx]["rank"] && i == overlapCrs[overIdx]["idx"]){
                            return crsOverlapCount + (undo ? -1:1); 
                        }
                        else return crsOverlapCount;
                    })
                })
            })
            return {overlapCount : newOverlapCount};
        })
    }

    _selected = (groupIdx, crsIdx, crsID) => {
        if(!this.state.finished[groupIdx]){
            this.setState(state =>{
                const newCurCourse = this.__getNewState(state.curCourse, groupIdx, null, crsIdx)
                return {curCourse : newCurCourse}
            });
            copyToClipboard(crsID);
        }
    }

    _handleChange = (groupIdx, crsIdx, action) => {
        if(crsIdx != undefined && !this.state.finished[groupIdx]){
            this.setState(state =>{
                const newStatus = this.__getNewState(state.courseStatus,groupIdx, crsIdx,action)
                return {courseStatus : newStatus}
            })
            if(action == 'success'){
                this.setState(state =>{
                    const newFinished = this.__getNewState(state.finished, groupIdx, null, true)
                    return {finished : newFinished}
                });
                this.__processOverlap(groupIdx, crsIdx, false)
            }
        }
    }

    render(){
        return(
            <>
            <div id = "header">
                <h4>ETATA</h4>
            </div>
            <div id = "content">
                <div id = "undoNredo">
                    <button>undo</button>
                    <button>redo</button>
                </div>
                {this.props.groups.map((group, idx)=>{
                    return(
                        <Group
                            group = {group}
                            curCourse = {this.state.curCourse[idx]}
                            courseStatus = {this.state.courseStatus[idx]}
                            overlapCount = {this.state.overlapCount[idx]}
                            index = {idx}
                            _selected = {this._selected}
                            _handleChange = {this._handleChange}
                            key = {idx}
                        />
                    )
                })}
            </div>
            </>
        );
    }
}