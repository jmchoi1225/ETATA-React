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

class ComplexTimetable extends Timetable{
    constructor(){
        super();
        for(let i = 0; i<this.weekdays.length; i++){
            for(let j = 0; j<this.times.length; j++){
                this.timetable[i][j] = new Array();
            }
        }
    }

    _getSameTime(groups){ // checkOverlap of total data version
        const sameTime = new Array(groups.length);
        for(let g=0; g<groups.length; g++){
            sameTime[g] = new Array(3);
            for(let rank = 0; rank<3; rank++){
                sameTime[g][rank] = new Array(groups[g].crsLength[rank]);
                for(let crs = 0; crs < groups[g].crsLength[rank]; crs++){
                    sameTime[g][rank][crs] = new Array();
                }
            }
        }
        for(let g = 0; g<groups.length; g++){//for each group
            for(let rank = 0; rank<3; rank++){//for each rank
                for(let crs = 0; crs< groups[g].courses[rank].length; crs++){ // for each course
                    const curCourse = groups[g].getCourse(rank,crs);
                    const arrLecTime = this.__str2arrLecTime(curCourse.lectureTime);
                    const result = this.__checkOverlap(arrLecTime); // overlap courses crsIdx
                    for(let o = 0; o<result.length; o++){
                        const oCrsIdx = result[o];
                        const oCrs = groups[oCrsIdx['group']].getCourse(oCrsIdx['rank'],oCrsIdx['idx']);
                        if(!sameTime[oCrsIdx['group']][oCrsIdx['rank']][oCrsIdx['idx']].includes({'group':g,'rank':rank,'idx': crs})){
                            sameTime[oCrsIdx['group']][oCrsIdx['rank']][oCrsIdx['idx']].push({'group':g,'rank':rank,'idx': crs});
                        }
                        if(!sameTime[g][rank][crs].includes(oCrsIdx)){
                            sameTime[g][rank][crs].push(oCrsIdx);
                        }
                    }
                    for(let t = 0; t<arrLecTime.length; t++){
                        this.timetable[arrLecTime[t]['week']][arrLecTime[t]['time']].push({'group':g,'rank':rank,'idx': crs});
                    }
                }
            }
        }
        return sameTime;
    }

    __checkOverlap(lectureTime){ //find overlap course
        let output = new Array();
        if(typeof lectureTime == "string"){
            lectureTime = this.__str2arrLecTime(lectureTime);
        }
        for(let t = 0; t<lectureTime.length; t++){
            const week = lectureTime[t]["week"];
            const time = lectureTime[t]["time"];
            for(let j  = 0; j<this.timetable[week][time].length; j++){//겹치는 강의를 output에 넣음
                if(!output.includes(this.timetable[week][time][j])){
                    output.push(this.timetable[week][time][j]);
                }
            }
        }
        return output;
    }
    
}

export {ComplexTimetable, Timetable}