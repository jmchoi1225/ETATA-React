import React from 'react';

const Course = ({color, course}) => {
    if(!course) return <td></td>
    else{
        const style = {'background-color' : color}
        return(
        <td style = {style}>
            {course.id}
            <br/>
            {course.name}
            <br/>
            {course.professor}
        </td>)
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
                                if(timetable == undefined) return <Course/>
                                const cur = timetable.timetable[wIdx][pIdx];
                                let c;
                                if(cur){
                                    c = color[
                                        (timetable.courses.map((course) => {
                                            return course.id
                                        })).indexOf(cur.id)]
                                }
                                return <Course course = {cur} color = {c}/>
                            })}
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default BigTimetable