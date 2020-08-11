import React from 'react';
import {Group} from '../../domain/group'

const GroupComponent = ({groupName}) =>{
    return(
        <div className = "groupItem">
            {groupName}
        </div>
    )
}

const GroupList = ({groups}) => {
    return(
        <div id= "groupList">
            <h5>Group List</h5>
            <hr/>
            {groups &&
            groups.map(group =>{
                return <GroupComponent groupName = {group.name}/>
            })}
            <button>수강신청 도우미</button>
        </div>
    )
}

export default GroupList