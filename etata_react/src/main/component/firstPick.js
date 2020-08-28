import React from 'react'
import {useDrop} from 'react-dnd'

import {Timetable} from './timetable'

const FirstPick = ({timetable, _seeDetails, _changeFirstPick}) => {
    const [, drop] = useDrop({
        accept: "timetable",
        drop: (item) =>{_changeFirstPick(item.timetable)},
    })
    
    return(
        <div ref = {drop} className = "firstPick">
            <Timetable timetable = {timetable} _seeDetails = {_seeDetails}/>
        </div>
    )
}

export default FirstPick
