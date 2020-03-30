import React, {useState}from 'react'
import {Group} from '../../class/group'

const AddGroups = (props) => {
    const [groupName, setGroupName] = useState('');

return(
    <>
    <input type = 'text' onChange = {(e) => setGroupName(e.target.value)}/>
    <button onClick = {() =>{if(groupName !='') props._addGroup(new Group(groupName))}}>추가</button>
    </>
)}

export default AddGroups