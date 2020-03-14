import React from 'react';
import '../../class/group';

function Course({course,groupIdx,status,overlapCount,picked,index,_selected}){
    let btnClass = 'course';
    if(status == "default"){
        if(picked){
            btnClass += " picked"
        }else if(overlapCount > 0){
            btnClass += " overlap"
        }else{
            btnClass += " default"
        }
    }
    else btnClass += ' ' + status;
    return(
        <button className = {btnClass} onClick = {() =>_selected(groupIdx, index, course.id)}>{course.id}</button>
    )
}

export default function Group ({group, curCourse, courseStatus, overlapCount,index,_selected,_handleChange}){
    const ranks = [0,1,2];
    return(
        <div className = "group">
            <div className = "first">
                <div className = "groupContainer"> {group.name} </div>
                <hr/>
                <div className = "groupContainer">
                    {group.firstIdx ?
                        <Course
                            course = {group.getCourse(group.firstIdx["rank"], group.firstIdx["idx"])}
                            groupIdx = {index}
                            status = {courseStatus[group.firstIdx["rank"]][group.firstIdx["idx"]]}
                            overlapCount = {overlapCount[group.firstIdx["rank"]][group.firstIdx["idx"]]}
                            picked = {curCourse && group.firstIdx["rank"] == curCourse["rank"] && group.firstIdx["idx"]==curCourse["idx"]}
                            index = {group.firstIdx}
                            _selected = {_selected}
                            key = {group.firstIdx}
                        /> 
                        :
                        <button/>
                    }
                </div>
                <div className = "groupContainer">
                    <button className = "success" onClick = {()=>{_handleChange(index,curCourse, 'success')}}>성공</button>
                    <button className = "fail" onClick = {()=>{_handleChange(index,curCourse,'fail')}} >실패</button>
                </div>
            </div>
            <div className = "courses">
                {ranks.map(rank =>{
                    return(
                        <div className = "groupContainer">
                            {group.courses[rank].map((course, idx)=>{
                                const picked = curCourse == undefined ? false : curCourse["rank"] == rank && curCourse["idx"] == idx
                                return <Course
                                    course = {course}
                                    groupIdx = {index}
                                    status = {courseStatus[rank][idx]}
                                    overlapCount = {overlapCount[rank][idx]}
                                    picked = {picked}
                                    _selected = {_selected}
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