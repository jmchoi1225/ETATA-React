class Course{
    constructor(id, lecTime){
        this.id = id;
        this.lecTime = lecTime;
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
}

export {Group, Course};