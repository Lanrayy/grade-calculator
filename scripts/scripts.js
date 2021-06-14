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


class modules{
    // this.name = name;
    // this.moduleCode = moduleCode;
    // this.numOfAssessments = numofAssessments;
    // this.average = average;
    // this.credits = credits;
    // this.assessments = {};

    constructor(name, moduleCode, numofAssessments credits){
        this.name = name;
        this.moduleCode = moduleCode;
        this.numOfAssessments = numofAssessments;
        this.average;
        this.credits = credits;
        this.assessments = {};
    };
    

    //methods

    //returns a string representation of the fields in the object
    toString (){
        console.log(`Databases ${this.moduleCode} is worth ${this.credits} credits and has ${this.calcNumOfAssessments()} asssessments`);
    };

    //adds a new assessment to the module
    addAssessment(name, grade){
        this.assessments[name] = grade;
        this.numofAssessments++;
    };

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












let databases = new modules("Databases", "COMP1121", 4, 0, 20);

console.log(databases.name)
console.log(databases.assessments);

databases.assessments["coursework_1"] = 0;
console.log(databases.assessments);
console.log(databases.credits)

databases.toString();

// console.log(module.toString());
// module.calcAverage();
// console.log(module.calcAverage())
// module.feedback();

// module.toString();

// module.addAssessment("coursework_5", 70);
// module.toString();
// module.feedback();