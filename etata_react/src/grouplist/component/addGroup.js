import React, {useState}from 'react'
import {Group} from '../../domain/group'

const AddGroups = (props) => {
    const [groupName, setGroupName] = useState('');

return(
    <div className = "grouplist_group grouplist_newGroup">
        <div>
            <span>그룹 이름: </span>
            <input type = 'text' onChange = {(e) => setGroupName(e.target.value)}/>
        </div>
        <button onClick = {() =>{if(groupName !='') props._addGroup(new Group(groupName))}}>추가</button>
    </div>
)}

export default AddGroups