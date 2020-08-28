import React from 'react'
import {useDrop} from 'react-dnd'

import {Timetables} from './timetable';

const SelectedTimetables = ({timetables, _seeDetails, _addToSelectedTimetables})=>{
    const [, drop] = useDrop({
        accept: "timetable",
        drop: (item) =>{_addToSelectedTimetables(item.timetable)},
    })
    return(
        <div ref = {drop} className= "selectedTimetables">
            <Timetables timetables = {timetables} _seeDetails = {_seeDetails}/>
        </div>
    )
}

export default SelectedTimetables