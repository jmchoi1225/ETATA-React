import React, {useState}from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import Group from './component/group'
import ShowCourse from './component/showCourse'
import AddGroup from './component/addGroup'
import './makeGroups.css'
import Course from './component/course'

const MakeGroups = (props) => {
    const [groups, setGroups] = useState(props.groups);

    const [newCourseGroupIdx, setNewCourseGroupIdx] = useState(-1);
    const [newCourseRank, setNewCourseRank] = useState(-1);

    const _addGroup = (group) =>{
        setGroups([...groups, group])
    }

    const _getGroupAndRankOfNewCourse = (groupIdx, rank) => {
        setNewCourseGroupIdx(groupIdx);
        setNewCourseRank(rank);
    }

    const _addCourse = (course) => {
        setGroups(groups.map((group,idx)=>{
            if(idx==newCourseGroupIdx){
                group.addCourse(newCourseRank,course);
                return group;
            }else return group;
        }))
        setNewCourseGroupIdx(-1);
        setNewCourseRank(-1);
    }

    return(
        <>
        <div id = "header">
            <h4>ETATA</h4>
        </div>
        <div id = "content">
            <div id="makeGroups_groups">
                {groups.map((group, gIdx) =>{
                    return <Group
                        group = {group}
                        groupIdx = {gIdx}
                        selectedGroup = {newCourseGroupIdx}
                        selectedRank = {newCourseRank}
                        _getGroupAndRankOfNewCourse = {_getGroupAndRankOfNewCourse}
                    />
                })}
                <AddGroup _addGroup = {_addGroup}/>
            </div>
            {newCourseGroupIdx!=-1 && newCourseRank !=-1 ?
                <ShowCourse
                    _addCourse= {_addCourse}
                /> : null}
            <Link to = '/' onClick={()=> props._changeGroups(groups)}>완료</Link>
        </div>
        </>
    );
}


export default MakeGroups