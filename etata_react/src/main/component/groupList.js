import React from 'react';
import {Link} from "react-router-dom"
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
            <Link to = "/grouplist">
                <button>EDIT</button>
            </Link>
        </div>
    )
}

export default GroupList