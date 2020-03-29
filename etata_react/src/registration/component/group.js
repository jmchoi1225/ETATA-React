import React from 'react';
import '../../class/group';

function Course(props){
    const course = props.course
    let btnClass = 'course'
    if(props.status == "default"){
        if(props.picked){
            btnClass += " picked"
        }else if(props.overlapCount > 0){
            btnClass += " overlap"
        }else{
            btnClass += " default"
        }
    }
    else btnClass += ' ' + props.status;
    return(
        <button className = {btnClass} onClick = {() =>props._selected(props.groupIdx, props.index, course.id)}>{course.id}</button>
    )
}

export default function Group (props){
    const ranks = [0,1,2];
    const group = props.group;
    return(
        <div className = "group">
            <div className = "first">
                <div className = "groupContainer"> {props.group.name} </div>
                <hr/>
                <div className = "groupContainer">
                    {group.firstIdx ?
                        <Course
                            course = {group.getCourse(group.firstIdx["rank"], group.firstIdx["idx"])}
                            groupIdx = {props.index}
                            status = {props.courseStatus[group.firstIdx["rank"]][group.firstIdx["idx"]]}
                            overlapCount = {props.overlapCount[group.firstIdx["rank"]][group.firstIdx["idx"]]}
                            //picked = {props.curCourse && group.firstIdx["rank"] == curCourse["rank"] && group.firstIdx["idx"]==curCourse["idx"]}
                            index = {group.firstIdx}
                            _selected = {props._selected}
                            key = {group.firstIdx}
                        /> 
                        :
                        <button/>
                    }
                </div>
                <div className = "groupContainer">
                    <button className = "success" onClick = {()=>{props._handleChange(props.index,props.curCourse, 'success')}}>성공</button>
                    <button className = "fail" onClick = {()=>{props._handleChange(props.index,props.curCourse,'fail')}} >실패</button>
                </div>
            </div>
            <div className = "courses">
                {ranks.map(rank =>{
                    return(
                        <div className = "groupContainer">
                            {group.courses[rank].map((course, idx)=>{
                                const picked = props.curCourse == undefined ? false : props.curCourse["rank"] == rank && props.curCourse["idx"] == idx
                                return <Course
                                    course = {course}
                                    groupIdx = {props.index}
                                    status = {props.courseStatus[rank][idx]}
                                    overlapCount = {props.overlapCount[rank][idx]}
                                    picked = {picked}
                                    _selected = {props._selected}
                                    index = {{"rank": rank, "idx": idx}}
                                    key = {[rank,idx]}
                                />
                            })}
                        </div>
                    )
                })} 
            </div>
        </div>
    )
}