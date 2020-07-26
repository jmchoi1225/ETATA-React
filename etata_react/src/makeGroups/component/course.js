import React from 'react'

const Course = ({course})=>{
    const courseFeatures = ['id', 'name', 'professor','lectureTime']
    return (
     <tr>
        {courseFeatures.map(feature =>{
            return <td>{course[feature]}</td>
        })}
     </tr> 
    );
}

export default Course