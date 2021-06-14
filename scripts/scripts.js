'use strict'

console.log("Hello");

// let module = {
//     name: "Databases",
//     moduleCode: "COMP1121",
//     numofAssessments: 4,
//     assessments: {
//         coursework_1: 100,
//         coursework_2: 40,
//         coursework_3: 40,
//         coursework_4: 100,
//     },
//     average: 0,
//     numOfCredits: 10,

//     //methods

//     //returns a string representation of the fields in the object
//     toString: function(){
//         console.log(`Databases ${this.moduleCode} is worth ${this.numOfCredits} credits and has ${this.calcNumOfAssessments()} asssessments`);
//     },

//     //adds a new assessment to the module
//     addAssessment: function(name, grade){
//         this.assessments[name] = grade;
//         this.numofAssessments++;
//     },

//     //calulates the number of assessments in the module
//     calcNumOfAssessments: function(){
//         let keys = Object.keys(this.assessments);
//         this.numofAssessments = keys.length;
//         return keys.length;
//     },

//     //calculates teh average score for the module
//     calcAverage: function(){
//         let keys = Object.keys(this.assessments);
//         let length = keys.length
//         let sum = 0;
//         for(let i = 0; i < keys.length; i++){
//             sum += this.assessments[keys[i]];   
//         }
    
//         let average = sum / length;
//         this.average = average;
//         return average;
//     },

//     //provides feedback for the module
//     feedback: function(){
//         let output;
//         let average = this.calcAverage();
//         if(average >= 70){
//             console.log(`Your score is ${average} and you currently have a first`);
//         } else if(average >= 60 && average < 70){
//             console.log(`Your score is ${average} and you currently have a 2.1`);
//         }else if(average >= 50 && average < 60){
//             console.log(`Your score is ${average} and you currently have a 2.2`);
//         }else if(average >= 40 && average < 50){
//             console.log(`Your score is ${average} and you and currently have a third`);
//         } else {
//             console.log(`Your score is ${average} and you have not passed yet`);
//         }
//     }
// }

//Object constructor
//Allows you to create multiple instances of the same object
function modules2(name, moduleCode, numofAssessments, average, credits){
    this.name = name;
    this.moduleCode = moduleCode;
    this.numOfAssessments = numofAssessments;
    this.average = average;
    this.credits = credits;
    this.assessments = {};
    

    //methods

    //returns a string representation of the fields in the object
    this.toString = function(){
        console.log(`Databases ${this.moduleCode} is worth ${this.credits} credits and has ${this.calcNumOfAssessments()} asssessments`);
    };

    //adds a new assessment to the module
    this.addAssessment =  function(name, grade){
        this.assessments[name] = grade;
        this.numofAssessments++;
    };

    //calulates the number of assessments in the module
    this.calcNumOfAssessments = function(){
        let keys = Object.keys(this.assessments);
        this.numofAssessments = keys.length;
        return keys.length;
    };

    //calculates teh average score for the module
    this.calcAverage = function(){
        let keys = Object.keys(this.assessments);
        let length = keys.length
        let sum = 0;
        for(let i = 0; i < keys.length; i++){
            sum += this.assessments[keys[i]];   
        }
    
        let average = sum / length;
        this.average = average;
        return average;
    };

    //provides feedback for the module
    this.feedback = function(){
        let output;
        let average = this.calcAverage();
        if(average >= 70){
            console.log(`Your score is ${average} and you currently have a first`);
        } else if(average >= 60 && average < 70){
            console.log(`Your score is ${average} and you currently have a 2.1`);
        }else if(average >= 50 && average < 60){
            console.log(`Your score is ${average} and you currently have a 2.2`);
        }else if(average >= 40 && average < 50){
            console.log(`Your score is ${average} and you and currently have a third`);
        } else {
            console.log(`Your score is ${average} and you have not passed yet`);
        }
    }

}

class assessment{
    constructor(name, yourScore, totalMarks, worth){
        this.name = name;
        this.score = yourScore;
        this.totalMarks = totalMarks;
        this.percent = this.calcPercentage(yourScore, totalMarks);
        this.worth = `${worth}%`;
        this.grade = this.calcGrade(this.percent);
    }

    calcPercentage(yourScore, totalMarks){
        let percent = ((yourScore / totalMarks) * 100);
        percent = Number(percent.toFixed(1));
        return percent;
    }

    calcGrade(percent){
        if(percent >= 70){
            return "1st";
        } else if(percent >= 60 && percent < 70){
            return "2.1";
        }else if(percent >= 50 && percent < 60){
            return "2.2";
        }else if(percent >= 40 && percent < 50){
            return "3rd";
        } else {
            return "Did not pass";
        }
    }
}


class modules{
    // this.name = name;
    // this.moduleCode = moduleCode;
    // this.numOfAssessments = numofAssessments;
    // this.average = average;
    // this.credits = credits;
    // this.assessments = {};

    constructor(name, moduleCode, numofAssessments, credits){
        this.name = name;
        this.moduleCode = moduleCode;
        this.numOfAssessments = numofAssessments;
        this.average;
        this.credits = credits;
        // an assessment object containing other objects;
        this.assessments = {};
    };
    
    //methods

    //returns a string representation of the fields in the object
    details(){
        console.log(`Databases ${this.moduleCode} is worth ${this.credits} credits and has ${this.numOfAssessments} assessments.
You have done already done ${this.calcNumOfAssessments()} asssessment(s).`);
    };

    //adds a new assessment to the module

    addAssessment(name, yourScore, totalMarks, worth){
        this.assessments[name] = new assessment(name, yourScore, totalMarks, worth);
    }

    //calulates the number of assessments in the module
    calcNumOfAssessments(){
        let keys = Object.keys(this.assessments);
        this.numofAssessments = keys.length;
        return keys.length;
    };

    //calculates teh average score for the module
    calcAverage(){
        let keys = Object.keys(this.assessments);
        let length = keys.length
        let sum = 0;
        for(let i = 0; i < keys.length; i++){
            sum += this.assessments[keys[i]];   
        }
    
        let average = sum / length;
        this.average = average;
        return average;
    };

    //provides feedback for the module
    feedback(){
        let output;
        let average = this.calcAverage();
        if(average >= 70){
            console.log(`Your score is ${average} and you currently have a first`);
        } else if(average >= 60 && average < 70){
            console.log(`Your score is ${average} and you currently have a 2.1`);
        }else if(average >= 50 && average < 60){
            console.log(`Your score is ${average} and you currently have a 2.2`);
        }else if(average >= 40 && average < 50){
            console.log(`Your score is ${average} and you and currently have a third`);
        } else {
            console.log(`Your score is ${average} and you have not passed yet`);
        }
    }

}









// Tests

let databases = new modules("Databases", "COMP1121", 4, 10);

console.log(databases.name);
console.log(databases.assessments);




databases.addAssessment("coursework_1", 37, 40, 30);
databases.addAssessment("coursework_2", 29, 30, 30);
databases.addAssessment("coursework_3", 20, 30, 30);
console.log(databases.assessments);
console.log(databases.credits);
console.log(databases.assessments.coursework_3.score);

databases.details();

// console.log(module.toString());
// module.calcAverage();
// console.log(module.calcAverage())
// module.feedback();

// module.toString();

// module.addAssessment("coursework_5", 70);
// module.toString();
// module.feedback();