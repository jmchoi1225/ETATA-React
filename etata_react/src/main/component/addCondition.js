import React from 'react'

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

const AddConditions = ({grouplist}) => {
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
                    options : grouplist && grouplist.map(group =>{
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

    return(
        <div id= "addCondition">
            {addConditions.map((addCondition, idx) =>{
                return <AddCondition addCondition = {addCondition} key = {idx}/>
            })}            
        </div>
    )
}

export default AddConditions