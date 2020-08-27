class Timetable{
    constructor(){
        this.weekdays = ['월', '화', '수', '목', '금'];
        this.times = ['A', 'B', 'C', 'D', 'E', 'F'];
        this.courses = new Array();
        this.timetable = new Array(this.weekdays.length);
        for(let i = 0; i<this.weekdays.length; i++){
            this.timetable[i] = new Array(this.times.length);
        }
    }

    __determineChar(c){
        if(this.weekdays.includes(c)) return {"type" : "weekdays", "idx" : this.weekdays.indexOf(c)};
        if(this.times.includes(c)) return {"type" : "times", "idx" : this.times.indexOf(c)};
        else return {"type" : false};
    }

    __str2arrLecTime(strLecTime){
        let week = -1; //초기화
        let time = -1; //초기화
        let output = new Array();
        for(let i =0; i<strLecTime.length; i++){//lectureTime의 string index
            const result = this.__determineChar(strLecTime[i])
            switch(result['type']){
                case "weekdays":
                    if(week == -1 && time == -1){//week와 time 지정되지 않음
                        week = result['idx'];// week 지정
                    }
                    else{//예외 처리
                        console.log(strLecTime+ " syntax is wrong");
                    }
                    break;
                case "times":
                    if(week != -1 && time == -1){//week은 지정됬고 time은 지정되지 않음
                        time = result['idx'];//time 지정 ->week와 time이 결정남
                        if(!output.includes({'week' : week, 'time' : time})){
                            output.push({'week' : week, 'time' : time});
                        }
                        week = -1; //초기화
                        time = -1; //초기화
                    }else{//예외 처리
                        console.log(strLecTime+ " syntax is wrong");
                    }
            }
        }
        return output;
    }

    _canAddCourse(course){
        const lectureTimes = this.__str2arrLecTime(course.lectureTime);
        let allowed = true;
        for(let i = 0; i<lectureTimes.length; i++){
            const lectureTime = lectureTimes[i]
            if(this.timetable[lectureTime["week"]][lectureTime["time"]] != undefined){
                allowed = false;
                break;
            }
        }
        return allowed
    }

    _addCourse(course){
        const lectureTimes = this.__str2arrLecTime(course.lectureTime);
        if(this._canAddCourse(course)){
            for(let i =0; i<lectureTimes.length; i++){
                const lectureTime = lectureTimes[i];
                this.timetable[lectureTime["week"]][lectureTime["time"]] = course;
            }
            this.courses.push(course);
            return true;
        }
        else return false;
    }

    _removeCourse(course){
        const lectureTimes = this.__str2arrLecTime(course.lectureTime);
        let allowed = false;
        for(let i =0; i<lectureTimes.length; i++){
            const lectureTime = lectureTimes[i];
            if(this.timetable[lectureTime["week"]][lectureTime["time"]] == course){
                allowed = true;
                this.timetable[lectureTime["week"]][lectureTime["time"]] = null;
            }
        }
        if(this.courses.indexOf(course)>-1) this.courses.splice(this.courses.indexOf(course),1);
        return allowed
    }

    _idxOfCrs = (course) =>{
        return this.courses.indexOf(course);
    }
}

export {Timetable}