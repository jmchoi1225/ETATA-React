import React from 'react'

import Course from './course'

const AddCourse = ({selected,_getGroupAndRankOfNewCourse}) =>{
    return (
        <button className = {"grouplist_newCourse" + (selected ? " grouplist_selected" : "")}
        onClick = {() => {
            _getGroupAndRankOfNewCourse()
        }}>
            Add New Course
        </button>
    )
}

const Group = ({group, groupIdx, selectedGroup, selectedRank,_getGroupAndRankOfNewCourse, _deleteCourse})=>{
    const ranks = [0,1,2]
    return (
        <div className = "grouplist_group">
            <h5> {group.name} </h5>
            <div className = "grouplist_courselist">
                {ranks.map(rank =>{
                    return(
                        <div className = "grouplist_rank">
                            <table>
                                {group.courses[rank].map((course, idx)=>{
                                    return <Course
                                        course = {course}
                                        onClick = {() => {_deleteCourse(groupIdx, rank, idx)}}
                                    />
                                })}
                            </table>
                            <AddCourse
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