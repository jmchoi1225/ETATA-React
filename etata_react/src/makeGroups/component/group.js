import React from 'react'

const Course = ({course}) =>{
    return <span className = "course">Course: {course.name} ID : {course.id} Time : {course.lecTime}  </span>
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
                            {group.courses[rank].map((course, idx)=>{
                                return <Course course = {course}/>
                            })}
                        </div>
                    )
                })} 
            </div>
        </div>
    )
}

export default Group