class Course{
    constructor(id, name,prof, lecTime){
        this.id = id;
        this.name = name;
        this.professor = prof; 
        this.lectureTime = lecTime;
    }
}

class Group{
    constructor (name, firstIdx = null, courses = null){
        this.name = name;
        this.firstIdx = firstIdx;
        this.courses = new Array(3);
        for(let i =0; i<3; i++){
            this.courses[i] = new Array();
        }
        this.crsLength = [0,0,0];
    }
    getCourse(rank, idx){
        return this.courses[rank][idx];
    }
    addCourse(rank, course){
        this.courses[rank].push(course);
        this.crsLength[rank]++;
    }
    deleteCourse(rank, idx){
        console.log(this.crsLength[rank], idx)
        if(this.crsLength[rank]<=idx){
            console.log("the course is not available")
        }
        else{
            this.courses[rank].splice(idx,1)
            console.log("courses : ", this.courses[rank])
            this.crsLength[rank]--;   
        }
    }
}

export {Group, Course};