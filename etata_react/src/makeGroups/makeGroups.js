import React, { useState, useEffect }from 'react'
import axios from 'axios'
import Group from './component/group'
import Course from './component/course'
import './makeGroups.css'

const MakeGroups = (props) => {
    const [groups, setGroups] = useState(props.groups);
    const [courses, setCourses] = useState([]);
    
    useEffect( ()=>{
        axios.get('/getCourses').then(res=>{
            setCourses(res.data);
        })
    },[])

    return(
        <>
        <div id = "header">
            <h4>ETATA</h4>
        </div>
        <div id = "content">
            <div id="groups">
                {groups.map(group =>{
                    return <Group group = {group}/>
                })}
            </div>
            <div id="courseList">
                {courses.map(course =>{
                    return <Course course = {course}/>
                })}
            </div>
        </div>
        </>
    );
}


export default MakeGroups