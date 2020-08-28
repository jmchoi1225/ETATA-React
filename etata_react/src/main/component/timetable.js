import React from 'react';
import { useDrag } from 'react-dnd'

const Timetable = ({timetable, _seeDetails}) => {
    const weekdays = ['월', '화', '수', '목', '금']
    const periods = ['A', 'B', 'C', 'D', 'E', 'F']
    const color = ['red', 'orange', 'yellow', 'green', 'blue', 'dark-blue', 'violet']
    
    const [{isDragging}, drag] = useDrag({
        item:{
            type: 'timetable',
            timetable : timetable
        },
        collect: (monitor)=>({
            isDragging:!!monitor.isDragging(),
        }),
    })
    
    if(!timetable) return null;
    else{
        const table = timetable.timetable;
        const courses = timetable.courses;
        return(
            <table className= "timetable" ref = {drag}>
                <tbody>
                    {periods.map( (period, pIdx) =>{
                        return(
                            <tr>
                                {weekdays.map((weekday, wIdx) =>{
                                    let style = null;
                                    if(table[wIdx][pIdx]!=null){
                                        style = {'background-color' : color[
                                            (courses.map((course) => {
                                                return course.id
                                            })).indexOf(table[wIdx][pIdx].id)]
                                        }
                                    }
                                    return <td style = {style} onClick = {()=>{_seeDetails(timetable)}}></td>
                                })} 
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

}

const Timetables = ({timetables, _seeDetails}) => {
    if(!timetables) return null;
    else{
        return(
            <div className = "horizontalScroll">
                {timetables.map((timetable)=>{
                    return (
                        <Timetable timetable = {timetable} _seeDetails = {_seeDetails}/>
                    )
                })}
            </div>
        )
    }

      
}

export {Timetable, Timetables};