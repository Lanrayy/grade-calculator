'use strict'
console.log("Hello");

//Object constructor
//Allows you to create multiple instances of the same object
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
        this.average = this.calcAverage;
        this.credits = credits;
        // an object containing assessment objects;
        this.assessments = {};
    };
    
    //methods
    //returns a string representation of the fields in the object
    moduleDetails(){
        console.log(`Databases ${this.moduleCode} is worth ${this.credits} credits and has ${this.numOfAssessments} assessments.
You have done already done ${this.calcNumOfAssessments()} asssessment(s).`);
    };

    //this method adds a new assessment to the module
    addAssessment(name, yourScore, totalMarks, worth){
        let numOfCurrentAssessments = this.calcNumOfAssessments();

        if(this.numOfAssessments - numOfCurrentAssessments <= 0){
            console.log("You have already added the maximum number of assessments");
            return 0;
        }

        try{
            this.assessments[name] = new assessment(name, yourScore, totalMarks, worth);
        }
        catch(e){
            console.log(`Error: ${e.message}!`);
        }
    }

    //this method calulates the number of assessments already taken in the module
    calcNumOfAssessments(){
        let keys = Object.keys(this.assessments);
        this.numofAssessments = keys.length;
        return keys.length;
    };

    // this method calculates the weighted average for the module.
    calcWeightedAverage(){
        let currentNumOfAssessments = this.calcNumOfAssessments();

        let weightedAverage = 0;
        for(let i = 0; i < currentNumOfAssessments; i++){
            let grade = this.assessments[`coursework_${i+1}`].percent;
            
            let worth = this.assessments[`coursework_${i+1}`].worth;
            worth /= 100;

            weightedAverage += (grade * worth);
        }
        weightedAverage = Number(weightedAverage.toFixed(2));
        this.average = weightedAverage;

        return weightedAverage;

    }

    //this method calculates the grade that the user has gotten
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

    getWeightedProjections(num){
        //Calculate the percentage/worth of the final assessement
        let currentNumOfAssessments = this.calcNumOfAssessments();
        let sumOfTakenAssessements = 0;
        for(let i = 0; i < currentNumOfAssessments; i++){
            sumOfTakenAssessements += this.assessments[`coursework_${i+1}`].worth;
        }
        let worthOfFinalAssessment = 100 - sumOfTakenAssessements;

        //Calculate the marks need for a first using the weighted average
        //Show it to the user
        let marksForAFirst = ((70 - num)/ (worthOfFinalAssessment / 100)).toFixed(2);
        //if the marks needed for a first is less than zero, then the student has ahieved a first already regardless of the result of the final assessment. 
        if(marksForAFirst <= 0){
            console.log("You have already achieved a first");
        }else{
            console.log(`You need to get at least ${marksForAFirst}%,${modules.calcGrade(marksForAFirst)}in the final assessment in order to get a first`);
        }

        let marksForATwoOne = ((60 - num)/ (worthOfFinalAssessment / 100)).toFixed(2);
        if(marksForATwoOne <= 0){
            console.log("You have already achieved a 2.1");
        }else{
            console.log(`You need to get at least ${marksForATwoOne}%,${modules.calcGrade(marksForATwoOne)}in the final assessment in order to get a 2.1`);
        }

        let marksForATwoTwo = ((50 - num)/ (worthOfFinalAssessment / 100)).toFixed(2);
        if(marksForATwoTwo <= 0){
            console.log("You have already achieved a 2.2");
        }
        else{
            console.log(`You need to get at least ${marksForATwoTwo}%,${modules.calcGrade(marksForATwoTwo)}in the final assessment in order to get a 2.2`);
        }
        
        let marksForAPass = ((40 - num)/ (worthOfFinalAssessment / 100)).toFixed(2);
        if(marksForAPass <= 0){
            console.log("You have already passed");
        }
        else{
            if(marksForAPass > 100){
                console.log("Unfortunately, You cannot pass this module");
            }
            else{
                console.log(`You need to get at least ${marksForAPass}%,${modules.calcGrade(marksForAPass)}in the final assessment in order to get a Pass`);
            }
        }
    }

    //this method will provide complete/overall feedback to the user about the module.
    feedback(){
        //Before providing Feedback Calculate the average
        this.calcWeightedAverage();

        //if there are no assessments left.
        //Log the user's final grade for the module.
        if(this.numOfAssessments - this.calcNumOfAssessments() == 0)
        {
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
        else if(this.numOfAssessments - this.calcNumOfAssessments() == 1)
        {
            console.log("One assessment left");
            //calculate average
            //if average is first, tell user that they have already achieved a first.
            if(this.average >= 70)
            {
                console.log(`Your current mark is ${this.average}% and you currently have a first.`);
                this.getWeightedProjections(this.average);
            } 
            // if they have a 2.1 tell them how much they need to get a first on the last assessement.
            else if(this.average >= 60 && this.average < 70)
            {
                console.log(`Your current mark is ${(this.average)}% and you currently have a 2.1.`);
                this.getWeightedProjections(this.average);
            }else if(this.average >= 50 && this.average < 60){
                console.log(`Your current mark is ${this.average}% and you currently have a 2.2.`);
                this.getWeightedProjections(this.average);
            }else if(this.average >= 40 && this.average < 50){
                console.log(`Your current mark is ${this.average}% and you and currently have a third.`);
                this.getWeightedProjections(this.average);
            } else{
                console.log(`Your current mark is ${this.average}% and you have not passed yet.`);
                this.getWeightedProjections(this.average);
            }
        }
        else{
            console.log(`Your current mark is ${(this.average)}%.`);
            console.log("You need to add more assessements to get feedback");
        }
    }
}

