import React, {useState, useEffect} from 'react'
import {Group} from '../../domain/group'
import { Timetable } from '../../domain/timetable';

import {Timetables} from './timetable'
import AddConditions from './addCondition'
import ConditionList from './conditionList'

const FindTimetable = ({grouplist, _seeDetails}) => {
    const [conditions, setConditions] = useState([
        "A교시 1개 이하",
        "C교시 3개 이하",
        "D교시 3개 이하",
        "금요일 공강",
        "3 연강 0개 이하",
        "4 공강 0개 이하",
        "운영체제 F032 선택"
    ]);

    const [filteredTimetables, setFilteredTimetables] = useState();
    const [allTimetables, setAllTimetables] = useState();

    useEffect(()=>{
        setAllTimetables(__getAllPossibleTimetables(grouplist));
    }, [grouplist])

    useEffect(()=>{
        setFilteredTimetables(allTimetables)
        console.log("useEffect called")
    }, [allTimetables])

    const __getAllPossibleTimetables = (grouplist) => {
        let testTimetable = new Timetable();
        let timetables = new Array()

        const __cloneObject = (obj) =>{
            return JSON.parse(JSON.stringify(obj));
        }

        const __getTimetables = (gIdx) =>{
            if(grouplist==null) return;
            if(gIdx == grouplist.length){
                timetables.push(__cloneObject(testTimetable));
                return;
            }
            else{
                for(let rank = 0; rank < 3; rank ++){
                    const rankCourses = grouplist[gIdx].courses[rank]
                    for(let idx = 0; idx< rankCourses.length; idx++){
                        const course = rankCourses[idx]
                        if(testTimetable._canAddCourse(course)){
                            testTimetable._addCourse(course)
                            __getTimetables(gIdx+1);
                            testTimetable._removeCourse(course);
                        }
                    }
                }
            }
        }
        __getTimetables(0);
        return timetables
    }

    const _filter = () =>{
        console.log("filtering")
    }

    return(
        <>
            <div id= "showResults">
                <Timetables timetables = {allTimetables} _seeDetails = {_seeDetails}/>
            </div>
            <ConditionList
                conditions = {conditions}
                _filter = {_filter}    
            />
            <AddConditions grouplist = {grouplist}/>
        </>
    )
}

export default FindTimetable;