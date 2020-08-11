import React, {useState} from 'react'
import {Group} from '../../domain/group'
import {Timetables} from './timetable'
import { Timetable } from '../../domain/timetable';

const Condition = ({condition}) => {
    return(
        <>
        <input type="checkbox" name = "conditions" value = {condition}/> {condition}<br/>
        </>
    )
}

const ConditionList = ({conditions, _filter}) => {
    return(
        <div id= "conditionList">
            <form action = ''>
                <div id= "conditions">
                {conditions.map ((condition, idx)=>{
                    return <Condition condition = {condition} key = {idx}/>;
                })}
                </div>
                <input type="submit" value="Delete"/>
            </form>
            <button onClick = {_filter}>Filter</button>
        </div>
    ) 
}

const Input = ({input}) => {
    switch(input.type){
        case 'list':
            return(
                <>
                    <input list= {input.name} name= {input.name} style = {input.style}/>
                    <datalist id= {input.name}>
                        {input.option && input.options.map(option =>{
                            return (
                                <option value = {option}></option>
                            )
                        })}
                    </datalist>
                </>
            )
        case 'checkbox':
            return(
                <div class="checkboxes">
                    {input.option && input.options.map(option=>{
                        return (
                            <>
                            <input type="checkbox" name = {input.name} value = {option}/> {option}<br/>
                            </>
                        )
                    })}
                </div>
            )
        case 'number':
            return(
                <>
                    <input type="number" min={input.min} max={input.max} name = {input.name}/> {input.description}
                </>
            )
    }
}

const AddCondition = ({addCondition}) => {
    return(
        <form action = {addCondition.action}>
            <span>{addCondition.name}: </span>
            {addCondition.inputs.map((input, idx)=>{
                return <Input input = {input} key = {idx}/>
            })}
            <input type="submit" value="추가"/>
        </form>
    )
}

const AddConditions = ({addConditions}) => {
    return(
        <div id= "addCondition">
            {addConditions.map((addCondition, idx) =>{
                return <AddCondition addCondition = {addCondition} key = {idx}/>
            })}            
        </div>
    )
}

const FindTimetable = (props) => {
    const [conditions, setConditions] = useState([
        "A교시 1개 이하",
        "C교시 3개 이하",
        "D교시 3개 이하",
        "금요일 공강",
        "3 연강 0개 이하",
        "4 공강 0개 이하",
        "운영체제 F032 선택"
    ]);
                
    const addConditions = [
        {
            name : '특정 교시',
            action : '',
            inputs : [
                {
                    name : 'period',
                    type : 'list',
                    options : [
                        'A 교시',
                        'B 교시',
                        'C 교시',
                        'D 교시',
                        'E 교시',
                        'F 교시'
                    ]
                },
                {
                    name : 'num',
                    type : 'number',
                    min : 0,
                    max : 10
                },
                {
                    name : 'inequality',
                    type : 'list',
                    options : [
                        '이상',
                        '이하'
                    ]

                }
            ]
        },
        {
            name : '특정 수업',
            action : '',
            inputs : [
                {
                    name : 'course',
                    type : 'list',
                    options : props.groups && props.groups.map(group =>{
                        return [0,1,2].map(r =>{
                            return group.courses[r].map(course =>{
                                let str = course.id;
                                str = str.concat('(', group.name , ')');
                                return str
                            })
                        })
                    }),
                    style : {
                        width : '150px'
                    }
                },
                {
                    name : 'choose',
                    type : 'list',
                    options : [
                        '선택',
                        '비선택'
                    ]

                }
            ]
        },
        {
            name : '공강',
            action : '',
            inputs : [
                {
                    name : 'weekday',
                    type : 'list',
                    options : [
                        '월',
                        '화',
                        '수',
                        '목',
                        '금',
                    ]
                },
            ]
        },
        {
            name : '연강',
            action : '',
            inputs : [
                {
                    name : 'length',
                    type : 'number',
                    min : 0,
                    max : 6,
                    description : "연강"
                },
                {
                    name : 'num',
                    type : 'number',
                    min : 0,
                    max : 5,
                    description : "개"
                },
                {
                    name : 'inequality',
                    type : 'list',
                    options : [
                        '이상',
                        '이하'
                    ]

                }
            ]
        },
        {
            name : '우주공강',
            action : '',
            inputs : [
                {
                    name : 'length',
                    type : 'number',
                    min : 0,
                    max : 6,
                    description : "공강"
                },
                {
                    name : 'num',
                    type : 'number',
                    min : 0,
                    max : 5,
                    description : "개"
                },
                {
                    name : 'inequality',
                    type : 'list',
                    options : [
                        '이상',
                        '이하'
                    ]

                }
            ]
        },
    ]

    const __getAllPossibleTimetables = () => {
        let testTimetable = new Timetable();
        let timetables = new Array()

        const cloneObject = (obj) =>{
            return JSON.parse(JSON.stringify(obj));
        }

        const __getTimetables = (gIdx) =>{
            if(props.groups==null) return;
            if(gIdx == props.groups.length){
                timetables.push(cloneObject(testTimetable));
                return;
            }
            else{
                for(let rank = 0; rank < 3; rank ++){
                    const rankCourses = props.groups[gIdx].courses[rank]
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

    let timetables = [];
    timetables = __getAllPossibleTimetables();

    const _filter = () =>{
        console.log("filtering")
    }
    return(
        <>
            <div id= "showResults">
                <Timetables timetables = {timetables} _seeDetails = {props._seeDetails}/>
            </div>
            <ConditionList
                conditions = {conditions}
                _filter = {_filter}    
            />
            <AddConditions addConditions = {addConditions}/>
        </>
    )
}

export default FindTimetable;