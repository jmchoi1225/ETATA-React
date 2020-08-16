import React from 'react'



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

export default ConditionList