import React, {useState}from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import Group from './component/group'
import ShowCourse from './component/showCourse'
import AddGroup from './component/addGroup'
import './makeGroups.css'

const MakeGroups = (props) => {
    const [groups, setGroups] = useState(props.groups);

    const _addGroup = (group) =>{
        setGroups([...groups, group])
        console.log(groups)
    }

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
                <AddGroup _addGroup = {_addGroup}/>
            </div>
            <ShowCourse/>
            <Link to = '/' onClick={()=> props._changeGroups(groups)}>완료</Link>
        </div>
        </>
    );
}


export default MakeGroups