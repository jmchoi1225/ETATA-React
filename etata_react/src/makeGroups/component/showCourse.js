import React, {useState, useEffect} from 'react'
import axios from 'axios'

const ShowCourse =()=>{
    const [courses, setCourses] = useState([]);
    const courseFeatures = ['ID', 'Name', 'Professor','LectureTime']
    useEffect( ()=>{
        axios.get('/courses').then(res=>{
            setCourses(res.data);
        })
    },[])

    return (
        <div id = 'makeGroups_showCourse'>
            <table>
                <thead>
                    <tr>
                        {courseFeatures.map( feature =>{
                            return <th>{feature}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course =>{
                        return <Course course = {course}/>
                    })}
                </tbody>
            </table>
        </div>
        
    )
}

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

export default ShowCourse