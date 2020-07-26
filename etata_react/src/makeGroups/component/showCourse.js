import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Course from "./course"

const ShowCourse =({_addCourse})=>{
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
                        return (
                            <div>
                                <Course course = {course}/>
                                <button onClick = {()=>{_addCourse(course)}}>선택</button>
                            </div>
                            
                        )
                    })}
                </tbody>
            </table>
        </div>
        
    )
}

export default ShowCourse