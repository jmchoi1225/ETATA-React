import React, {useState}from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import Group from './component/group'
import ShowCourse from './component/showCourse'
import AddGroup from './component/addGroup'
import './makeGroups.css'

const MakeGroups = (props) => {
    const [groups, setGroups] = useState(props.groups);

    const [newCourseGroupIdx, setNewCourseGroupIdx] = useState(-1);
    const [newCourseRank, setNewCourseRank] = useState(-1);

    const _addGroup = (group) =>{
        setGroups([...groups, group])
        console.log(groups)
    }

    const _getGroupAndRankOfNewCourse = (groupIdx, rank) => {
        setNewCourseGroupIdx(groupIdx);
        setNewCourseRank(rank);
        console.log("Group : ", newCourseGroupIdx," Rank : ", newCourseRank, " chosen");
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
            <ShowCourse/>
            <Link to = '/' onClick={()=> props._changeGroups(groups)}>완료</Link>
        </div>
        </>
    );
}


export default MakeGroups