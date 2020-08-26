import React, {useState, useEffect}from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'

import GroupComponent from './component/group'
import ChooseCourse from './component/chooseCourse'
import AddGroup from './component/addGroup'

import {Group} from '../domain/group'

import './grouplist.css'


const userId = 1;

const Grouplist = (props) => {

    const [grouplist, setGrouplist] = useState(props.grouplist);
    const [newCourseGroupIdx, setNewCourseGroupIdx] = useState(-1);
    const [newCourseRank, setNewCourseRank] = useState(-1);

    useEffect(()=>{
        setGrouplist(props.grouplist)
    },[props.grouplist])

    const _addGroup = (group) =>{
        if(grouplist) setGrouplist([...grouplist, group])
        else setGrouplist([group])
    }

    const _getGroupAndRankOfNewCourse = (groupIdx, rank) => {
        setNewCourseGroupIdx(groupIdx);
        setNewCourseRank(rank);
    }

    const _addCourse = (course) => {
        setGrouplist(grouplist.map((group,idx)=>{
            if(idx==newCourseGroupIdx){
                group.addCourse(newCourseRank,course);
                return group;
            }else return group;
        }))
        setNewCourseGroupIdx(-1);
        setNewCourseRank(-1);
    }

    const _deleteCourse = (groupIdx, rank, idx) => {
        setGrouplist(grouplist.map((group, g) =>{
            if(groupIdx == g){
                group.deleteCourse(rank, idx);
                return group
            }else return group
        }))
    }

    const _deleteGroup = (groupIdx) =>{
        setGrouplist(grouplist.filter((group,g)=> g!=groupIdx ))
    }

    return(
        <>
        <div id = "header">
            <h4>ETATA</h4>
        </div>
        <div id = "content">
            <div id="grouplist_groups">
                {grouplist && grouplist.map((group, g) =>{
                    return <GroupComponent
                        group = {group}
                        groupIdx = {g}
                        selectedGroup = {newCourseGroupIdx}
                        selectedRank = {newCourseRank}
                        _getGroupAndRankOfNewCourse = {_getGroupAndRankOfNewCourse}
                        _deleteCourse = {_deleteCourse}
                        _deleteGroup = {()=>{_deleteGroup(g)}}
                    />
                })}
                <AddGroup _addGroup = {_addGroup}/>
            </div>
            {newCourseGroupIdx!=-1 && newCourseRank !=-1 ?
                <ChooseCourse
                    _addCourse= {_addCourse}
                /> : null}
            <div className = "grouplist_finished">
                <Link to = '/'>
                    <button onClick={()=> {props._changeGroups(grouplist)}}>완료</button>
                </Link>
            </div>
        </div>
        </>
    );
}


export default Grouplist