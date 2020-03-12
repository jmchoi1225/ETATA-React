import React, {Component} from 'react';
import GroupsClass from '../../class/group';

const copyToClipboard = str => {
    const el = document.createElement('textarea');  // Create a <textarea> element
    el.value = str;                                 // Set its value to the string that you want copied
    el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
    el.style.position = 'absolute';                 
    el.style.left = '-9999px';                      // Move outside the screen to make it invisible
    document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
    const selected =            
      document.getSelection().rangeCount > 0        // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0)     // Store selection if found
        : false;                                    // Mark as false to know no selection existed before
    el.select();                                    // Select the <textarea> content
    document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el);                  // Remove the <textarea> element
    if (selected) {                                 // If a selection existed before copying
      document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
      document.getSelection().addRange(selected);   // Restore the original selection
    }
};

class Course extends Component{
    render(){
        const course = this.props.course;
        let btnClass = 'course';
        if(this.props.status == "default"){
            if(this.props.picked){
                btnClass += " picked"
            }else if(this.props.overlap > 0){
                btnClass += " overlap"
            }else{
                btnClass += " default"
            }
        }
        else btnClass += ' ' + this.props.status;
        return(
            <button className = {btnClass} onClick = {() =>this.props._selected(this.props.index, course.id)}>{course.id}</button>
        )
    }
}

export default class Group extends Component{

    /*state = {
        curCourse : {"rank" : rank , "idx" : idx}
        courseStatus : 2D matrix [rank][idx] = "default" || "success" || "fail"
        overlapCount : 2D matrix [rank][idx] = # of courses successful that is overlapping with the course
    }*/
    
    constructor(props){
        super(props);
        this.state = {
            finished : false,
            courseStatus : this._initiateCourseStatus(),
        }
        this._selected = this._selected.bind(this);
        this._success = this._success.bind(this);
        this._fail = this._fail.bind(this);
        console.log(this.props.overlapCount);
    }
    
    _initiateCourseStatus(){
        const group = this.props.group;
        const courseStatus = new Array(3);
        for(let rank = 0; rank <3; rank++){
            courseStatus[rank] = new Array(group.crsLength[rank]).fill('default');
        }
        return courseStatus;
    }

    _selected(newCurCourse, crsIdx){
        if(!this.state.finished){
            this.setState({curCourse : newCurCourse});
            copyToClipboard(crsIdx);
        }

    }

    _changeCourseStatus(rank, idx, status){
        this.setState(state => {
            const newCourseStatus = state.courseStatus.map((courses, r) =>{
                if(r == rank){
                    const newCourses = courses.map((curStatus,i) =>{
                        if(i == idx) return status;
                        else return curStatus;
                    })
                    return newCourses;
                }
                else return courses;
            });
            return {courseStatus : newCourseStatus};
        });
    }

    _success(){
        if(this.state.curCourse && !this.state.finished){
            this._changeCourseStatus(this.state.curCourse["rank"],this.state.curCourse["idx"], "success");
            this.setState({finished : true});
            this.props._processOverlap(this.props.index, this.state.curCourse);
        }
        
    }

    _fail(){
        if(this.state.curCourse && !this.state.finished){
            this._changeCourseStatus(this.state.curCourse["rank"],this.state.curCourse["idx"], "fail");
        }
    }

    render(){
        const group = this.props.group;
        const ranks = [0,1,2];
        return(
            <div className = "group">
                <div className = "first">
                    <div className = "groupContainer"> {group.name} </div>
                    <hr/>
                    <div className = "groupContainer">
                        {group.firstIdx ?
                            <Course
                                course = {group.getCourse(group.firstIdx["rank"], group.firstIdx["idx"])}
                                status = {this.state.courseStatus[group.firstIdx["rank"]][group.firstIdx["idx"]]}
                                overlap = {this.props.overlapCount[group.firstIdx["rank"]][group.firstIdx["idx"]]}
                                picked = {this.state.curCourse && group.firstIdx["rank"] == this.state.curCourse["rank"] && group.firstIdx["idx"]==this.state.curCourse["idx"]}
                                _selected = {this._selected}
                                index = {group.firstIdx}
                                key = {group.firstIdx}
                            /> 
                            :
                            <button/>
                        }
                    </div>
                    <div className = "groupContainer">
                        <button className = "success" onClick = {this._success}>성공</button>
                        <button className = "fail" onClick = {this._fail} >실패</button>
                    </div>
                </div>
                <div className = "courses">
                    {ranks.map(rank =>{
                        return(
                            <div className = "groupContainer">
                                {group.courses[rank].map((course, idx)=>{
                                    return <Course
                                        course = {course}
                                        status = {this.state.courseStatus[rank][idx]}
                                        overlap = {this.props.overlapCount[rank][idx]}
                                        picked = {this.state.curCourse && this.state.curCourse["rank"]==rank && this.state.curCourse["idx"] == idx}
                                        _selected = {this._selected}
                                        index = {{"rank": rank, "idx": idx}}
                                        key = {[rank,idx]}
                                    />
                                })}
                            </div>
                        )
                    })} 
                </div>
            </div>
        )
    }
}