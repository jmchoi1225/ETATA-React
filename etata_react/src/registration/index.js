import React, { useState, useEffect }from 'react'
import UseUndo from 'use-undo'
import Group from './component/group'
import RegistrationHelper from '../domain/registrationHelper'
import './registration.css'

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

const Registration = (props) => {

    const __findSameTime = () => {
        let registrationHelper = new RegistrationHelper();
        return registrationHelper._getSameTime(grouplist);
    }

    const __initiateFinished = () => {
        const finished = new Array(grouplist.length).fill(false);
        return finished;
    }

    const __initiateCurCourse = () =>{
        const finished = new Array(grouplist.length).fill(null);
        return finished;
    }

    const __initiateOverlapCount = () => {
        const overlapCount = new Array(grouplist.length);
        for(let g = 0; g < grouplist.length; g++){
            overlapCount[g] = new Array(3);
            for(let rank = 0; rank <3; rank++){
                overlapCount[g][rank] = new Array(grouplist[g].crsLength[rank]).fill(0);
            }
        }
        return overlapCount;
    }

    const __initiateCourseStatus = () => {
        const courseStatus = new Array(grouplist.length);
        for(let g = 0; g < grouplist.length; g++){
            courseStatus[g] = new Array(3);
            for(let rank = 0; rank <3; rank++){
                courseStatus[g][rank] = new Array(grouplist[g].crsLength[rank]).fill("default");
            }
        }
        return courseStatus;
    }

    const [grouplist, setGrouplist] = useState(props.grouplist);
    const [isLoaded, setIsLoaded] = useState(false);
    const [sameTime, setSameTime] = useState();
    const [curCourse, setCurCourse] = useState();
    const [state, setState] = useState();
    const [undo, {
        set : addState,
        reset : clearUndo,
        undo : undoState,
        redo : redoState,
        canUndo,
        canRedo
    }] = UseUndo()


    useEffect(()=>{
        setGrouplist(props.grouplist)
    },[props.grouplist])

    useEffect(()=>{
        if(grouplist){
            setSameTime(__findSameTime())
            setCurCourse(__initiateCurCourse())
            setState({
                finished : __initiateFinished(),
                overlapCount : __initiateOverlapCount(),
                courseStatus : __initiateCourseStatus()
            })
            addState({
                finished : __initiateFinished(),
                overlapCount : __initiateOverlapCount(),
                courseStatus : __initiateCourseStatus()
            })
            setIsLoaded(true)
        }
    },[grouplist])

    const _undo = () =>{
        if(canUndo && undo.past[undo.past.length-1]){
            setState(undo.past[undo.past.length-1])
            undoState()
            setCurCourse(__initiateCurCourse())
        }
    }

    const _redo = () =>{
        if(canRedo){
            setState(undo.future[0])
            redoState()
            setCurCourse(__initiateCurCourse())
        }
    }

    const __getNewState = (curState, groupIdx, crsIdx, change) => {
        const newState = curState.map((group,g) =>{
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

    const __processOverlap = (groupIdx,crsIdx, undo) => {
        const overlapCrs = sameTime[groupIdx][crsIdx["rank"]][crsIdx["idx"]];
        let overIdx = 0;
        return(
            state.overlapCount.map((group,g) =>{
                return group.map((rank,r)=>{
                    return rank.map((crsOverlapCount,i)=>{
                        if(overlapCrs[overIdx] && g==overlapCrs[overIdx]["group"] && r == overlapCrs[overIdx]["rank"] && i == overlapCrs[overIdx]["idx"]){
                            return crsOverlapCount + (undo ? -1:1); 
                        }
                        else return crsOverlapCount;
                    })
                })
            })
        );
    }

    const _selected = (groupIdx, crsIdx, crsID) => {
        if(!state.finished[groupIdx]){
            setCurCourse(__getNewState(curCourse, groupIdx, null, crsIdx));
            copyToClipboard(crsID);
        }
    }

    const _handleChange = (groupIdx, crsIdx, action) => {
        if(crsIdx != undefined && !state.finished[groupIdx]){
            const courseStatus = __getNewState(state.courseStatus,groupIdx, crsIdx,action);
            const finished = action == 'success' ? __getNewState(state.finished, groupIdx, null, true) : state.finished;
            const overlapCount = action == 'success' ? __processOverlap(groupIdx, crsIdx, false) : state.overlapCount;
            setState({
                finished : finished,
                overlapCount : overlapCount,
                courseStatus : courseStatus
            });
            addState({
                finished : finished,
                overlapCount : overlapCount,
                courseStatus : courseStatus
            });
        }
    }

    return(
        <>
        <div id = "header">
            <h4>ETATA</h4>
        </div>
        <div id = "content">
            <div id = "undoNredo">
                <button onClick = {_undo}>undo</button>
                <button onClick = {_redo}>redo</button>
            </div>
            {isLoaded ? 
                grouplist.map((group, idx)=>{
                return(
                    <Group
                        group = {group}
                        curCourse = {curCourse[idx]}
                        courseStatus = {state.courseStatus[idx]}
                        overlapCount = {state.overlapCount[idx]}
                        index = {idx}
                        _selected = {_selected}
                        _handleChange = {_handleChange}
                        key = {idx}
                    />
                )}) :
                null
            }
        </div>
        </>
    );
}


export default Registration