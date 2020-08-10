import React from 'react'

import Course from './course'

const NewCourse = ({selected,_getGroupAndRankOfNewCourse}) =>{
    console.log(selected)
    return (
        <button className = {"makeGroups_newCourse" + (selected ? " makeGroups_selected" : "")}
        onClick = {() => {
            _getGroupAndRankOfNewCourse()
        }}>
            Add New Course
        </button>
    )
}

const Group = ({group, groupIdx, selectedGroup, selectedRank,_getGroupAndRankOfNewCourse, _deleteCourse})=>{
    console.log(group)
    const ranks = [0,1,2]
    return (
        <div className = "makeGroups_group">
            <h5> {group.name} </h5>
            <div className = "makeGroups_courselist">
                {ranks.map(rank =>{
                    return(
                        <div className = "makeGroups_rank">
                            <table>
                                {group.courses[rank].map((course, idx)=>{
                                    return <Course
                                        course = {course}
                                        rank = {idx}
                                        _deleteCourse = {_deleteCourse(groupIdx, rank, idx)}
                                    />
                                })}
                            </table>
                            <NewCourse
                                selected = {selectedGroup == groupIdx && selectedRank == rank} 
                                _getGroupAndRankOfNewCourse = {()=>{_getGroupAndRankOfNewCourse(groupIdx, rank)}}
                            />
                        </div>
                    )
                })} 
            </div>
        </div>
    )
}

export default Group