import React from 'react'
import '../../class/group'
import {Timetables} from './timetable'

function Condition({condition}){
    return(
        <>
        <input type="checkbox" name = "conditions" value = {condition}/> {condition}<br/>
        </>
    )
}

function ConditionList({conditions, _filter}){
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

function Input({input}){
    switch(input.type){
        case 'list':
            return(
                <>
                    <input list= {input.name} name= {input.name}/>
                    <datalist id= {input.name}>
                        {input.options.map(option =>{
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
                    {input.options.map(option=>{
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
                <input type="number" min={input.min} max={input.max} name = {input.name}/>
            )
    }
}

function AddCondition({addCondition}){
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

function AddConditions({addConditions}){
    return(
        <div id= "addCondition">
            {addConditions.map((addCondition, idx) =>{
                return <AddCondition addCondition = {addCondition} key = {idx}/>
            })}            
        </div>
    )
}

export default class FindTimetable extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            conditions : [
                "A교시 1개 이하",
                "C교시 3개 이하",
                "D교시 3개 이하",
                "금요일 공강",
                "3 연강 0개 이하",
                "4 공강 0개 이하",
                "운영체제 F032 선택"
            ]
        }
        this.addConditions = [
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
                        name : 'group',
                        type : 'list',
                        options : [
                            'Algorithm',
                            'Domain'
                        ]

                    },
                    {
                        name : 'crsID',
                        type : 'checkbox',
                        options : [
                            'F032',
                            'F022'
                        ]
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
            }
        ]
    }
    _filter(){
        console.log("filtering")
    }
    render(){
        return(
            <>
                <div id= "showResults">
                    <Timetables/>
                </div>
                <ConditionList
                    conditions = {this.state.conditions}
                    _filter = {this._filter}    
                />
                <AddConditions addConditions = {this.addConditions}/>
            </>
        )
    }
}