import {Timetable} from './timetable'

class RegistrationHelper extends Timetable{
    constructor(){
        super();
        for(let i = 0; i<this.weekdays.length; i++){
            for(let j = 0; j<this.times.length; j++){
                this.timetable[i][j] = new Array();
            }
        }
    }

    _getSameTime(grouplist){ // checkOverlap of total data version
        console.log("Registration Helper: ", grouplist)
        const sameTime = new Array(grouplist.length);
        for(let g=0; g<grouplist.length; g++){
            sameTime[g] = new Array(3);
            for(let rank = 0; rank<3; rank++){
                sameTime[g][rank] = new Array(grouplist[g].crsLength[rank]);
                for(let crs = 0; crs < grouplist[g].crsLength[rank]; crs++){
                    sameTime[g][rank][crs] = new Array();
                }
            }
        }
        for(let g = 0; g<grouplist.length; g++){//for each group
            for(let rank = 0; rank<3; rank++){//for each rank
                for(let crs = 0; crs< grouplist[g].courses[rank].length; crs++){ // for each course
                    const curCourse = grouplist[g].getCourse(rank,crs);
                    const arrLecTime = this.__str2arrLecTime(curCourse.lectureTime);
                    const result = this.__checkOverlap(arrLecTime); // overlap courses crsIdx
                    for(let o = 0; o<result.length; o++){
                        const oCrsIdx = result[o];
                        const oCrs = grouplist[oCrsIdx['group']].getCourse(oCrsIdx['rank'],oCrsIdx['idx']);
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

export default RegistrationHelper