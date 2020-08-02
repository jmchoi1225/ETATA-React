import React from 'react';
import '../../class/group'

const Group = ({groupName}) =>{
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
                return <Group groupName = {group.name}/>
            })}
            <button>수강신청 도우미</button>
        </div>
    )
}

export default GroupList