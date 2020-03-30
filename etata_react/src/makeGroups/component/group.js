import React from 'react'

const Course = ({course}) =>{
    return <span className = "course">{course.id}</span>
}

const Group = ({group})=>{
    console.log(group)
    const ranks = [0,1,2]
    return (
        <div className = "group">
            <h5> {group.name} </h5>
            <div className = "courselist">
                {ranks.map(rank =>{
                    return(
                        <div className = "rank">
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