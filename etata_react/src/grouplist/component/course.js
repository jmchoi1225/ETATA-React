import React from 'react'

const Course = ({onClick, course})=>{
    const courseFeatures = ['id', 'name', 'professor','lectureTime']
    return (
     <tr onClick = {onClick}>
        {courseFeatures.map(feature =>{
            return <td>{course[feature]}</td>
        })}
     </tr> 
    );
}

export default Course