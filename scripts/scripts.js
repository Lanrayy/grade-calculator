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
        if(yourScore > totalMarks){
            throw new Error("Your score is greater than the total marks");
        }

        if(yourScore < 0){
            throw new Error("Invalid input. Score is less than zero");
        }
        
        if(totalMarks < 0){
            throw new Error("Invalid input. Total Marks is less than zero");
        }

        this.name = name;
        this.score = yourScore;
        this.totalMarks = totalMarks;
        this.percent = this.calcPercentage(yourScore, totalMarks);
        this.worth = worth;
        this.grade = this.calcGrade(this.percent);
    }

    calcPercentage(yourScore, totalMarks){
        let percent = ((yourScore / totalMarks) * 100);
        percent = Number(percent.toFixed(2));
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

    constructor(name, moduleCode, numofAssessments, credits){
        this.name = name;
        this.moduleCode = moduleCode;
        this.numOfAssessments = numofAssessments;
        this.average = this.calcWeightedAverage;
        this.credits = credits;
        // an object containing assessment objects;
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
        try{
            this.assessments[name] = new assessment(name, yourScore, totalMarks, worth);
        }
        catch(e){
            console.log(`Error: ${e.message}!`);
        }
        
    }

    //calulates the number of assessments in the module
    calcNumOfAssessments(){
        let keys = Object.keys(this.assessments);
        this.numofAssessments = keys.length;
        return keys.length;
    };

    //calculates the average score for the module
    calcAverage(){
        let keys = Object.keys(this.assessments);
        console.log(`Length is ${length}`);
        let sum = 0;
        for(let i = 0; i < keys.length; i++){
            sum += this.assessments[`coursework_${i+1}`].percent;   
        }
        console.log(`Sum is ${sum}`);
    
        let average = sum / length;
        average = Number(average.toFixed(2));
        this.average = average;
        return average;
    };

    //this method calculates the weighted average for the module.
    calcWeightedAverage(){
        let keys = Object.keys(this.assessments);

        let weightedAverage = 0;
        for(let i = 0; i < keys.length; i++){
            let grade = this.assessments[`coursework_${i+1}`].percent;
            
            let worth = this.assessments[`coursework_${i+1}`].worth;
            worth /= 100;

            weightedAverage += (grade * worth);
        }
        weightedAverage = weightedAverage.toFixed(2);
        return weightedAverage;

    }




    //returns the average grade for the module
    static calcGrade(num){
        if(num >= 70){
            //console.log(`Your score is ${num} and you currently have a first`);
            return " a first, ";
        } else if(num >= 60 && num < 70){
            //console.log(`Your score is ${num} and you currently have a 2.1`);
            return " a 2.1, ";
        }else if(num >= 50 && num < 60){
            //console.log(`Your score is ${num} and you currently have a 2.2`);
            return " a 2.2, ";
        }else if(num >= 40 && num < 50){
            //console.log(`Your score is ${num} and you and currently have a Pass`);
            return " a pass, ";
        } else {
            //console.log(`Your score is ${num} and you have not passed yet`);
            return " ";
        }
    }


    //this function lets the user know what marks the user has to get for each grade in the module.
    //this method caluculates what the user needs to get for the final assessement for each grade.
    getProjections(num){
        let marksForAFirst = (140 - num).toFixed(2);
        
        if(marksForAFirst <= 0){
            console.log("You have already achieved a first");
        }else{
            console.log(`You need to get at least ${marksForAFirst}%,${modules.calcGrade(marksForAFirst)}in the final assessment in order to get a first`);
        }

        let marksForATwoOne = (120 - num).toFixed(2);
        if(marksForATwoOne <= 0){
            console.log("You have already achieved a 2.1");
        }else{
            console.log(`You need to get at least ${marksForATwoOne}%,${modules.calcGrade(marksForATwoOne)}in the final assessment in order to get a 2.1`);
        }

        let marksForATwoTwo = (100 - num).toFixed(2);
        if(marksForATwoTwo <= 0){
            console.log("You have already achieved a 2.2");
        }
        else{
            console.log(`You need to get at least ${marksForATwoTwo}%,${modules.calcGrade(marksForATwoTwo)}in the final assessment in order to get a 2.2`);
        }
        
        let marksForAPass = (80 - num).toFixed(2);
        if(marksForAPass <= 0){
            console.log("You have already passed");
        }
        else{
            console.log(`You need to get at least ${marksForAPass}%,${modules.calcGrade(marksForAPass)}in the final assessment in order to get a Pass`);
        }
    }


    getWeightedProjections(num){
        // Calculate the percentage of the final assessement
        let keys = Object.keys(this.assessments);
        for(let i = 0; i < keys.length; i++){

        }

        let marksForAFirst = (70 - num) / (this.w);

        
        if(marksForAFirst <= 0){
            console.log("You have already achieved a first");
        }else{
            console.log(`You need to get at least ${marksForAFirst}%,${modules.calcGrade(marksForAFirst)}in the final assessment in order to get a first`);
        }

        let marksForATwoOne = (120 - num).toFixed(2);
        if(marksForATwoOne <= 0){
            console.log("You have already achieved a 2.1");
        }else{
            console.log(`You need to get at least ${marksForATwoOne}%,${modules.calcGrade(marksForATwoOne)}in the final assessment in order to get a 2.1`);
        }

        let marksForATwoTwo = (100 - num).toFixed(2);
        if(marksForATwoTwo <= 0){
            console.log("You have already achieved a 2.2");
        }
        else{
            console.log(`You need to get at least ${marksForATwoTwo}%,${modules.calcGrade(marksForATwoTwo)}in the final assessment in order to get a 2.2`);
        }
        
        let marksForAPass = (80 - num).toFixed(2);
        if(marksForAPass <= 0){
            console.log("You have already passed");
        }
        else{
            console.log(`You need to get at least ${marksForAPass}%,${modules.calcGrade(marksForAPass)}in the final assessment in order to get a Pass`);
        }
    }

    //this method will provide complete feedback to the user about the module.
    feedback(){
        //if there are no assessments left.
        //Log the user's final grade for the module.
        if(this.numOfAssessments - this.calcNumOfAssessments() == 0){
            console.log("No assessments left");

            if(this.average >= 70){
                console.log(`Your final mark is ${(Math.trunc(this.average))}% and your final grade is a first`);
            } else if(this.average >= 60 && this.average < 70){
                console.log(`Your final mark is ${(Math.trunc(this.average))}% and your final grade is a 2.1`);
                
            }else if(this.average >= 50 && this.average < 60){
                console.log(`Your final mark is ${(Math.trunc(this.average))}% and your final grade is a 2.2`);
                
            }else if(this.average >= 40 && this.average < 50){
                console.log(`Your final mark is ${(Math.trunc(this.average))}% and your final grade is a Pass`);
            } else {
                console.log(`Your final mark is ${(Math.trunc(this.average))}% and you did not pass this module`);
            }

        }
        //if there is only one assessment left.
        else if(this.numOfAssessments - this.calcNumOfAssessments() == 1){
            console.log("One assessment left");
            //calculate average

            //if average is first, tell user that they have already achieved a first.
            if(this.average >= 70)
            {
                console.log(`Your mark is ${this.average}% and you currently have a first.`);
                this.getProjections(this.average);
            } 
            // if they have a 2.1 tell them how much they need to get a first on the last assessement
            else if(this.average >= 60 && this.average < 70)
            {
                console.log(`Your mark is ${(this.average)}% and you currently have a 2.1.`);
                this.getProjections(this.average);
            }else if(this.average >= 50 && this.average < 60){
                console.log(`Your mark is ${this.average}% and you currently have a 2.2.`);
                this.getProjections(this.average);
            }else if(this.average >= 40 && this.average < 50){
                console.log(`Your mark is ${average}% and you and currently have a third.`);
                this.getProjections(this.average);
            } else {
                console.log(`Your mark is ${this.average}% and you have not passed yet.`);
                this.getProjections(this.average);
            }
        }
    }

}

// Tests
let databases = new modules("Databases", "COMP1121", 3, 10);

// console.log(databases.name);
// console.log(databases.assessments);

//Programming for the web
databases.addAssessment("coursework_1", 30, 30, 30);
databases.addAssessment("coursework_2", 30, 30, 30);
// databases.addAssessment("coursework_3", 39, 40, 40);

//Professional computing
// databases.addAssessment("coursework_1", 38, 40, 20);
// databases.addAssessment("coursework_2", 70, 100, 20);
// databases.addAssessment("coursework_3", 78.3, 100, 60);



// console.log(databases.assessments);
// console.log(databases.credits);
// console.log(databases.assessments.coursework_3.score);
console.log("****Normal Average****");
console.log(databases.calcAverage());
console.log(databases.average);
console.log("\n");

console.log("****Weigthed Average****");
console.log(databases.calcWeightedAverage);
console.log("\n");

console.log("****Feedback****");
databases.feedback();
console.log("\n");

// console.log("Details");
// databases.details();
// console.log("\n");
// databases.calcGrade();

// console.log(module.toString());
// module.calcAverage();
// console.log(module.calcAverage())
// module.feedback();

// module.toString();

// module.addAssessment("coursework_5", 70);
// module.toString();
// module.feedback();