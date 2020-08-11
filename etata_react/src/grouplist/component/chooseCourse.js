import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Course from "./course"

const ShowCourse =({_addCourse})=>{
    const [courses, setCourses] = useState([]);
    const courseFeatures = ['ID', 'Name', 'Professor','LectureTime']
    useEffect( ()=>{
        if(courses != []){
            axios.get('/courses').then(res=>{
                setCourses(res.data);
            })
        }
    },[])

    return (
        <div id = 'grouplist_showCourse'>
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
                            <Course course = {course} onClick = {()=>{_addCourse(course)}}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
        
    )
}

export default ShowCourse