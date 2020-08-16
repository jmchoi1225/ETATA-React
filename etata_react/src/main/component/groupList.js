import React from 'react';
import {Group} from '../../domain/group'

const GroupComponent = ({groupName}) =>{
    return(
        <div className = "groupItem">
            {groupName}
        </div>
    )
}

const GroupList = ({grouplist}) => {
    return(
        <div id= "groupList">
            <h5>Group List</h5>
            <hr/>
            {grouplist &&
            grouplist.map(group =>{
                return <GroupComponent groupName = {group.name}/>
            })}
            <button>수강신청 도우미</button>
        </div>
    )
}

export default GroupList