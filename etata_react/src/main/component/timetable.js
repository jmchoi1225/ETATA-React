import React from 'react';

const Timetable = ({timetable, _seeDetails}) => {
    const weekdays = ['월', '화', '수', '목', '금']
    const periods = ['A', 'B', 'C', 'D', 'E', 'F']
    const color = ['red', 'orange', 'yellow', 'green', 'blue', 'dark-blue', 'violet']
    if(!timetable) return null;
    else{
        const table = timetable.timetable;
        const courses = timetable.courses;
        return(
            <table className= "timetable">
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

const BigTimetable = ({timetable}) => {
    const weekdays = ['월', '화', '수', '목', '금']
    const periods = ['A', 'B', 'C', 'D', 'E', 'F']
    const color = ['red', 'orange', 'yellow', 'green', 'blue', 'dark-blue', 'violet']
    return(
        <div id="showTimetable">   
            <table class="bigTimetable">   
                <tr>
                    <th></th>
                    {weekdays.map(weekday =>{
                        return <th>{weekday}</th>
                    })}             
                </tr>
                {periods.map((period, pIdx)=>{
                    return(
                        <tr>
                            <th>{period}</th>
                            {weekdays.map((weekday, wIdx) =>{
                                if(timetable == undefined) return <td></td>
                                else{
                                    let style = null;
                                    if(timetable.timetable[wIdx][pIdx]!=null){
                                        style = {'background-color' : color[
                                            (timetable.courses.map((course) => {
                                                return course.id
                                            })).indexOf(timetable.timetable[wIdx][pIdx].id)]
                                        }
                                    }
                                    return <td style = {style}>{timetable.timetable[wIdx][pIdx] ? timetable.timetable[wIdx][pIdx].id : null}</td>
                                }
                            })}
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export {Timetable, Timetables, BigTimetable};