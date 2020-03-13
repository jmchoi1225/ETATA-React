import React, {Component} from 'react';

class Timetable extends Component{
    render(){
        const weekdays = ['월', '화', '수', '목', '금']
        const periods = ['A', 'B', 'C', 'D', 'E', 'F']
        return(
            <table className= "timetable">
                <tbody>
                    {periods.map( period =>{
                        return(
                            <tr>
                                {weekdays.map(weekday =>{
                                    return(
                                        <td></td>
                                    )
                                })} 
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}
class Timetables extends Component{
    render(){
        const timetables = [1,2,3,4,5,6,7];
        return(
            <div className = "horizontalScroll">
                {timetables.map(()=>{
                    return (
                        <Timetable/>
                    )
                })}
            </div>
        )
    }
      
}

class BigTimetable extends Component{
    render(){
        const weekdays = ['월', '화', '수', '목', '금']
        const periods = ['A', 'B', 'C', 'D', 'E', 'F']
        return(
            <div id="showTimetable">   
                <table class="bigTimetable">   
                    <tr>
                        <th></th>
                        {weekdays.map(weekday =>{
                            return <th>{weekday}</th>
                        })}             
                    </tr>
                    {periods.map(period=>{
                        return(
                            <tr>
                                <th>{period}</th>
                                {weekdays.map(weekday =>{
                                    return <td></td>
                                })}
                            </tr>
                        )
                    })}
                </table>
            </div>
        )
    }
}

export {Timetable, Timetables, BigTimetable};