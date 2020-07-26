import React from 'react'

import Course from './course'

const NewCourse = () =>{
    return (
        <button className = "makeGroups_newCourse">
            Add New Course
        </button>
    )
}

const NewGroup = () =>{
    return(
        <div className = "makeGroups_group">
            <button>New Group</button>
        </div>
        
    )
}

const Group = ({group})=>{
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
                                    return <Course course = {course}/>
                                })}
                            </table>
                            <NewCourse/>
                        </div>
                    )
                })} 
            </div>
        </div>
    )
}

export default Group
export {NewGroup}