// Tests
let databases = new modules("Databases", "COMP1121", 4, 10);

//Programming for the web
databases.addAssessment("coursework_1", 10, 10, 10);
databases.addAssessment("coursework_2", 29, 30, 20);
databases.addAssessment("coursework_3", 20, 30, 30);
// databases.addAssessment("coursework_4", 14, 16, 10);

console.log("****Feedback****");
databases.feedback();
console.log("\n");



//Additional methods
//this function sets the button to specific module
let setModuleName = function(node, nameofModule){
    node.firstChild.nextSibling.firstChild.nextSibling.textContent = nameofModule;
}

//this function sets the button to specific module
let setAddAssessmentButton = function(node, nameofModule){
    node.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.classList.add(`${nameofModule}-add-assessment-button`);
}

let setDeleteAssessmentButton = function(node, nameofModule){
    node.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.classList.add(`${nameofModule}-delete-assessment-button`);
}
let setModuleDetailsButton = function(node, nameofModule){
    node.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.classList.add(`${nameofModule}-module-details-button`);
}

let setModuleFeedbackButton = function(node, nameofModule){
    node.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.classList.add(`${nameofModule}-module-feedback-button`);
}

let setMinimizeButton = function(node, nameofModule){
    node.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.classList.add(`${nameofModule}-minimise-button`);
}

let setModuleDropdownClassName = function(node, nameofModule){
    node.firstChild.nextSibling.nextSibling.nextSibling.classList.add(`${nameofModule}-module-dropdown`);
}

//Main program
// console.log(document.getElementById("main").textContent);


let modulesContainer = document.querySelector(".modules-container");
let node = document.querySelector(".original-module");
console.log(node.firstChild.nextSibling.nextSibling.nextSibling);

//Add Module
let addModuleButton = document.querySelector(".add-module-button");
addModuleButton.addEventListener("click", function(){
    let popup = document.querySelector(".add-module-pop-up-container");
    popup.classList.remove("hide");

});

//Add Module Popup Cancel button
let popupCancelButton = document.querySelector("#popup-cancel-button");
popupCancelButton.addEventListener("click", function(){
    let popup = document.querySelector(".add-module-pop-up-container");
    popup.classList.add("hide");
})

//Add Module Popup Save button
let popupSaveButton = document.querySelector("#popup-save-button");
popupSaveButton.addEventListener("click", function(){
    //Get all the values for the new module
    let moduleName = document.querySelector("#module-name").value;
    console.log(typeof moduleName);

    //parse and stotre the name of module in new variable

    let moduleCode = document.querySelector("#module-code").value;
    console.log(typeof moduleCode);

    let numOfAssessments = document.querySelector("#num-of-assessments").value;
    console.log(typeof numOfAssessments);

    let credits = document.querySelector("#credits").value;
    console.log(typeof credits);

    //Create a new module

    let new_module = new modules(moduleName, moduleCode, numOfAssessments, credits);

    //Display that information in the new module in the HTML page


    //Close the popup
    let popup = document.querySelector(".add-module-pop-up-container");
    popup.classList.add("hide");

    //Add the new module to the list
    let copy = node.cloneNode(true);

    //Set the class names for buttons of the new module
    setModuleName(copy,moduleName);
    setAddAssessmentButton(copy,moduleName);
    setDeleteAssessmentButton(copy, moduleName);
    setModuleDetailsButton(copy, moduleName);
    setModuleFeedbackButton(copy, moduleName);
    setMinimizeButton(copy, moduleName);
    setModuleDropdown(copy, moduleName);

    let newElement = document.createElement("div");
    newElement.setAttribute("class", "module" );

    
    modulesContainer.appendChild(copy);
})



//Delete Module
let deleteModuleButton = document.querySelector(".delete-module-button");
deleteModuleButton.addEventListener("click", function(){
    // modulesContainer.style.backgroundColor = "red";
    let node_list = document.querySelectorAll(".module");
    let last =node_list[node_list.length -1];
    modulesContainer.removeChild(last);
});


//Add Assessement to module

let button = document.querySelector("click", function(){

});

let addAssessmentButton = document.querySelector(".add-assessment-button");
let modulesDropdown = document.querySelector(".module-dropdown");
addAssessmentButton.addEventListener("click", function(){
    console.log(this.classList);

    // modulesContainer.style.backgroundColor = "red";
    let newElement = document.createElement("div");
    let text = document.createTextNode("Coursework");
    newElement.appendChild(text);
    newElement.setAttribute("class", "assessment" );
    modulesDropdown.appendChild(newElement);
});

//Delete Assessment Button
let deleteAssessmentButton = document.querySelector(".delete-assessment-button");
deleteAssessmentButton.addEventListener("click", function(){
    // modulesContainer.style.backgroundColor = "red";
    let node_list = document.querySelectorAll(".assessment");
    let last = node_list[node_list.length -1];
    modulesDropdown.removeChild(last);
});

//Minimise 
let minimiseButton = document.querySelector(".minimise-button");
minimiseButton.addEventListener("click", function(){
    // modulesContainer.style.backgroundColor = "red";
    let dropdown = document.querySelector(".module-dropdown");

    dropdown.classList.toggle("hide");
});



